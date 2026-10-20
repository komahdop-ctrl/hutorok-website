import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const root = process.env.SITE_URL || 'http://127.0.0.1:4173/hutorok-website/'
const browser = await chromium.launch({ headless: true })
const jsErrors = []

try {
  await mkdir('qa-output', { recursive: true })

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  desktop.on('pageerror', error => jsErrors.push(error.message))
  const response = await desktop.goto(root, { waitUntil: 'domcontentloaded' })
  assert.ok(response?.ok(), 'Главная страница должна возвращать HTTP 200')
  await desktop.locator('.product').first().waitFor()
  assert.match(await desktop.title(), /Пасека «Хуторок»/)
  assert.match(await desktop.locator('h1').innerText(), /целое лето/)
  assert.equal(await desktop.locator('.product').count(), 9, 'По умолчанию должны показываться 9 позиций')
  assert.ok((await desktop.locator('.pack').first().getAttribute('href'))?.startsWith('sms:+79179544695?body='), 'Ссылка заказа должна готовить SMS')
  assert.equal(await desktop.locator('.contact-card__phone').count(), 2, 'Два телефона доступны для звонка')
  assert.equal(await desktop.locator('a[href="mailto:hello@example.com"]').count(), 0, 'Временный email удалён')
  await desktop.screenshot({ path: 'qa-output/desktop-1440.png' })

  await desktop.getByRole('button', { name: 'Урожай 2025' }).click()
  assert.equal(await desktop.locator('.product').count(), 4, 'Фильтр 2025 должен показывать четыре позиции')
  await desktop.getByRole('button', { name: 'Урожай 2026' }).click()
  assert.equal(await desktop.locator('.product').count(), 4, 'Фильтр 2026 должен показывать четыре позиции')
  await desktop.getByRole('button', { name: 'Весь мёд' }).click()
  assert.equal(await desktop.locator('.product').count(), 9, 'Сброс фильтра должен показывать весь ассортимент')

  for (const width of [320, 375, 390, 768]) {
    const mobile = await browser.newPage({ viewport: { width, height: 840 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 })
    mobile.on('pageerror', error => jsErrors.push(error.message))
    await mobile.goto(root, { waitUntil: 'domcontentloaded' })
    await mobile.locator('.product').first().waitFor()
    const overflow = await mobile.evaluate(() => ({
      screen: window.innerWidth,
      html: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }))
    assert.ok(overflow.html <= overflow.screen + 2 && overflow.body <= overflow.screen + 2,
      'На экране ' + width + 'px есть горизонтальная прокрутка: ' + JSON.stringify(overflow))
    const menu = mobile.getByRole('button', { name: 'Открыть меню' })
    if (width <= 768) {
      await menu.click()
      assert.equal(await mobile.getByRole('button', { name: 'Закрыть меню' }).getAttribute('aria-expanded'), 'true')
      await mobile.getByRole('link', { name: 'Галерея' }).first().click()
      assert.equal(await mobile.getByRole('button', { name: 'Открыть меню' }).getAttribute('aria-expanded'), 'false')
    }
    if (width === 390) {
      await mobile.goto(root, { waitUntil: 'domcontentloaded' })
      await mobile.screenshot({ path: 'qa-output/mobile-390.png' })
    }
    await mobile.close()
  }

  assert.deepEqual(jsErrors, [], 'Не должно быть ошибок выполнения JavaScript')
  console.log('PASS: desktop, 320/375/390/768 mobile, year filter, links, menu, overflow, JS runtime')
} finally {
  await browser.close()
}
