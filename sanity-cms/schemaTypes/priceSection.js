import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'priceSection',
  title: 'Секція Ціни та Послуги',
  type: 'object',
  fields: [
    defineField({name: 'sectionTitle', type: 'localeString', title: 'Малий заголовок'}),
    defineField({name: 'mainTitle', type: 'localePortableText', title: 'Головний заголовок'}),
    defineField({
      name: 'services',
      title: 'Блоки послуг',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'blockTitle',
              type: 'localeString',
              title: 'Категорія (н-д: Бухгалтерія)',
            }),
            defineField({
              name: 'subBlocks',
              title: 'Картки з цінами',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'title', type: 'localeString', title: 'Заголовок картки'}),
                    defineField({
                      name: 'content',
                      type: 'localePortableText',
                      title: 'Зміст картки (Ціни та списки)',
                      description:
                        'Тут ви можете писати текст, робити списки та виділяти ціни жирним.',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
