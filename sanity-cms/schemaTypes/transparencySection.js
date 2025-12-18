import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'transparencySection',
  title: 'Секція: Прозорість (Transparency)',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Головний заголовок',
      type: 'localePortableText',
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'localeString',
    }),
    defineField({
      name: 'featuresList',
      title: 'Список переваг',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Заголовок пункту', type: 'localeString'},
            {name: 'text', title: 'Текст пункту (можна з HTML посиланнями)', type: 'localeString'},
          ],
        },
      ],
    }),
    defineField({
      name: 'imageTop',
      title: 'Верхнє зображення',
      type: 'image',
    }),
    defineField({
      name: 'imageBottom',
      title: 'Нижнє зображення',
      type: 'image',
    }),
  ],
})
