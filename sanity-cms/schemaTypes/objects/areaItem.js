// schemas/objects/areaItem.js

export default {
  name: 'areaItem',
  title: 'Область спеціалізації',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Назва напрямку (Багатомовна)',
      type: 'localeString', // Використовує ваш базовий багатомовний тип
      validation: (Rule) => Rule.required(),
      description: 'Коротка назва напрямку, що відображається на картці.',
    },
    {
      name: 'icon',
      title: 'Іконка',
      type: 'image', // Тип для зображення/іконки
      options: {
        hotspot: true, // Дозволяє кадрування
      },
      description: 'Іконка, що представляє цей напрямок (має бути SVG або невеликий PNG).',
      validation: (Rule) => Rule.required(),
    },
    // Тут можна додати інші поля, наприклад, короткий опис, якщо це потрібно на картці
  ],

  // ✅ Preview: Як об'єкт відображатиметься у списку
  preview: {
    select: {
      title: 'title.pl', // Показуємо назву польською мовою в прев'ю
      media: 'icon', // Використовуємо іконку як медіа
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Немає назви',
        subtitle: 'Елемент спеціалізації',
        media: media,
      }
    },
  },
}
