// schemas/landingPageSecondary.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPageSecondary',
  title: 'Landing Page (Частина 2: Ціни та FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'priceSection',
      title: 'Секція Ціни та Послуги',
      type: 'priceSection',
    }),
    defineField({
      name: 'faqSection',
      title: 'Секція FAQ',
      type: 'faqSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '💰 Ціни та FAQ (Частина 2)',
        subtitle: 'Додатковий контент',
      }
    },
  },
})
