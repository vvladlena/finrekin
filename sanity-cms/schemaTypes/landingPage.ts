// schemas/landingPage.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page (Частина 1: Основна)',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Секція Hero',
      type: 'heroSection',
    }),
    defineField({
      name: 'offersSection',
      title: 'Секція Актуальні Пропозиції',
      type: 'offersSection',
    }),
    defineField({
      name: 'aboutSection',
      title: 'Секція Про Нас',
      type: 'aboutSection',
    }),
    defineField({
      name: 'bannerSection',
      title: 'Секція Баннер',
      type: 'bannerSection',
    }),
    defineField({
      name: 'areaSection',
      title: 'Секція Напрямки Роботи',
      type: 'areaSection',
    }),
    defineField({
      name: 'globalFormFields',
      title: 'Глобальні тексти форми',
      type: 'formFields',
      description: 'Ці тексти будуть використовуватися у всіх формах на сайті',
    }),
    defineField({
      name: 'contactFormSection',
      title: 'Секція Контактна Форма',
      type: 'contactFormSection',
    }),
    defineField({
      name: 'transparencySection',
      title: 'Секція: Прозорість (Transparency)',
      type: 'transparencySection',
    }),
    defineField({
      name: 'opinionsSection',
      title: 'Секція: Відгуки',
      type: 'opinionsSection',
    }),
    defineField({
      name: 'stepsSection',
      title: 'Секція Етапів роботи',
      type: 'stepsSection',
    }),
    defineField({
      name: 'contactSection',
      title: 'Секція контактів (Footer)',
      type: 'contactSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Головна сторінка (Частина 1)',
        subtitle: 'Основні секції сайту',
      }
    },
  },
})
