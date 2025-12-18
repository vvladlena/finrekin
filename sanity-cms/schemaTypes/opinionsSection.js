import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'opinionsSection',
  title: 'Секція: Відгуки (Opinions)',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Підзаголовок секції',
      type: 'localeString',
      description: 'Наприклад, "Opinie"',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Головний заголовок',
      type: 'localePortableText',
      description: 'Заголовок з можливістю виділення кольором',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '⭐ Секція: Відгуки (Elfsight)',
      }
    },
  },
})
