export default {
  name: 'formFields',
  title: 'Pola formularza',
  type: 'object',
  fields: [
    {name: 'title', title: 'Tytuł formularza', type: 'localeString'},
    {name: 'namePlaceholder', title: 'Placeholder imienia', type: 'localeString'},
    {name: 'messagePlaceholder', title: 'Placeholder wiadomości', type: 'localeString'},
    {name: 'privacyText', title: 'Tekst prywatności (przed linkiem)', type: 'localeString'},
    {name: 'privacyLink', title: 'Tekst linku prywatności', type: 'localeString'},
    {name: 'submitButton', title: 'Tekst przycisku', type: 'localeString'},
    {name: 'sendingText', title: 'Tekst podczas wysyłania', type: 'localeString'},
    {name: 'successText', title: 'Tekst sukcesu (na przycisku)', type: 'localeString'},
    {name: 'errorText', title: 'Tekst błędu (na przycisku)', type: 'localeString'},
    {name: 'thankYouMessage', title: 'Wiadomość podziękowania', type: 'localeString'},
  ],
}
