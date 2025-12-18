import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Футер (Контакти та реквізити)',
  type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Назва компанії', type: 'localeString'}),
    defineField({name: 'address', title: 'Адреса (вулиця, номер)', type: 'localeString'}),
    defineField({name: 'city', title: 'Місто та індекс', type: 'localeString'}),
    defineField({name: 'taxId', title: 'NIP', type: 'string'}),
    defineField({name: 'regId', title: 'REGON', type: 'string'}),
    defineField({name: 'capital', title: 'Статутний капітал', type: 'localeString'}),
    defineField({
      name: 'privacyPolicyLabel',
      title: 'Текст Політики конфіденційності',
      type: 'localeString',
    }),
    defineField({name: 'devLabel', title: 'Текст Створення сайтів', type: 'localeString'}),
  ],
})
