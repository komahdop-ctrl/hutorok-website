const products = [
  { name: 'Разнотравье', note: 'Мягкий, цветочный', tone: 'gold', description: 'Летние травы и луговые цветы. Универсальный мёд на каждый день.' },
  { name: 'Подсолнечный', note: 'Нежный, сливочный', tone: 'sun', description: 'Светлый мёд с деликатным вкусом и быстрой естественной кристаллизацией.' },
  { name: 'Гречишный', note: 'Терпкий, насыщенный', tone: 'amber', description: 'Выразительный аромат, глубокий цвет и долгое тёплое послевкусие.' },
]

const values = [
  ['Своя пасека', 'Знаем каждую семью и отвечаем за путь мёда от улья до банки.'],
  ['Без нагрева', 'Бережно сохраняем природный аромат, вкус и естественную текстуру.'],
  ['Честный состав', 'Внутри только мёд. Без добавок, сиропов и ароматизаторов.'],
]

function HoneyMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M32 5 54 18v28L32 59 10 46V18L32 5Z" fill="currentColor" />
      <path d="M22 31c4-9 16-9 20 0-1 11-19 11-20 0Z" fill="#f7e8b3" />
      <path d="M25 29h14M24 34h16M27 39h10" stroke="currentColor" strokeWidth="3" />
      <path d="M25 25c-7 2-9-7-3-9 5-1 8 5 3 9Zm14 0c7 2 9-7 3-9-5-1-8 5-3 9Z" fill="#fffaf0" opacity=".85" />
    </svg>
  )
}

function Jar({ tone }: { tone: string }) {
  return (
    <div className={`jar jar--${tone}`} aria-hidden="true">
      <div className="jar__lid" />
      <div className="jar__glass">
        <span className="jar__label">Хуторок<small>мёд</small></span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <main id="top">
      <section className="hero">
        <nav className="nav" aria-label="Основная навигация">
          <a className="brand" href="#top" aria-label="Пасека Хуторок — на главную">
            <span className="brand__mark"><HoneyMark /></span>
            <span>Пасека <strong>Хуторок</strong></span>
          </a>
          <div className="nav__links">
            <a href="#catalog">Мёд</a>
            <a href="#about">О пасеке</a>
            <a href="#order">Заказать</a>
          </div>
        </nav>

        <div className="hero__content">
          <p className="eyebrow">Семейная пасека · натуральный продукт</p>
          <h1>Мёд, в котором<br />слышно лето</h1>
          <p className="hero__lead">
            Бережно собираем настоящий мёд и сохраняем в каждой банке аромат трав,
            солнце и тишину родных полей.
          </p>
          <div className="hero__actions">
            <a className="button" href="#catalog">Выбрать мёд</a>
            <a className="text-link" href="#about">Узнать о пасеке <span>↘</span></a>
          </div>
        </div>

        <div className="hero__seal" aria-hidden="true">
          <span>100%</span><small>натурально</small>
        </div>
      </section>

      <section className="catalog section" id="catalog">
        <header className="section__heading">
          <div>
            <p className="eyebrow">Из нашей коллекции</p>
            <h2>Мёд нового<br />урожая</h2>
          </div>
          <p>Три характера одного лета. Фасовку и стоимость добавим после утверждения ассортимента.</p>
        </header>
        <div className="products">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className="product__visual"><Jar tone={product.tone} /></div>
              <div className="product__top">
                <span>{product.note}</span><span>урожай 2026</span>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="product__price">Цена уточняется</span>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="about">
        <div className="story__picture" aria-label="Место для будущей фотографии пасеки">
          <span>Будущая фотография пасеки</span>
        </div>
        <div className="story__content">
          <p className="eyebrow">О пасеке</p>
          <h2>Небольшое дело<br />с большим смыслом</h2>
          <p className="story__lead">
            «Хуторок» — семейная пасека, где всё держится на уважении к пчёлам,
            земле и естественному ходу вещей.
          </p>
          <p>
            Здесь появится настоящая история вашей семьи: с чего всё началось,
            где стоят ульи и почему ваш мёд особенный. Пока мы оставили тёплый,
            честный текст, который легко заменить.
          </p>
          <div className="story__fact"><strong>От улья</strong><span>до вашей семьи — бережно и без посредников</span></div>
        </div>
      </section>

      <section className="values section">
        <header className="section__heading section__heading--compact">
          <div><p className="eyebrow">Почему нам доверяют</p><h2>Всё настоящее</h2></div>
        </header>
        <div className="values__grid">
          {values.map(([title, text], index) => (
            <article className="value" key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="order" id="order">
        <p className="eyebrow">Простой заказ</p>
        <h2>Мёд с пасеки<br />прямо к вашему столу</h2>
        <div className="steps">
          <div><span>01</span><strong>Выберите</strong><p>Подберём сорт и нужную фасовку.</p></div>
          <div><span>02</span><strong>Напишите</strong><p>Добавим телефон и мессенджеры.</p></div>
          <div><span>03</span><strong>Получите</strong><p>Согласуем удобную доставку или самовывоз.</p></div>
        </div>
        <a className="button button--light" href="mailto:hello@example.com">Контакты скоро появятся</a>
        <small>Адрес и реальные способы связи добавим перед публикацией</small>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand__mark"><HoneyMark /></span><span>Пасека <strong>Хуторок</strong></span></a>
        <div><span>Натуральный мёд</span><span>Семейная пасека</span></div>
        <p>Демонстрационная версия · 2026</p>
      </footer>
    </main>
  )
}
