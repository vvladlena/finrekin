// schemas/heroSection.js

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Секція Hero',
  type: 'object',
  fields: [
    // Title (використовує localePortableText)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localePortableText',
    }),
    // Subtitle (використовує localeString)
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    }),
    // Button Text (використовує localeString)
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    }),
    // Image
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
    }),
    // Services List
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'localeString',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
  ],
})
