const values = [
  ['Без лишнего', 'Только мёд, воск и бережная работа с пчёлами.'],
  ['Своими руками', 'Небольшая семейная пасека и внимание к каждой рамке.'],
  ['Из родных мест', 'Травы, сады и цветущие поля — вкус нашей земли.'],
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

export default function App() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Основная навигация">
          <a className="brand" href="#top" aria-label="Пасека Хуторок — на главную">
            <span className="brand__mark"><HoneyMark /></span>
            <span>Пасека <strong>Хуторок</strong></span>
          </a>
          <a className="nav__link" href="#about">О пасеке</a>
        </nav>

        <div className="hero__content" id="top">
          <p className="eyebrow">Семейная пасека · натуральный продукт</p>
          <h1>Мёд, в котором<br />слышно лето</h1>
          <p className="hero__lead">
            Бережно собираем настоящий мёд и сохраняем в каждой банке аромат трав,
            солнце и тишину родных полей.
          </p>
          <a className="button" href="#about">Познакомиться с пасекой</a>
        </div>

        <div className="hero__seal" aria-hidden="true">
          <span>100%</span>
          <small>натурально</small>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about__intro">
          <p className="eyebrow">Наш подход</p>
          <h2>Просто. Честно.<br />По-настоящему.</h2>
        </div>
        <div className="values">
          {values.map(([title, text], index) => (
            <article className="value" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>© Пасека «Хуторок»</span>
        <span>Сайт готовится к запуску</span>
      </footer>
    </main>
  )
}
