import { useState } from 'react'

type Pack = { size: string; price: number }
type Honey = {
  id: string
  name: string
  subtitle: string
  harvest: '2025' | '2026' | 'уточняется'
  description: string
  packs: Pack[]
  color: string
  flower: string
  scarce?: boolean
}

const phones = [
  { label: '+7 917 954-46-95', digits: '+79179544695' },
  { label: '+7 937 208-23-30', digits: '+79372082330' },
]

// Указываем только подтверждённые фасовки и цены. Нельзя выводить цену
// за 1/3 л арифметическим делением стоимости десятилитрового ведра.
const honey: Honey[] = [
  { id: 'early-2026', name: 'Цветочно-липовый', subtitle: 'Первый медосбор', harvest: '2026',
    description: 'Ранний летний мёд с цветочным ароматом и липовой нотой. Осталось немного.',
    packs: [{ size: '1 л', price: 1200 }, { size: '3 л', price: 3000 }, { size: '10 л', price: 9000 }],
    color: 'gold', flower: 'Липа и цветы', scarce: true },
  { id: 'meadow-2026', name: 'Летнее разнотравье', subtitle: 'Цветочный с подсолнечником', harvest: '2026',
    description: 'Летний медосбор: цветочное разнотравье с участием подсолнечника. Мягкий, солнечный вкус.',
    packs: [{ size: '10 л', price: 3000 }], color: 'sun', flower: 'Луговые цветы' },
  { id: 'sunflower-2026', name: 'Поздний летний', subtitle: 'Разнотравье с подсолнечником', harvest: '2026',
    description: 'Мёд позднего медосбора с преобладанием подсолнечника. Быстро и естественно кристаллизуется.',
    packs: [{ size: '10 л', price: 4000 }], color: 'amber', flower: 'Подсолнечник' },
  { id: 'buckwheat-2026', name: 'Гречишный', subtitle: 'Выразительный характер', harvest: '2026',
    description: 'Яркий аромат, насыщенный оттенок и характерное послевкусие.',
    packs: [{ size: '10 л', price: 5000 }], color: 'chestnut', flower: 'Гречиха' },
  { id: 'clover', name: 'Донниковый', subtitle: 'Нежный аромат', harvest: 'уточняется',
    description: 'Мягкий, приятный мёд с тонкими травяными нотами. Год урожая уточните при заказе.',
    packs: [{ size: '1 л', price: 1200 }, { size: '3 л', price: 3000 }, { size: '10 л', price: 9000 }],
    color: 'cream', flower: 'Донник' },
  { id: 'linden-2025', name: 'Липовый', subtitle: 'Ограниченный остаток', harvest: '2025',
    description: 'Мёд прошлогоднего урожая. Небольшое количество в наличии — уточняйте.',
    packs: [{ size: '1 л', price: 1000 }], color: 'linden', flower: 'Липа', scarce: true },
  { id: 'maple-2025', name: 'Черноклёновый', subtitle: 'Ограниченный остаток', harvest: '2025',
    description: 'Ароматный мёд прошлогоднего урожая, в небольшом количестве.',
    packs: [{ size: '1 л', price: 1000 }], color: 'maple', flower: 'Черноклён', scarce: true },
  { id: 'sunflower-2025', name: 'Подсолнечный', subtitle: 'Урожай прошлого года', harvest: '2025',
    description: 'Мёд из подсолнечника, урожай 2025 года.',
    packs: [{ size: '10 л', price: 2500 }], color: 'sun', flower: 'Подсолнечник' },
  { id: 'flowers-2025', name: 'Цветочный', subtitle: 'С цветочным разнотравьем', harvest: '2025',
    description: 'Мёд прошлого сезона с цветочными нотами.',
    packs: [{ size: '10 л', price: 3000 }], color: 'gold', flower: 'Летние цветы' },
]

const photos = {
  meadow: 'https://images.unsplash.com/photo-1760040466917-9d10a916fb87?auto=format&fit=crop&w=1600&q=80',
  bees: 'https://images.unsplash.com/photo-1759355858724-5cbba3adf6da?auto=format&fit=crop&w=1100&q=78',
  honey: 'https://images.unsplash.com/photo-1646562292888-6b5167510ab7?auto=format&fit=crop&w=1100&q=80',
}

