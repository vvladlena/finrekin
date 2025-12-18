// schemas/localePortableText.js

import {defineType} from 'sanity'

// Визначення highlights (буде використовуватися у всіх Portable Text)
const highlightAnnotation = {
  name: 'highlight',
  type: 'object',
  title: 'Highlight',
  fields: [
    {
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: [
          {title: 'Primary', value: 'text-primary'},
          {title: 'Secondary', value: 'text-secondary'},
        ],
      },
    },
  ],
}

export default defineType({
  name: 'localePortableText',
  title: 'Multi-language Text Blocks',
  type: 'object',
  fields: ['pl', 'ua', 'en', 'ru'].map((lang) => ({
    name: lang,
    title: lang.toUpperCase(),
    type: 'array',
    of: [
      {
        type: 'block',
        marks: {
          annotations: [highlightAnnotation],
        },
      },
    ],
  })),
})
