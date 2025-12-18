// schemas/aboutSection.js

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'Секція: Про нас (Команда)',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Короткий Заголовок',
      type: 'localeString', // Використовуємо нашу багатомовну схему
    }),
    defineField({
      name: 'mainTitle',
      title: 'Головний Заголовок',
      type: 'localePortableText',
      description: 'Включно з виділеним текстом.',
    }),
    defineField({
      name: 'mainSubtitle',
      title: 'Опис/Підзаголовок',
      type: 'localeString',
    }),

    // Список членів команди
    defineField({
      name: 'members',
      title: 'Члени команди',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Імʼя та Прізвище', type: 'string'}), // Імена не перекладаються
            defineField({name: 'image', title: 'Фото члена команди', type: 'image'}),
            defineField({name: 'description', title: 'Посада', type: 'localeString'}),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description.pl',
            },
          },
        }),
      ],
    }),
  ],
})
