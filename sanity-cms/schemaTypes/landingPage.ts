// schemas/landingPage.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page (Частина 1: Основна)',
  type: 'document',

  // 1. Оголошуємо групи (вкладки), які з'являться зверху в адмінці
  groups: [
    {
      name: 'general',
      title: 'Контакти та Хедер',
      default: true, // Ця вкладка буде відкрита першою
    },
    {
      name: 'content',
      title: 'Контент сторінки',
    },
    {
      name: 'forms',
      title: 'Тексти та Форми',
    },
  ],

  fields: [
    // --- ГРУПА: КОНТАКТИ ---
    defineField({
      name: 'contactSection',
      title: 'Секція контактів (Шапка сайту та футер)',
      type: 'contactSection',
      group: 'general', // Прив'язка до вкладки
    }),

    // --- ГРУПА: КОНТЕНТ СТОРІНКИ ---
    defineField({
      name: 'hero',
      title: 'Секція Hero',
      type: 'heroSection',
      group: 'content',
    }),
    defineField({
      name: 'offersSection',
      title: 'Секція Актуальні Пропозиції',
      type: 'offersSection',
      group: 'content',
    }),
    defineField({
      name: 'aboutSection',
      title: 'Секція Про Нас',
      type: 'aboutSection',
      group: 'content',
    }),
    defineField({
      name: 'bannerSection',
      title: 'Секція Баннер',
      type: 'bannerSection',
      group: 'content',
    }),
    defineField({
      name: 'areaSection',
      title: 'Секція Напрямки Роботи',
      type: 'areaSection',
      group: 'content',
    }),
    defineField({
      name: 'transparencySection',
      title: 'Секція: Прозорість (Transparency)',
      type: 'transparencySection',
      group: 'content',
    }),
    defineField({
      name: 'opinionsSection',
      title: 'Секція: Відгуки',
      type: 'opinionsSection',
      group: 'content',
    }),
    defineField({
      name: 'stepsSection',
      title: 'Секція Етапів роботи',
      type: 'stepsSection',
      group: 'content',
    }),

    // --- ГРУПА: ТЕКСТИ ТА ФОРМИ ---
    defineField({
      name: 'globalFormFields',
      title: 'Глобальні тексти форми',
      type: 'formFields',
      description: 'Ці тексти будуть використовуватися у всіх формах на сайті',
      group: 'forms',
    }),
    defineField({
      name: 'contactFormSection',
      title: 'Секція Контактна Форма',
      type: 'contactFormSection',
      group: 'forms',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '🏠 Головна сторінка (Частина 1)',
        subtitle: 'Контент розділений за вкладками',
      }
    },
  },
})
