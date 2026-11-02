import { createServer } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'

const server = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const entry = await server.ssrLoadModule('/src/entry-server.tsx')
  const markup = entry.render()
  const file = 'dist/index.html'
  const html = await readFile(file, 'utf8')
  const placeholder = '<div id="root"></div>'

  if (!html.includes(placeholder)) {
    throw new Error('Не найден пустой корневой элемент для пререндеринга')
  }

  const output = html.replace(placeholder, '<div id="root">' + markup + '</div>')
  await writeFile(file, output, 'utf8')

  if (!output.includes('Настоящий мёд')) {
    throw new Error('Пререндеренный HTML не содержит основного заголовка')
  }

  console.log('PASS: главная страница пререндерена в dist/index.html')
} finally {
  await server.close()
}
