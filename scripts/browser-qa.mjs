import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const root = process.env.SITE_URL || 'http://127.0.0.1:4173/hutorok-website/'
const browser = await chromium.launch({ headless: true })
const jsErrors = []
const externalRequests = []

try {
  await mkdir('qa-output', { recursive: true })

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  desktop.on('pageerror', error => jsErrors.push(error.message))
  desktop.on('request', request => {
    const url = request.url()
    if (url.startsWith('http') && !url.startsWith('http://127.0.0.1:4173')) externalRequests.push(url)
  })

  const response = await desktop.goto(root, { waitUntil: 'networkidle' })
  assert.ok(response?.ok(), 'Главная страница должна возвращать HTTP 200')
  const staticHtml = await response.text()
  assert.match(staticHtml, /Настоящий мёд/, 'Основной заголовок должен быть в исходном HTML без JS')
  assert.match(staticHtml, /Цветочно-липовый/, 'Каталог должен быть в исходном HTML без JS')
  assert.match(staticHtml, /Цена/, 'Коммерческая информация должна быть в исходном HTML')
  assert.doesNotMatch(staticHtml, /images\.unsplash\.com/, 'Внешние фотографии удалены')
  await desktop.locator('.product-card').first().waitFor()

  assert.match(await desktop.title(), /Пасека «Хуторок»/)
  assert.equal(await desktop.locator('h1').count(), 1, 'На странице должен быть ровно один H1')
  assert.match(await desktop.locator('h1').innerText(), /Настоящий мёд/)
  assert.equal(await desktop.locator('.product-card').count(), 6, 'Каталог должен показывать шесть позиций')
  assert.equal(await desktop.locator('form').count(), 0, 'Формы заказов не должны быть подключены')
  assert.equal(await desktop.locator('input').count(), 0, 'Поля для сбора ПДн отсутствуют')
  assert.equal(await desktop.locator('a[href^="sms:"]').count(), 0, 'SMS-заказы отключены')
  assert.equal(await desktop.locator('a[href^="mailto:"]').count(), 0, 'Неподтверждённая почта не публикуется')
  assert.equal(await desktop.locator('.contact-card a[href^="tel:"]').count(), 2, 'Два добровольных телефонных контакта доступны')
  assert.equal(await desktop.locator('a[href^="tel:"]').count(), 4, 'Два телефона доступны в контактах и продублированы в подвале')
  assert.equal(await desktop.locator('img[src*="unsplash"]').count(), 0, 'Внешние фотохостинги не используются')
  assert.equal(await desktop.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow')
  assert.match(await desktop.locator('.beta-notice').innerText(), /не принимает заказы и оплату/)

  const imageStates = await desktop.locator('img').evaluateAll(images => images.map(image => ({
    loaded: image.complete && image.naturalWidth > 0,
    alt: image.getAttribute('alt'),
    src: image.getAttribute('src'),
  })))
  assert.equal(imageStates.length, 4, 'Ожидаются четыре изображения в контенте')
  assert.ok(imageStates.every(image => image.loaded && image.alt && image.alt.trim().length > 0),
    'Все изображения должны загрузиться и иметь осмысленный alt')
  assert.deepEqual(externalRequests, [], 'Страница не должна запрашивать внешние ресурсы')
  await desktop.screenshot({ path: 'qa-output/desktop-1440.png', fullPage: true })

  await desktop.getByRole('button', { name: 'Медосборы' }).click()
  assert.equal(await desktop.locator('.product-card').count(), 3, 'Фильтр медосборов должен показывать три позиции')
  await desktop.getByRole('button', { name: 'Сортовой мёд' }).click()
  assert.equal(await desktop.locator('.product-card').count(), 2, 'Фильтр сортового мёда должен показывать две позиции')
  await desktop.getByRole('button', { name: 'Мёд в сотах' }).click()
  assert.equal(await desktop.locator('.product-card').count(), 1, 'Фильтр сотового мёда должен показывать одну позицию')
  await desktop.getByRole('button', { name: 'Весь ассортимент' }).click()
  assert.equal(await desktop.locator('.product-card').count(), 6, 'Сброс фильтра должен показывать весь каталог')

  const flowerCard = desktop.locator('.product-card').filter({ hasText: 'Цветочно-липовый' })
  await flowerCard.getByLabel('Желаемый объём для уточнения').selectOption('3 л')
  await flowerCard.getByRole('button', { name: 'Выбрать вариант' }).click()
  await desktop.locator('.selection-panel').waitFor()
  assert.match(await desktop.locator('.selection-panel').innerText(), /Цветочно-липовый/)
  assert.match(await desktop.locator('.selection-panel').innerText(), /3 л/)
  assert.equal(await desktop.locator('form').count(), 0, 'Выбор не должен создавать форму или отправку')
  assert.equal(await desktop.locator('.contact-card a[href^="tel:"]').count(), 2, 'Выбор не должен создавать автоматический звонок')
  await desktop.screenshot({ path: 'qa-output/desktop-selection.png', fullPage: true })

  for (const width of [320, 375, 390, 768]) {
    const mobile = await browser.newPage({
      viewport: { width, height: 840 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
    })
    mobile.on('pageerror', error => jsErrors.push(error.message))
    await mobile.goto(root, { waitUntil: 'networkidle' })
    await mobile.locator('.product-card').first().waitFor()

    const overflow = await mobile.evaluate(() => ({
      screen: window.innerWidth,
      html: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }))
    assert.ok(overflow.html <= overflow.screen + 2 && overflow.body <= overflow.screen + 2,
      'На экране ' + width + 'px есть горизонтальная прокрутка: ' + JSON.stringify(overflow))

    const menu = mobile.getByRole('button', { name: 'Открыть меню' })
    await menu.click()
    assert.equal(await mobile.getByRole('button', { name: 'Закрыть меню' }).getAttribute('aria-expanded'), 'true')
    await mobile.locator('#main-nav').getByRole('link', { name: 'Фотографии' }).click()
    assert.equal(await mobile.getByRole('button', { name: 'Открыть меню' }).getAttribute('aria-expanded'), 'false')

    if (width === 390) {
      await mobile.goto(root, { waitUntil: 'networkidle' })
      await mobile.screenshot({ path: 'qa-output/mobile-390.png', fullPage: true })
    }
    await mobile.close()
  }

  assert.deepEqual(jsErrors, [], 'Не должно быть ошибок выполнения JavaScript')
  console.log('PASS: prerendered HTML, desktop, 320/375/390/768 mobile, filters, selection, phone path, local images, no forms/PII transmission, no external requests')
} finally {
  await browser.close()
}