function Flower({ className = '' }: { className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 100 100" fill="none">
    <g fill="#fffdf2"><ellipse cx="50" cy="28" rx="12" ry="23"/><ellipse cx="50" cy="72" rx="12" ry="23"/><ellipse cx="28" cy="50" rx="23" ry="12"/><ellipse cx="72" cy="50" rx="23" ry="12"/><ellipse cx="34.5" cy="34.5" rx="12" ry="21" transform="rotate(-45 34.5 34.5)"/><ellipse cx="65.5" cy="65.5" rx="12" ry="21" transform="rotate(-45 65.5 65.5)"/><ellipse cx="65.5" cy="34.5" rx="12" ry="21" transform="rotate(45 65.5 34.5)"/><ellipse cx="34.5" cy="65.5" rx="12" ry="21" transform="rotate(45 34.5 65.5)"/></g>
    <circle cx="50" cy="50" r="15" fill="#f4b523"/><circle cx="45" cy="46" r="2" fill="#cf8520"/><circle cx="53" cy="54" r="2" fill="#cf8520"/>
  </svg>
}

function Bee({ className = '' }: { className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 104 82" fill="none">
    <ellipse cx="51" cy="22" rx="19" ry="14" fill="#fff" fillOpacity=".85" transform="rotate(-24 51 22)"/>
    <ellipse cx="75" cy="20" rx="19" ry="14" fill="#fff" fillOpacity=".8" transform="rotate(27 75 20)"/>
    <ellipse cx="53" cy="50" rx="31" ry="21" fill="#f9b722" transform="rotate(-12 53 50)"/>
    <path d="M45 30c-5 11-4 26 3 38M61 30c-5 11-4 26 2 36" stroke="#362c1c" strokeWidth="9"/>
    <circle cx="22" cy="48" r="15" fill="#362c1c"/><circle cx="17" cy="44" r="3" fill="#fff"/>
    <path d="M8 39 2 31M28 35l1-9" stroke="#362c1c" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="m84 47 15-6-12 16" fill="#362c1c"/>
  </svg>
}

function HoneyMark() {
  return <span className="brand__mark" aria-hidden="true"><Bee /></span>
}

function Jar({ color }: { color: string }) {
  return <div className={'jar jar--' + color} aria-hidden="true">
    <div className="jar__lid" />
    <div className="jar__glass">
      <span className="jar__shine" />
      <span className="jar__label"><span className="jar__label-flower">✿</span><strong>Хуторок</strong><small>НАТУРАЛЬНЫЙ МЁД</small></span>
    </div>
  </div>
}

function price(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

function smsLink(item: Honey, pack: Pack) {
  const text = 'Здравствуйте! Хочу заказать мёд с пасеки «Хуторок»: ' +
    item.name + ', урожай ' + item.harvest + ', ' + pack.size +
    ', цена ' + price(pack.price) + '. Подскажите наличие и доставку.'
  return 'sms:' + phones[0].digits + '?body=' + encodeURIComponent(text)
}

export default function App() {
  const [year, setYear] = useState<'all' | '2026' | '2025'>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const visible = honey.filter(item => year === 'all' || item.harvest === year)
  const closeMenu = () => setMenuOpen(false)

  return <div id="top">
    <a className="skip-link" href="#catalog">Перейти к каталогу</a>
    <header className="site-header">
      <div className="header-inner wrap">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Пасека Хуторок — на главную">
          <HoneyMark /><span className="brand__text"><span>СЕМЕЙНАЯ ПАСЕКА</span><strong>Хуторок</strong></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav id="main-nav" className={'nav-links' + (menuOpen ? ' nav-links--open' : '')} aria-label="Основное меню">
          <a onClick={closeMenu} href="#catalog">Наш мёд</a>
          <a onClick={closeMenu} href="#about">О пасеке</a>
          <a onClick={closeMenu} href="#process">От цветка до банки</a>
          <a onClick={closeMenu} href="#gallery">Галерея</a>
          <a onClick={closeMenu} className="nav-order" href="#order">Как заказать <span>↗</span></a>
        </nav>
      </div>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__meadow" src={photos.meadow} alt="" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="hero__sun" aria-hidden="true" />
        <div className="hero__inner wrap">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--green"><span className="eyebrow__dot" /> Натуральный мёд из Самарской области</p>
            <h1 id="hero-title">В каждой банке — <em>целое лето!</em></h1>
            <p className="hero__lead">Аромат цветущих лугов, тепло солнца и труд тысяч пчёл. Настоящий мёд с нашей семейной пасеки — прямо к вашему столу.</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#catalog">Выбрать мёд <span>↗</span></a>
              <a className="button button--outline" href="#about">Наша история</a>
            </div>
            <div className="hero__proof"><span>✻ Своё производство</span><span>✻ Натуральный состав</span><span>✻ Семейное дело</span></div>
          </div>
          <div className="hero__visual">
            <div className="hero__picture">
              <img src={photos.honey} alt="Иллюстративная фотография банки мёда с цветами" />
              <span className="hero__picture-label">Сладость, подаренная природой</span>
            </div>
            <div className="hero__stamp">С любовью<br />от пасеки<br /><strong>Хуторок</strong></div>
            <Flower className="hero__flower hero__flower--one" />
            <Flower className="hero__flower hero__flower--two" />
            <Bee className="hero__bee" />
          </div>
        </div>
        <div className="hero__bottom" aria-hidden="true"><span>Самарская область · село Русская Селитьба</span><span>Лето в каждом вкусе ✳</span></div>
      </section>

      <section className="intro-strip" aria-label="Преимущества">
        <div className="wrap intro-strip__grid">
          <div><span className="strip-icon">✿</span><span><strong>Настоящий мёд</strong><small>Без добавок к собранному мёду</small></span></div>
          <div><span className="strip-icon">☀</span><span><strong>Собственный медосбор</strong><small>Самарские луга и поля</small></span></div>
          <div><span className="strip-icon">♡</span><span><strong>От нашей семьи</strong><small>Без посредников</small></span></div>
        </div>
      </section>

      <section className="section catalog" id="catalog">
        <div className="wrap">
          <div className="section-title">
            <div><p className="eyebrow">Наше солнечное богатство</p><h2>Выберите <em>свой мёд</em></h2></div>
            <p>Каждый медосбор — свой аромат и характер. Мы честно указываем год урожая и цены на доступную фасовку.</p>
          </div>
          <div className="catalog-toolbar">
            <div className="year-tabs" role="group" aria-label="Фильтр по году урожая">
              <button type="button" className={year === 'all' ? 'active' : ''} aria-pressed={year === 'all'} onClick={() => setYear('all')}>Весь мёд</button>
              <button type="button" className={year === '2026' ? 'active' : ''} aria-pressed={year === '2026'} onClick={() => setYear('2026')}>Урожай 2026</button>
              <button type="button" className={year === '2025' ? 'active' : ''} aria-pressed={year === '2025'} onClick={() => setYear('2025')}>Урожай 2025</button>
            </div>
            <span className="catalog-count">{visible.length} видов</span>
          </div>
          <div className="products">
            {visible.map((item) => <article className="product" key={item.id}>
              <div className={'product__visual product__visual--' + item.color}>
                <span className="product__badge">{item.harvest === 'уточняется' ? 'Год уточняется' : 'Урожай ' + item.harvest}</span>
                <span className="product__flower">✻</span>
                <Jar color={item.color} />
                {item.scarce && <span className="product__scarce">Мало в наличии</span>}
              </div>
              <div className="product__body">
                <p className="product__eyebrow">{item.flower} · {item.subtitle}</p>
                <h3>{item.name}</h3>
                <p className="product__description">{item.description}</p>
                <div className="product__packs" aria-label={'Цены на ' + item.name}>
                  {item.packs.map(pack => <a key={pack.size} className="pack" href={smsLink(item, pack)} aria-label={'Заказать ' + item.name + ', ' + pack.size + ', ' + price(pack.price) + ' по SMS'}>
                    <span>{pack.size}</span><strong>{price(pack.price)}</strong><span aria-hidden="true">↗</span>
                  </a>)}
                </div>
                <p className="product__hint">Нажмите на цену, чтобы подготовить заказ по SMS</p>
              </div>
            </article>)}
          </div>
          <p className="catalog-notice">Цены указаны по состоянию на октябрь 2026 г. Наличие и стоимость доставки уточняем при заказе. Объём тары указан в литрах; фактический вес зависит от плотности мёда.</p>
        </div>
      </section>

      <section className="story" id="about">
        <div className="wrap story__grid">
          <div className="story__image">
            <img src={photos.bees} loading="lazy" alt="Пчёлы собирают нектар на цветущих растениях — тематическая фотография" />
            <div className="story__image-caption">Наше вдохновение — сама природа</div>
            <Flower className="story__flower"/>
          </div>
          <div className="story__text">
            <p className="eyebrow">Знакомьтесь, это мы</p>
            <h2>Семейная пасека <em>с душой</em></h2>
            <p className="story__large">Наш «Хуторок» находится в Самарской области, в селе Русская Селитьба. Здесь мы работаем с пчёлами и собираем мёд, который любим сами.</p>
            <p>Медосбор меняется от сезона к сезону: цветёт липа, приходит время разнотравья, а ближе к концу лета на полях раскрывается подсолнечник. В этом и ценность настоящего мёда — он не обязан быть одинаковым.</p>
            <div className="story__note"><span>♥</span><p>Мы продаём мёд со своей пасеки и открыто рассказываем о медосборах, урожаях и фасовке.</p></div>
            <a className="text-link" href="#order">Познакомиться и заказать <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="wrap">
          <div className="section-title section-title--center"><div><p className="eyebrow">Как рождается мёд</p><h2>Путь <em>от цветка до банки</em></h2></div></div>
          <div className="process__grid">
            <div className="process__step"><span className="process__number">01</span><span className="process__icon">✿</span><h3>Цветут луга</h3><p>Липа, донник, полевые цветы и подсолнечник дарят пчёлам нектар.</p></div>
            <div className="process__step"><span className="process__number">02</span><span className="process__icon">♧</span><h3>Трудятся пчёлы</h3><p>Пчелиные семьи собирают нектар и превращают его в зрелый мёд.</p></div>
            <div className="process__step"><span className="process__number">03</span><span className="process__icon">⬡</span><h3>Собираем урожай</h3><p>Отбираем запечатанные медовые рамки и откачиваем мёд.</p></div>
            <div className="process__step"><span className="process__number">04</span><span className="process__icon">♡</span><h3>Делимся с вами</h3><p>Фасуем мёд в выбранную тару и согласовываем получение заказа.</p></div>
          </div>
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="wrap">
          <div className="section-title"><div><p className="eyebrow">Вдохновлено природой</p><h2>Красота <em>медового лета</em></h2></div><p>Пока здесь тематические фотографии природы и мёда. Настоящие снимки нашей пасеки будут добавлены отдельно и подписаны как архив «Хуторка».</p></div>
          <div className="gallery__grid">
            <figure className="gallery__tile gallery__tile--large"><img src={photos.meadow} alt="Летние луговые цветы на солнце" loading="lazy" /><figcaption>Луга в солнечном свете</figcaption></figure>
            <figure className="gallery__tile"><img src={photos.bees} alt="Пчёлы на жёлтых цветах" loading="lazy" /><figcaption>Пчёлы и цветы</figcaption></figure>
            <figure className="gallery__tile"><img src={photos.honey} alt="Баночка мёда рядом с цветами" loading="lazy" /><figcaption>Золотистый мёд</figcaption></figure>
          </div>
          <p className="gallery__credit">Иллюстративные фотографии: Jonathan Rathgeb, German Krupenin, Clare Neilson / <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Unsplash</a>. На фото не изображена пасека «Хуторок».</p>
        </div>
      </section>

      <section className="order" id="order">
        <div className="wrap order__grid">
          <div>
            <p className="eyebrow">Давайте знакомиться</p>
            <h2>Пора добавить <em>немного лета</em> в ваш дом!</h2>
            <p>Выберите мёд и фасовку в каталоге — откроется SMS с готовым текстом заказа. Или просто позвоните нам. Никакой регистрации, корзин и сложных форм.</p>
            <a className="button button--primary" href="#catalog">Выбрать мёд <span>↗</span></a>
          </div>
          <div className="contact-card">
            <span className="contact-card__flower">✺</span><h3>Свяжитесь с нами</h3>
            <p>Подскажем, что сейчас есть в наличии, поможем с выбором и обсудим получение заказа.</p>
            {phones.map(phone => <a className="contact-card__phone" href={'tel:' + phone.digits} key={phone.digits}>{phone.label}<span>↗</span></a>)}
            <a className="contact-card__sms" href={'sms:' + phones[0].digits + '?body=' + encodeURIComponent('Здравствуйте! Хочу заказать натуральный мёд с пасеки «Хуторок». Подскажите, пожалуйста, ассортимент и доставку.')}>Написать SMS <span>↗</span></a>
            <small>Самарская область, село Русская Селитьба. Доставку и самовывоз согласовываем индивидуально.</small>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="wrap footer__grid"><div><a className="brand" href="#top"><HoneyMark /><span className="brand__text"><span>СЕМЕЙНАЯ ПАСЕКА</span><strong>Хуторок</strong></span></a><p>Мёд, в котором живёт лето.</p></div><div><strong>Разделы</strong><a href="#catalog">Наш мёд</a><a href="#about">О пасеке</a><a href="#gallery">Галерея</a></div><div><strong>Связаться</strong><a href="tel:+79179544695">+7 917 954-46-95</a><a href="tel:+79372082330">+7 937 208-23-30</a><a href="https://pchelovod63.ru/" target="_blank" rel="noopener noreferrer">Портал «Пчеловод 63» ↗</a></div></div>
      <div className="footer__bottom wrap"><span>© 2026 Пасека «Хуторок». Самарская область.</span><a href="#top">Наверх ↑</a></div>
    </footer>
  </div>
}
