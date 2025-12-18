// schemas/localeString.js

import {defineType} from 'sanity'

// Список мов, які ми підтримуємо
const LANGUAGES = ['pl', 'ua', 'en', 'ru']

export default defineType({
  name: 'localeString',
  title: 'Multi-language String',
  type: 'object',

  // Визначаємо поле для кожної мови
  fields: LANGUAGES.map((lang) => ({
    name: lang,
    title: lang.toUpperCase(),
    type: 'string', // Базовий тип даних - простий рядок
  })),

  // Для кращого відображення в списку
  preview: {
    select: {
      title: 'pl', // Відображати вміст польською мовою в прев'ю
    },
  },
})
