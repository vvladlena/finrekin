import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stepsSection',
  title: 'Секція: Етапи роботи',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Малий заголовок (над основним)',
      type: 'localeString',
      description: 'Наприклад: "Etapy pracy"',
      initialValue: {
        pl: 'Etapy pracy',
        ua: 'Етапи роботи',
      },
    }),

    defineField({
      name: 'mainTitle',
      title: 'Головний заголовок',
      type: 'localePortableText',
      description: 'Використовуйте Highlight для виділення синім кольором',
    }),

    defineField({
      name: 'stepsList',
      title: 'Список етапів',
      description:
        'Має бути рівно 6 етапів для збереження правильної візуальної структури (крива лінія)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stepItem',
          title: 'Етап',
          fields: [
            defineField({
              name: 'title',
              title: 'Текст етапу',
              type: 'localeString',
            }),
          ],
          // Налаштування для відображення тексту етапу в списку Sanity Studio
          preview: {
            select: {
              title: 'title.pl', // показуватиме польський текст як заголовок у списку
            },
            prepare({title}) {
              return {
                title: title || 'Без назви',
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(6)
          .max(6)
          .error('Для цієї секції необхідно додати рівно 6 етапів (не більше і не менше).'),
    }),

    defineField({
      name: 'bgImage',
      title: 'Фонове зображення (Illustration)',
      type: 'image',
      options: {
        hotspot: true, // дозволяє вибирати центр фокусу зображення
      },
    }),
  ],
})
