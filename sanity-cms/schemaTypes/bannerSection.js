// schemas/bannerSection.js

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bannerSection',
  title: 'Секція Баннер (Про Нас)',
  type: 'object',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Головний Заголовок',
      type: 'localeString', // Або localePortableText, якщо потрібне форматування
      description: 'Короткий заголовок, наприклад, "FinRekin to wrocławska firma..."',
    }),
    defineField({
      name: 'bannerDescription',
      title: 'Опис Секції (Багаторядковий текст)',
      // Використовуємо localePortableText, щоб зберегти жирний шрифт (<b>) та розриви рядків (<br/>)
      type: 'localePortableText',
    }),
  ],
  preview: {
    select: {
      title: 'bannerTitle.pl',
    },
    prepare(selection) {
      return {title: `Баннер: ${selection.title}`}
    },
  },
})
