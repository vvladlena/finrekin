// schemas/offersSection.js

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'offersSection',
  title: 'Секція Актуальні Пропозиції',
  type: 'object',
  fields: [
    defineField({name: 'mainTitle', title: 'Головний Заголовок', type: 'localePortableText'}),
    defineField({name: 'mainSubtitle', title: 'Підзаголовок/Опис', type: 'localeString'}),
    defineField({name: 'mainButtonText', title: 'Текст Кнопки (Головний)', type: 'localeString'}),

    defineField({
      name: 'offersList',
      title: 'Список Пропозицій/Карток',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Заголовок Пропозиції', type: 'localeString'}),
            defineField({name: 'icon', title: 'Іконка', type: 'image'}),
            defineField({name: 'bg', title: 'Фонове Зображення', type: 'image'}),
            defineField({name: 'buttonText', title: 'Текст Кнопки (Картка)', type: 'localeString'}),
          ],
        }),
      ],
    }),
  ],
})
