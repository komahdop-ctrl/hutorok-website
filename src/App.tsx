import { useEffect, useState } from 'react'

type ProductGroup = 'harvest' | 'varietal' | 'comb'
type Product = {
  id: string
  name: string
  subtitle: string
  description: string
  group: ProductGroup
  symbol: string
  packOptions: string[]
}
type Selection = { name: string; pack: string }

const baseUrl = import.meta.env.BASE_URL

const phones = [
  { label: '+7 917 954-46-95', digits: '+79179544695' },
  { label: '+7 937 208-23-30', digits: '+79372082330' },
]

const products: Product[] = [
  {
    id: 'flower-linden',
    name: 'Цветочно-липовый',
    subtitle: 'Первый медосбор',
    description: 'Мёд раннего летнего медосбора с цветочным ароматом и липовой нотой.',
    group: 'harvest',
    symbol: '✿',
    packOptions: ['1 л', '3 л', '10 л', 'Подобрать'],
  },
  {
    id: 'meadow',
    name: 'Летнее разнотравье',
    subtitle: 'Второй медосбор',
    description: 'Летний медосбор. Оттенки вкуса и состав медоносов зависят от сезона.',
    group: 'harvest',
    symbol: '✳',
    packOptions: ['1 л', '3 л', '10 л', 'Подобрать'],
  },
  {
    id: 'late-summer',
    name: 'Поздний летний',
    subtitle: 'Третий медосбор',
    description: 'Поздний летний мёд с преобладанием подсолнечника.',
    group: 'harvest',
    symbol: '☼',
    packOptions: ['1 л', '3 л', '10 л', 'Подобрать'],
  },
  {
    id: 'donnik',
    name: 'Донниковый',
    subtitle: 'Сортовой мёд',
    description: 'Донниковый мёд. Год урожая и актуальное наличие уточняются.',
    group: 'varietal',
    symbol: '❋',
    packOptions: ['1 л', '3 л', '10 л', 'Подобрать'],
  },
  {
    id: 'buckwheat',
    name: 'Гречишный',
    subtitle: 'Сортовой мёд',
    description: 'Гречишный мёд. Год урожая и актуальное наличие уточняются.',
    group: 'varietal',
    symbol: '◇',
    packOptions: ['1 л', '3 л', '10 л', 'Подобрать'],
  },
  {
    id: 'comb',
    name: 'Мёд в сотах',
    subtitle: 'Полурамка',
    description: 'Отдельный формат сотового мёда. Фактический вес, наличие и цена уточняются.',
    group: 'comb',
    symbol: '⬡',
    packOptions: ['Полурамка', 'Уточнить формат'],
  },
]

