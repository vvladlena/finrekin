import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'Секція FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Малий заголовок',
      type: 'localeString',
      initialValue: {pl: 'FAQ'},
    }),
    defineField({
      name: 'mainTitle',
      title: 'Головний заголовок',
      type: 'localeString',
      initialValue: {pl: 'Częste pytania', ua: 'Часті запитання'},
    }),
    defineField({
      name: 'faqList',
      title: 'Список запитань та відповідей',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Запитання', type: 'localeString'}),
            defineField({
              name: 'answer',
              title: 'Відповідь',
              type: 'localePortableText', // Використовуємо Portable Text для гнучкості
            }),
          ],
        },
      ],
    }),
  ],
})
