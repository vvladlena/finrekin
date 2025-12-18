import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Секція Контактів та Хедер',
  type: 'object',
  fields: [
    // --- Поля для Хедера ---
    defineField({name: 'navServices', title: 'Меню: Послуги', type: 'localeString'}),
    defineField({name: 'navAbout', title: 'Меню: Про нас', type: 'localeString'}),
    defineField({name: 'navContact', title: 'Меню: Контакти', type: 'localeString'}),
    defineField({name: 'contactButtonLabel', title: 'Текст кнопки (Хедер)', type: 'localeString'}),
    defineField({name: 'addressLabel', title: 'Підпис під адресою (Хедер)', type: 'localeString'}),
    defineField({name: 'mapLabel', title: 'Текст: Як добратися (Моб. меню)', type: 'localeString'}),

    // --- контакти ---
    defineField({
      name: 'sectionTitle',
      title: 'Малий заголовок секції (на сторінці)',
      type: 'localeString',
    }),
    defineField({
      name: 'phone',
      title: 'Номер телефону',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Електронна пошта',
      type: 'string',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Адреса (Рядок 1)',
      type: 'localeString',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Адреса (Рядок 2)',
      type: 'localeString',
    }),
    defineField({
      name: 'addressUrl',
      title: 'Посилання на Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'socials',
      title: 'Соціальні мережі',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialItem',
          fields: [
            defineField({name: 'name', title: 'Назва', type: 'string'}),
            defineField({name: 'url', title: 'Посилання', type: 'url'}),
            defineField({name: 'icon', title: 'Іконка', type: 'image'}),
          ],
        },
      ],
    }),
  ],
})