function BrandMark() {
  return (
    <span className="brand__mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none">
        <ellipse cx="24" cy="17" rx="13" ry="9" fill="#fff" transform="rotate(-28 24 17)" />
        <ellipse cx="42" cy="17" rx="13" ry="9" fill="#fff" transform="rotate(28 42 17)" />
        <ellipse cx="34" cy="37" rx="22" ry="15" fill="#e6b34d" />
        <path d="M27 24c-4 8-4 18 1 26M41 24c-4 8-4 18 1 25" stroke="#40553a" strokeWidth="5" strokeLinecap="round" />
        <circle cx="12" cy="36" r="9" fill="#40553a" />
        <circle cx="9" cy="33" r="2" fill="#fff" />
        <path d="M7 26 3 20M17 26l2-6" stroke="#40553a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function ProductCard({
  product,
  onChoose,
}: {
  product: Product
  onChoose: (name: string, pack: string) => void
}) {
  const [pack, setPack] = useState(product.packOptions[0])

  return (
    <article className={'product-card product-card--' + product.group}>
      <div className="product-card__art" aria-hidden="true">
        <span className="product-card__symbol">{product.symbol}</span>
        <span className="product-card__art-caption">Пасека «Хуторок»</span>
      </div>
      <div className="product-card__body">
        <p className="product-card__eyebrow">{product.subtitle}</p>
        <h3>{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__facts">
          <div>
            <span>Цена</span>
            <strong className="product-card__price">Уточняется</strong>
          </div>
          <div>
            <span>Наличие</span>
            <strong>Уточняется</strong>
          </div>
        </div>
        <label htmlFor={'pack-' + product.id}>Желаемый объём для уточнения</label>
        <select
          id={'pack-' + product.id}
          value={pack}
          onChange={(event) => setPack(event.target.value)}
        >
          {product.packOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button className="button button--card" type="button" onClick={() => onChoose(product.name, pack)}>
          Выбрать вариант
          <span aria-hidden="true">↗</span>
        </button>
        <p className="product-card__fineprint">Выбор — пожелание, а не подтверждение наличия. Цену и фасовку уточним по телефону.</p>
      </div>
    </article>
  )
}

export default function App() {
  const [filter, setFilter] = useState<'all' | ProductGroup>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selection, setSelection] = useState<Selection | null>(null)

  const visibleProducts = products.filter((product) => filter === 'all' || product.group === filter)

  useEffect(() => {
    if (selection) {
      document.getElementById('selection-summary')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selection])

  const chooseProduct = (name: string, pack: string) => setSelection({ name, pack })
  const closeMenu = () => setMenuOpen(false)

  return (
    <div id="top">
      <a className="skip-link" href="#catalog">Перейти к каталогу</a>

      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Пасека Хуторок — на главную">
            <BrandMark />
            <span className="brand__text">
              <span>СЕМЕЙНАЯ ПАСЕКА</span>
              <strong>Хуторок</strong>
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="main-nav" className={'nav-links' + (menuOpen ? ' nav-links--open' : '')} aria-label="Основное меню">
            <a href="#catalog" onClick={closeMenu}>Наш мёд</a>
            <a href="#about" onClick={closeMenu}>О пасеке</a>
            <a href="#photos" onClick={closeMenu}>Фотографии</a>
            <a href="#contacts" onClick={closeMenu}>Контакты</a>
          </nav>
          <a className="header-cta" href="#catalog">Выбрать мёд <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <div className="beta-notice" role="note">
        <div className="wrap">
          <strong>Информационная версия сайта.</strong>
          <span> Актуальные цены и наличие уточняются. Сайт не принимает заказы и оплату.</span>
        </div>
      </div>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__glow" aria-hidden="true" />
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="eyebrow"><span className="eyebrow__dot" /> Русская Селитьба · Самарская область</p>
              <h1 id="hero-title">Настоящий мёд <em>с нашей пасеки</em></h1>
              <p className="hero__lead">
                Семейная пасека «Хуторок». Мы сами работаем с пчёлами, следим за медосборами
                и готовим мёд к фасовке. Здесь можно познакомиться с нашей пасекой и выбрать,
                о каком мёде хотите узнать подробнее.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#catalog">Выбрать мёд <span aria-hidden="true">↗</span></a>
                <a className="button button--secondary" href="#about">О нашей пасеке</a>
              </div>
              <ul className="hero__facts" aria-label="О пасеке">
                <li>Семейное дело</li>
                <li>Собственная пасека</li>
                <li>Прямой контакт с пчеловодом</li>
              </ul>
            </div>
            <figure className="hero__visual">
              <img
                src={baseUrl + 'images/apiary-frame.svg'}
                alt="Пчеловод на пасеке держит рамку с пчёлами и сотами"
                width="1536"
                height="1021"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <span>Пасека «Хуторок»</span>
                <strong>Русская Селитьба · Самарская область</strong>
              </figcaption>
              <span className="hero__photo-note" aria-hidden="true">Своё дело. Свои пчёлы.</span>
            </figure>
          </div>
          <div className="hero__bottom">
            <div className="wrap hero__bottom-inner">
              <span>Пчеловод — Виталий Галдин</span>
              <span>Мёд со своей семейной пасеки</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="О пасеке">
          <div className="wrap trust-strip__grid">
            <div className="trust-item">
              <span className="trust-item__mark" aria-hidden="true">✳</span>
              <div><strong>Семейная пасека</strong><span>Знаем свой труд и каждый сезон</span></div>
            </div>
            <div className="trust-item">
              <span className="trust-item__mark" aria-hidden="true">⌂</span>
              <div><strong>Самарская область</strong><span>Село Русская Селитьба</span></div>
            </div>
            <div className="trust-item">
              <span className="trust-item__mark" aria-hidden="true">♡</span>
              <div><strong>Разговор напрямую</strong><span>Можно уточнить у пчеловода</span></div>
            </div>
          </div>
        </section>

        <section className="section catalog" id="catalog" aria-labelledby="catalog-title">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ассортимент пасеки</p>
                <h2 id="catalog-title">Мёд, который <em>собираем сами</em></h2>
              </div>
              <p className="section-heading__lead">
                Каждый медосбор отличается. Выберите интересующий вариант и желаемую фасовку —
                актуальную цену и наличие уточним лично.
              </p>
            </div>

            <div className="catalog-toolbar">
              <div className="filter-tabs" role="group" aria-label="Фильтр ассортимента">
                <button type="button" className={filter === 'all' ? 'is-active' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Весь ассортимент</button>
                <button type="button" className={filter === 'harvest' ? 'is-active' : ''} aria-pressed={filter === 'harvest'} onClick={() => setFilter('harvest')}>Медосборы</button>
                <button type="button" className={filter === 'varietal' ? 'is-active' : ''} aria-pressed={filter === 'varietal'} onClick={() => setFilter('varietal')}>Сортовой мёд</button>
                <button type="button" className={filter === 'comb' ? 'is-active' : ''} aria-pressed={filter === 'comb'} onClick={() => setFilter('comb')}>Мёд в сотах</button>
              </div>
              <span className="catalog-count">{visibleProducts.length} позиций</span>
            </div>

            {selection && (
              <div className="selection-panel" id="selection-summary" role="status" aria-live="polite">
                <div>
                  <p className="eyebrow">Ваш выбор</p>
                  <strong>{selection.name}</strong>
                  <span>Желаемая фасовка: {selection.pack}</span>
                  <small>Сайт не отправляет этот выбор и не оформляет заказ. Наличие и цену подтвердим при разговоре.</small>
                </div>
                <div className="selection-panel__actions">
                  <a className="button button--primary" href="#contacts">Перейти к телефонам <span aria-hidden="true">↗</span></a>
                  <button className="button button--quiet" type="button" onClick={() => setSelection(null)}>Сбросить выбор</button>
                </div>
              </div>
            )}

            <div className="products-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onChoose={chooseProduct} />
              ))}
            </div>

            <p className="catalog-disclaimer">
              Информация носит ознакомительный характер. Указанный объём — пожелание покупателя,
              а не подтверждение доступной фасовки. Цены, год урожая и остатки уточняются до покупки.
              Онлайн-заказ и оплата на сайте отключены.
            </p>
          </div>
        </section>

        <section className="story-section" id="about" aria-labelledby="about-title">
          <div className="wrap story-grid">
            <figure className="story-photo">
              <img
                src={baseUrl + 'images/beekeeper-apiary.svg'}
                alt="Пчеловод Виталий на своей пасеке среди ульев"
                width="1536"
                height="1021"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Пасека «Хуторок» · Русская Селитьба</figcaption>
            </figure>
            <div className="story-copy">
              <p className="eyebrow">Знакомьтесь, это мы</p>
              <h2 id="about-title">Мёд начинается <em>с заботы о пчёлах</em></h2>
              <p className="story-copy__lead">
                «Хуторок» — семейная пасека Виталия Галдина в селе Русская Селитьба,
                Красноярский район, Самарская область.
              </p>
              <p>
                В пчеловодстве нет одинаковых сезонов: меняются цветение, погода и медосбор.
                Мы работаем с пчелиными семьями, отбираем рамки, откачиваем и фасуем мёд.
                Поэтому рассказываем не об абстрактном продукте, а о своей пасеке и её урожае.
              </p>
              <a className="text-link" href="#photos">Посмотреть фотографии пасеки <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="wrap">
            <div className="section-heading section-heading--center">
              <div>
                <p className="eyebrow">От улья до банки</p>
                <h2 id="process-title">Путь <em>нашего мёда</em></h2>
              </div>
            </div>
            <div className="process-grid">
              <article className="process-step">
                <span className="process-step__number">01</span>
                <span className="process-step__icon" aria-hidden="true">✿</span>
                <h3>Забота о семьях</h3>
                <p>Работа на пасеке начинается с ухода за пчёлами и подготовки семей к сезону.</p>
              </article>
              <article className="process-step">
                <span className="process-step__number">02</span>
                <span className="process-step__icon" aria-hidden="true">☼</span>
                <h3>Медосбор</h3>
                <p>В течение лета сменяются цветение растений и периоды сбора нектара.</p>
              </article>
              <article className="process-step">
                <span className="process-step__number">03</span>
                <span className="process-step__icon" aria-hidden="true">⬡</span>
                <h3>Откачка и фасовка</h3>
                <p>После сбора урожая мёд откачивается и подготавливается к фасовке.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="photos" aria-labelledby="photos-title">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Настоящие фотографии</p>
                <h2 id="photos-title">Жизнь <em>нашей пасеки</em></h2>
              </div>
              <p className="section-heading__lead">Здесь — подлинные снимки из фотоархива «Хуторка», а не стоковые иллюстрации.</p>
            </div>
            <div className="gallery-grid">
              <figure className="gallery-tile gallery-tile--wide">
                <img
                  src={baseUrl + 'images/honey-buckets.svg'}
                  alt="Ведёрки с мёдом пасеки «Хуторок»"
                  width="1536"
                  height="1152"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Мёд после фасовки</figcaption>
              </figure>
              <figure className="gallery-tile">
                <img
                  src={baseUrl + 'images/apiary-frame.svg'}
                  alt="Пчеловод с рамкой и пчёлами"
                  width="1536"
                  height="1021"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Работа с рамкой</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div>
              <p className="eyebrow">Коротко о главном</p>
              <h2 id="faq-title">Частые <em>вопросы</em></h2>
              <p className="faq-intro">Если нужной информации нет, можно обратиться к пчеловоду по телефону.</p>
            </div>
            <div className="faq-list">
              <details>
                <summary>Где находится пасека?</summary>
                <p>Пасека «Хуторок» находится в селе Русская Селитьба Красноярского района Самарской области.</p>
              </details>
              <details>
                <summary>Какие фасовки доступны?</summary>
                <p>В каталоге можно выбрать желаемый объём для уточнения. Фактические варианты фасовки зависят от продукта и текущего остатка.</p>
              </details>
              <details>
                <summary>Почему на сайте нет точных цен?</summary>
                <p>Мы не хотим публиковать устаревшие суммы. Актуальную цену подтверждаем отдельно для конкретного медосбора и фасовки.</p>
              </details>
              <details>
                <summary>Есть ли доставка?</summary>
                <p>География, стоимость и сроки получения уточняются при личном обращении. Сайт пока не оформляет заказы.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacts" aria-labelledby="contacts-title">
          <div className="wrap contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Связаться с пасекой</p>
              <h2 id="contacts-title">Спросите <em>напрямую у пчеловода</em></h2>
              <p>
                Уточните интересующий медосбор, желаемую фасовку, актуальную цену и возможность получения.
                Нажатие на номер откроет приложение для звонка на вашем устройстве.
              </p>
              <p className="contact-note">Звонок совершается только по вашему решению. Сайт не передаёт контактные данные и не принимает онлайн-заказы.</p>
              <a className="vk-link" href="https://vk.ru/paseka_hutorok" target="_blank" rel="noopener noreferrer">Группа пасеки ВКонтакте <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-card">
              <span className="contact-card__label">Пчеловод</span>
              <strong className="contact-card__name">Виталий Галдин</strong>
              {phones.map((phone) => (
                <a className="contact-phone" href={'tel:' + phone.digits} key={phone.digits}>
                  <span>{phone.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <div className="contact-card__location">
                <span aria-hidden="true">⌂</span>
                <p>с. Русская Селитьба<br />Красноярский район, Самарская область</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-main">
          <div>
            <a className="brand brand--footer" href="#top">
              <BrandMark />
              <span className="brand__text"><span>СЕМЕЙНАЯ ПАСЕКА</span><strong>Хуторок</strong></span>
            </a>
            <p>Настоящий мёд со своей семейной пасеки.</p>
          </div>
          <div className="footer-links">
            <strong>Разделы</strong>
            <a href="#catalog">Наш мёд</a>
            <a href="#about">О пасеке</a>
            <a href="#photos">Фотографии</a>
          </div>
          <div className="footer-links">
            <strong>Контакты</strong>
            <a href="tel:+79179544695">+7 917 954-46-95</a>
            <a href="tel:+79372082330">+7 937 208-23-30</a>
            <a href="https://vk.ru/paseka_hutorok" target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Пасека «Хуторок». Информационная версия.</span>
          <a href={baseUrl + 'privacy.html'}>Политика обработки персональных данных</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </div>
  )
}
