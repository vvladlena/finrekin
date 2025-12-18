import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactFormSection',
  title: 'Секція: Контактна Форма (Footer CTA)',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Підзаголовок секції (Малий текст)',
      type: 'localeString',
      description: 'Наприклад, "Skontaktuj się з nami".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainTitle',
      title: 'Головний Заголовок',
      type: 'localePortableText',
      description: 'Великий заголовок секції.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainDescription',
      title: 'Опис під заголовком',
      type: 'localeString',
      description: 'Текст, що закликає залишити контакти.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'phoneText',
      title: 'Текст поруч з телефоном (час роботи)',
      type: 'string',
      description: 'Наприклад, "• 10:00 do 17:00".',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Телефон',
      type: 'string',
    }),

    // ✅ Залишаємо соцмережі тільки якщо вони відрізняються від футера
    defineField({
      name: 'socialLinks',
      title: 'Соціальні Мережі',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Назва', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'icon', title: 'Іконка', type: 'image'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle.pl'},
    prepare({title}) {
      return {
        title: `📞 Контакти: ${title || 'Без заголовка'}`,
      }
    },
  },
})
