import { v4 as uuidv4 } from "uuid";

// Хелпер для додавання ключа
const withKey = (obj) => ({
  _key: uuidv4(),
  ...obj,
});
const withPortableTextKeys = (blocks) =>
  blocks.map((block) => ({
    _key: uuidv4(),
    ...block,
    children: block.children?.map((child) => ({
      _key: uuidv4(),
      ...child,
    })),
  }));
// -------------------------------------------------------------
// 1. HELPER: Функції для створення Portable Text
// -------------------------------------------------------------

// Допоміжна функція для створення Portable Text з коректною структурою
// Приймає масив об'єктів { text: "...", highlight: true/false }
const createBlockWithHighlight = (segments) => {
  const highlightMarkKey = uuidv4();
  // Визначаємо анотацію, яка відповідає схемі: _type: "highlight" та поле color
  const highlightDef = {
    _key: highlightMarkKey,
    _type: "highlight",
    color: "text-secondary", // Фіксований колір для імпорту
  };

  const children = segments.map((segment) => {
    let marks = [];
    if (segment.highlight) {
      marks.push(highlightMarkKey);
    }
    // Додаємо звичайні декоратори, якщо потрібно (наприклад, 'strong')
    if (segment.strong) {
      marks.push("strong");
    }

    return {
      _key: uuidv4(),
      _type: "span",
      text: segment.text,
      marks: marks,
    };
  });

  // Перевіряємо, чи потрібна markDef (якщо є хоч одне виділення)
  const requiresMarkDef = segments.some((s) => s.highlight);

  return [
    {
      _key: uuidv4(),
      _type: "block",
      style: "normal",
      markDefs: requiresMarkDef ? [highlightDef] : [],
      children: children,
    },
  ];
};

// -------------------------------------------------------------
// 2. HELPER: Структури зображень для Mock та Sanity Import
// -------------------------------------------------------------

// 🛑 ДЛЯ MOCK (ВИКОРИСТОВУЄТЬСЯ В Next.js)
const mockImageRef = (path) => ({
  _type: "image",
  asset: { _ref: "mock-ref-" + uuidv4() },
  mockPath: path, // Додаємо шлях для next/image loader
});

// ✅ ДЛЯ SANITY IMPORT (ОЧИЩЕНИЙ ВІД ПОСИЛАНЬ)
const emptySanityImage = () => ({
  _type: "image",
});

// -------------------------------------------------------------
// 3. ЕКСПОРТ: Дані для Next.js (Mock)
// -------------------------------------------------------------
const bannerSectionData = {
  bannerTitle: {
    pl: "FinRekin to wrocławska firma księgowa obsługująca klientów w całej Polsce",
    ua: "FinRekin — вроцлавська бухгалтерська фірма, що обслуговує клієнтів по всій Польщі",
    ru: "FinRekin — вроцлавское бухгалтерское бюро, обслуживающее клиентов по всей Польше",
    en: "FinRekin is a Wrocław-based accounting firm serving clients throughout Poland",
  },
  bannerDescription: {
    // === PL ===
    pl: [
      {
        _key: "pl-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "pl-1a", _type: "span", text: "Obecnie zaufało nam " },
          {
            _key: "pl-1b",
            _type: "span",
            marks: ["strong"],
            text: "ponad 200 klientów,",
          },
          {
            _key: "pl-1c",
            _type: "span",
            text: " od jednoosobowych działalności gospodarczych po spółki o bardziej złożonej strukturze.",
          },
        ],
      },
      {
        _key: "pl-2",
        _type: "block",
        style: "normal",
        children: [
          { _key: "pl-2a", _type: "span", text: "Nasi specjaliści posiadają " },
          {
            _key: "pl-2b",
            _type: "span",
            marks: ["strong"],
            text: "wieloletnie doświadczenie",
          },
          {
            _key: "pl-2c",
            _type: "span",
            text: " w dziedzinie księgowości, a dla dodatkowego bezpieczeństwa naszych klientów jesteśmy objęci polisą ubezpieczenia zawodowego.",
          },
        ],
      },
      {
        _key: "pl-3",
        _type: "block",
        style: "normal",
        children: [
          { _key: "pl-3a", _type: "span", text: "Używamy " },
          {
            _key: "pl-3b",
            _type: "span",
            marks: ["strong"],
            text: "Saldeo Smart",
          },
          {
            _key: "pl-3c",
            _type: "span",
            text: " do wygodnej wymiany dokumentów. Niezależnie od tego, gdzie jesteś - zawsze jesteśmy pod telefonem, gotowi pomóc i zająć się wszystkimi zadaniami księgowymi.",
          },
        ],
      },
    ],
    // === UA ===
    ua: [
      {
        _key: "ua-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "ua-1a", _type: "span", text: "Наразі нам довіряють " },
          {
            _key: "ua-1b",
            _type: "span",
            marks: ["strong"],
            text: "понад 200 клієнтів,",
          },
          {
            _key: "ua-1c",
            _type: "span",
            text: " від індивідуальних підприємців до компаній зі складнішою структурою.",
          },
        ],
      },
      {
        _key: "ua-2",
        _type: "block",
        style: "normal",
        children: [
          { _key: "ua-2a", _type: "span", text: "Наші фахівці мають " },
          {
            _key: "ua-2b",
            _type: "span",
            marks: ["strong"],
            text: "багаторічний досвід",
          },
          {
            _key: "ua-2c",
            _type: "span",
            text: " у сфері бухгалтерського обліку, а для додаткової безпеки наших клієнтів ми покриті полісом професійного страхування.",
          },
        ],
      },
      {
        _key: "ua-3",
        _type: "block",
        style: "normal",
        children: [
          { _key: "ua-3a", _type: "span", text: "Ми використовуємо " },
          {
            _key: "ua-3b",
            _type: "span",
            marks: ["strong"],
            text: "Saldeo Smart",
          },
          {
            _key: "ua-3c",
            _type: "span",
            text: " для зручного обміну документами. Незалежно від того, де ви знаходитесь – ми завжди на зв'язку, готові допомогти та зайнятися всіма вашими бухгалтерськими завданнями.",
          },
        ],
      },
    ],
    // === RU ===
    ru: [
      {
        _key: "ru-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "ru-1a",
            _type: "span",
            text: "На данный момент нам доверяют ",
          },
          {
            _key: "ru-1b",
            _type: "span",
            marks: ["strong"],
            text: "более 200 клиентов,",
          },
          {
            _key: "ru-1c",
            _type: "span",
            text: " от индивидуальных предпринимателей до компаний с более сложной структурой.",
          },
        ],
      },
      {
        _key: "ru-2",
        _type: "block",
        style: "normal",
        children: [
          { _key: "ru-2a", _type: "span", text: "Наши специалисты обладают " },
          {
            _key: "ru-2b",
            _type: "span",
            marks: ["strong"],
            text: "многолетним опытом",
          },
          {
            _key: "ru-2c",
            _type: "span",
            text: " в области бухгалтерского учета, а для дополнительной безопасности наших клиентов мы покрыты полисом профессионального страхования.",
          },
        ],
      },
      {
        _key: "ru-3",
        _type: "block",
        style: "normal",
        children: [
          { _key: "ru-3a", _type: "span", text: "Мы используем " },
          {
            _key: "ru-3b",
            _type: "span",
            marks: ["strong"],
            text: "Saldeo Smart",
          },
          {
            _key: "ru-3c",
            _type: "span",
            text: " для удобного обмена документами. Независимо от того, где вы находитесь — мы всегда на телефоне, готовы помочь и заняться всеми вашими бухгалтерскими задачами.",
          },
        ],
      },
    ],
    // === EN ===
    en: [
      {
        _key: "en-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "en-1a",
            _type: "span",
            text: "Currently, we are trusted by ",
          },
          {
            _key: "en-1b",
            _type: "span",
            marks: ["strong"],
            text: "over 200 clients,",
          },
          {
            _key: "en-1c",
            _type: "span",
            text: " ranging from sole proprietorships to companies with more complex structures.",
          },
        ],
      },
      {
        _key: "en-2",
        _type: "block",
        style: "normal",
        children: [
          { _key: "en-2a", _type: "span", text: "Our specialists have " },
          {
            _key: "en-2b",
            _type: "span",
            marks: ["strong"],
            text: "many years of experience",
          },
          {
            _key: "en-2c",
            _type: "span",
            text: " in accounting, and for the added security of our clients, we are covered by a professional insurance policy.",
          },
        ],
      },
      {
        _key: "en-3",
        _type: "block",
        style: "normal",
        children: [
          { _key: "en-3a", _type: "span", text: "We use " },
          {
            _key: "en-3b",
            _type: "span",
            marks: ["strong"],
            text: "Saldeo Smart",
          },
          {
            _key: "en-3c",
            _type: "span",
            text: " for convenient document exchange. No matter where you are – we are always on the phone, ready to help and take care of all your accounting tasks.",
          },
        ],
      },
    ],
  },
};
const areaSectionData = {
  // Головний заголовок (Portable Text - для жирного тексту)
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Świadczymy usługi " },
      { text: "dla różnych sektorów", highlight: true },
      { text: " biznesowych" },
    ]),
    ua: createBlockWithHighlight([
      { text: "Надаємо послуги " },
      { text: "для різних секторів", highlight: true },
      { text: " бізнесу" },
    ]),
    en: createBlockWithHighlight([
      { text: "We provide services " },
      { text: "for various business", highlight: true },
      { text: " sectors" },
    ]),
    ru: createBlockWithHighlight([
      { text: "Предоставляем услуги " },
      { text: "для различных секторов", highlight: true },
      { text: " бизнеса" },
    ]),
  },
  // Підзаголовок (Portable Text - для жирного тексту)
  mainSubtitle: {
    pl: [
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "p-1a", _type: "span", text: "Naszą misją jest " },
          {
            _key: "p-1b",
            _type: "span",
            marks: ["strong"],
            text: "uwolnienie Cię od zmartwień związanych z księgowością,",
          },
          {
            _key: "p-1c",
            _type: "span",
            text: " abyś mógł skoncentrować się na rozwijaniu swojego biznesu. Ważne jest dla nas, aby dane liczbowe odzwierciedlały rzeczywisty stan Twojej firmy - jasno, uczciwie i na temat.",
          },
        ],
      },
    ],
    ua: [
      {
        _key: "u-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "u-1a", _type: "span", text: "Нашою місією є " },
          {
            _key: "u-1b",
            _type: "span",
            marks: ["strong"],
            text: "звільнити Вас від турбот з бухгалтерією,",
          },
          {
            _key: "u-1c",
            _type: "span",
            text: " щоб Ви могли зосередитися на розвитку свого бізнесу. Для нас важливо, щоб цифри відображали реальний стан Вашої компанії — чітко, чесно та по суті.",
          },
        ],
      },
    ],
    en: [
      {
        _key: "e-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "e-1a", _type: "span", text: "Our mission is to " },
          {
            _key: "e-1b",
            _type: "span",
            marks: ["strong"],
            text: "free you from accounting worries,",
          },
          {
            _key: "e-1c",
            _type: "span",
            text: " so you can focus on growing your business. It is important to us that the figures reflect the real state of your company - clearly, honestly, and to the point.",
          },
        ],
      },
    ],
    ru: [
      {
        _key: "r-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "r-1a", _type: "span", text: "Наша миссия — " },
          {
            _key: "r-1b",
            _type: "span",
            marks: ["strong"],
            text: "освободить Вас от забот с бухгалтерией,",
          },
          {
            _key: "r-1c",
            _type: "span",
            text: " чтобы Вы могли сосредоточиться на развитии своего бизнеса. Для нас важно, чтобы цифры отражали реальное состояние Вашей компании — четко, честно и по существу.",
          },
        ],
      },
    ],
  },

  // Додатковий текст під картками (String)
  additionalText: {
    pl: "Podobnie jak w innych branżach – dostosowujemy rozwiązanie do potrzeb Twojej firmy",
    ua: "Як і в інших галузях — ми адаптуємо рішення до потреб Вашої компанії",
    en: "As in other industries, we adapt the solution to the needs of your company",
    ru: "Как и в других отраслях — мы адаптируем решение под нужды Вашей компании",
  },

  // Масив карток спеціалізації
  areasList: [
    withKey({
      title: {
        pl: "Księgowość dla e-commerce",
        ua: "Бухгалтерія для e-commerce",
        en: "Accounting for e-commerce",
        ru: "Бухгалтерия для e-commerce",
      },
      icon: mockImageRef("/images/icons/area-1.svg"),
    }),
    withKey({
      title: {
        pl: "Księgowość dla firm IT i freelancerów",
        ua: "Бухгалтерія для IT-фірм та фрілансерів",
        en: "Accounting for IT companies and freelancers",
        ru: "Бухгалтерия для IT-фирм и фрилансеров",
      },
      icon: mockImageRef("/images/icons/area-2.svg"),
    }),
    withKey({
      title: {
        pl: "Księgowość dla nieruchomości",
        ua: "Бухгалтерія для нерухомості",
        en: "Accounting for real estate",
        ru: "Бухгалтерия для недвижимости",
      },
      icon: mockImageRef("/images/icons/area-3.svg"),
    }),
    withKey({
      title: {
        pl: "Księgowość dla firm transportowych i logistycznych",
        ua: "Бухгалтерія для транспортних та логістичних фірм",
        en: "Accounting for transport and logistics companies",
        ru: "Бухгалтерия для транспортных и логистических фирм",
      },
      icon: mockImageRef("/images/icons/area-4.svg"),
    }),
    withKey({
      title: {
        pl: "Księgowość dla salonów kosmetycznych i usług kosmetycznych",
        ua: "Бухгалтерія для салонів краси та косметичних послуг",
        en: "Accounting for beauty salons and cosmetic services",
        ru: "Бухгалтерия для салонов красоты и косметических услуг",
      },
      icon: mockImageRef("/images/icons/area-5.svg"),
    }),
    withKey({
      title: {
        pl: "Księgowość dla firm budowlanych",
        ua: "Бухгалтерія для будівельних фірм",
        en: "Accounting for construction companies",
        ru: "Бухгалтерия для строительных фирм",
      },
      icon: mockImageRef("/images/icons/area-6.svg"),
    }),
  ],
};
const formFieldsData = {
  title: {
    pl: "Zostaw prośbę",
    ua: "Залишити запит",
    en: "Leave a request",
    ru: "Оставить заявку",
  },
  namePlaceholder: {
    pl: "Jak mam się do ciebie zwracać?",
    ua: "Як до Вас звертатися?",
    en: "How should I address you?",
    ru: "Как к Вам обращаться?",
  },
  messagePlaceholder: {
    pl: "Napisz, w jakiej sprawie możemy Ci pomóc",
    ua: "Напишіть, з якого питання ми можемо Вам допомогти",
    en: "Write how we can help you",
    ru: "Напишите, по какому вопросу ми можем Вам помочь",
  },
  privacyText: {
    pl: "Kliknięcie przycisku oznacza akceptację ",
    ua: "Натискання кнопки означає згоду з ",
    en: "Clicking the button means accepting ",
    ru: "Нажатие кнопки означает согласие с ",
  },
  privacyLink: {
    pl: "polityki prywatności",
    ua: "політикою конфіденційності",
    en: "privacy policy",
    ru: "политикой конфиденциальности",
  },
  submitButton: {
    pl: "Uzyskaj poradę",
    ua: "Отримати консультацію",
    en: "Get advice",
    ru: "Получить консультацию",
  },
  sendingText: {
    pl: "Wysyłanie...",
    ua: "Відправлення...",
    en: "Sending...",
    ru: "Отправка...",
  },
  successText: {
    pl: "Wysłano!",
    ua: "Відправлено!",
    en: "Sent!",
    ru: "Отправлено!",
  },
  errorText: {
    pl: "Błąd, spróbuj ponownie",
    ua: "Помилка, спробуйте ще раз",
    en: "Error, try again",
    ru: "Ошибка, попробуйте еще раз",
  },
  thankYouMessage: {
    pl: "Dziękujemy! Dane wysłane pomyślnie.",
    ua: "Дякуємо! Дані успішно відправлені.",
    en: "Thank you! Data sent successfully.",
    ru: "Спасибо! Данные успешно отправлены.",
  },
};
const mockContactData = {
  sectionTitle: {
    pl: "Skontaktuj się z nami",
    ua: "Зв'яжіться з нами",
  },
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Pomożemy Ci " },
      { text: "zarejestrować firmę", highlight: true },
      { text: " w Polsce" },
    ]),
    ua: createBlockWithHighlight([
      { text: "Ми допоможемо Вам " },
      { text: "зареєструвати фірму", highlight: true },
      { text: " в Польщі" },
    ]),
  },
  mainDescription: {
    pl: "Zostaw swoje dane kontaktowe, a my skontaktujemy się z Tobą w celu przeprowadzenia bezpłatnej konsultacji",
    ua: "Залиште свої контактні дані, і ми зв'яжемося з Вами для проведення безкоштовної консультації",
  },
  phoneNumber: "+48 608 771 993",
  phoneText: "• 10:00 do 17:00",
  socialLinks: [
    {
      _key: "telegram",
      name: "Telegram",
      url: "https://t.me/finrekin",
      icon: mockImageRef("/images/icons/telegram.svg"),
    },
    {
      _key: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/finrekin_biuro",
      icon: mockImageRef("/images/icons/instagram.svg"),
    },
  ],
  formFields: formFieldsData,
};
const transparencyData = {
  // Заголовок з хайлайтом (Portable Text)
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Opowiadamy się za " },
      { text: "przejrzystą księgowością", highlight: true },
    ]),
    ua: createBlockWithHighlight([
      { text: "Ми виступаємо за " },
      { text: "прозору бухгалтерію", highlight: true },
    ]),
    ru: createBlockWithHighlight([
      { text: "Мы выступаем за " },
      { text: "прозрачную бухгалтерию", highlight: true },
    ]),
    en: createBlockWithHighlight([
      { text: "We stand for " },
      { text: "transparent accounting", highlight: true },
    ]),
  },

  // Опис (String)
  description: {
    pl: "Wyjaśniamy skomplikowane kwestie w prosty sposób. Zawsze jesteśmy pod telefonem, aby odpowiedzieć na pytania, pomóc w załatwieniu formalności i powiadomić o ważnych terminach. Z nami wszystko jest jasne, wygodне i bezstresowe.",
    ua: "Ми просто пояснюємо складні питання. Ми завжди на зв’язку, щоб відповісти на запитання, допомогти з формальностями та попередити про важливі терміни. З нами все зрозуміло, зручно та без стресу.",
    ru: "Мы просто объясняем сложные вопросы. Мы всегда на связи, чтобы ответить на вопросы, помочь с формальностями и предупредить о важных сроках. С нами все понятно, удобно и без стресса.",
    en: "We explain complex issues in a simple way. We are always available by phone to answer questions, help with formalities, and notify you of important deadlines. With us, everything is clear, convenient, and stress-free.",
  },

  // Список пунктів
  featuresList: [
    withKey({
      title: {
        pl: "Czy chcesz zmienić księgowego?",
        ua: "Бажаєте змінити бухгалтера?",
        ru: "Хотите сменить бухгалтера?",
        en: "Do you want to change your accountant?",
      },
      text: {
        pl: "Pomożemy Ci przenieść księgowość szybko i bezstresowo. Sprawdzimy dokumenty, zrozumiemy obecną sytuację, poprawimy ją w razie potrzeby.",
        ua: "Ми допоможемо вам перенести бухгалтерію швидко і без стресу. Перевіримо документи, розберемося в поточній ситуації, за потреби виправимо її.",
        ru: "Мы поможем вам перенести бухгалтерию быстро и без стресса. Проверим документы, разберемся в текущей ситуации, при необходимости исправим ее.",
        en: "We will help you transfer your accounting quickly and stress-free. We will check the documents, understand the current situation, and correct it if necessary.",
      },
    }),
    withKey({
      title: {
        pl: "Dopiero zaczynasz działalność?",
        ua: "Тільки починаєте діяльність?",
        ru: "Только начинаете деятельность?",
        en: "Just starting a business?",
      },
      text: {
        pl: "Doradzimy, jaki formularz wybrać, przygotujemy i złożymy dokumenty, zarejestrujemy firmę i założymy księgowość.",
        ua: "Порадимо, яку форму оподаткування обрати, підготуємо та подамо документи, зареєструємо фірму та запустимо бухгалтерію.",
        ru: "Посоветуем, какую форму налогообложения выбрать, подготовим и подадим документы, зарегистрируем фирму и запустим бухгалтерию.",
        en: "We will advise you on which form to choose, prepare and submit documents, register the company, and set up the accounting.",
      },
    }),
    withKey({
      title: {
        pl: "Łatwy start — bez wizyt",
        ua: "Легкий старт — без візитів",
        ru: "Легкий старт — без визитов",
        en: "Easy start — no visits required",
      },
      text: {
        pl: "Umowę zawieramy online. Nie trzeba przyjeżdżać, czekać ani wypełniać wielu dokumentów. Wszystko jest proste, jasne i oficjalne.",
        ua: "Договір укладаємо онлайн. Не потрібно приїжджати, чекати чи заповнювати купу паперів. Все просто, зрозуміло та офіційно.",
        ru: "Договор заключаем онлайн. Не нужно приезжать, ждать или заполнять кучу бумаг. Все просто, понятно и официально.",
        en: "We conclude the contract online. No need to visit, wait, or fill out numerous documents. Everything is simple, clear, and official.",
      },
    }),
    withKey({
      title: {
        pl: "Zawsze pod telefonem — bez dodatkowych opłat",
        ua: "Завжди на зв'язку — без додаткових оплат",
        ru: "Всегда на связи — без дополнительных оплат",
        en: "Always available by phone — no extra fees",
      },
      text: {
        pl: "Wszystkie konsultacje w ramach umowy są bezpłatne i bez ograniczeń. Jesteśmy do Twojej dyspozycji, kiedy nas potrzebujesz.",
        ua: "Всі консультації в межах договору безкоштовні та без обмежень. Ми у вашому розпорядженні тоді, коли ми вам потрібні.",
        ru: "Все консультации в рамках договора бесплатны и без ограничений. Мы в вашем распоряжении тогда, когда мы вам нужны.",
        en: "All consultations under the contract are free and unlimited. We are at your disposal whenever you need us.",
      },
    }),
    withKey({
      title: {
        pl: "Usługi dodatkowe",
        ua: "Додаткові послуги",
        ru: "Дополнительные услуги",
        en: "Additional services",
      },
      text: {
        pl: 'Oferujemy szereg dodatkowych usług na indywidualne zamówienie. <a href="#services">Kliknij tutaj</a>, aby wyświetlić pełную listę.',
        ua: 'Ми пропонуємо ряд додаткових послуг за індивідуальним замовленням. <a href="#services">Натисніть тут</a>, щоб переглянути повний список.',
        ru: 'Мы предлагаем ряд дополнительных услуг по индивидуальному заказу. <a href="#services">Нажмите здесь</a>, чтобы просмотреть полный список.',
        en: 'We offer a range of additional services upon individual request. <a href="#services">Click here</a> to view the full list.',
      },
    }),
  ],
  // Зображення
  imageTop: mockImageRef("/images/team-1.png"),
  imageBottom: mockImageRef("/images/team-2.png"),
};
const opinionsData = {
  sectionTitle: {
    pl: "Opinie",
    ua: "Відгуки",
    ru: "Отзывы",
    en: "Testimonials",
  },
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Twoja opinia czyni " },
      { text: "nas lepszymi", highlight: true },
    ]),
    ua: createBlockWithHighlight([
      { text: "Ваша думка робить " },
      { text: "нас кращими", highlight: true },
    ]),
    ru: createBlockWithHighlight([
      { text: "Ваше мнение делает " },
      { text: "нас лучше", highlight: true },
    ]),
    en: createBlockWithHighlight([
      { text: "Your feedback makes " },
      { text: "us better", highlight: true },
    ]),
  },
};
const stepsSectionData = {
  sectionTitle: {
    pl: "Etapy pracy",
    ua: "Етапи роботи",
    ru: "Этапы работы",
    en: "Workflow Stages",
  },
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Od aplikacji " },
      { text: "do wyników", highlight: true },
    ]),
    ua: createBlockWithHighlight([
      { text: "Від заявки " },
      { text: "до результатів", highlight: true },
    ]),
    ru: createBlockWithHighlight([
      { text: "От заявки " },
      { text: "до результатов", highlight: true },
    ]),
    en: createBlockWithHighlight([
      { text: "From application " },
      { text: "to results", highlight: true },
    ]),
  },
  stepsList: [
    withKey({
      title: {
        pl: "Aplikacja i wstępna konsultacja",
        ua: "Заявка та попередня консультація",
        ru: "Заявка и предварительная консультация",
        en: "Application and initial consultation",
      },
    }),
    withKey({
      title: {
        pl: "Analiza działalności i zawarcie umowy",
        ua: "Аналіз діяльності та укладення договору",
        ru: "Анализ деятельности и заключение договора",
        en: "Business analysis and contract signing",
      },
    }),
    withKey({
      title: {
        pl: "Konfigurowanie metod księgowania",
        ua: "Налаштування методів обліку",
        ru: "Настройка методов учета",
        en: "Setting up accounting methods",
      },
    }),
    withKey({
      title: {
        pl: "Miesięczne wsparcie księgowe",
        ua: "Щомісячний бухгалтерський супровід",
        ru: "Ежемесячное бухгалтерское сопровождение",
        en: "Monthly accounting support",
      },
    }),
    withKey({
      title: {
        pl: "Analiza wskaźników miesięcznych",
        ua: "Аналіз місячних показників",
        ru: "Анализ месячных показателей",
        en: "Analysis of monthly indicators",
      },
    }),
    withKey({
      title: {
        pl: "Rezultat: stabilna i legalna działalність",
        ua: "Результат: стабільна та легальна діяльність",
        ru: "Результат: стабильная и легальная деятельность",
        en: "Result: stable and legal business",
      },
    }),
  ],
  bgImage: mockImageRef("/images/background/steps-bg.png"),
};
const contactSectionData = {
  sectionTitle: {
    pl: "Kontakt",
    ua: "Контакти",
    ru: "Контакты",
    en: "Contact",
  },
  phone: "+48 608 771 993",
  email: "finrekin.wro@gmail.com",
  addressLine1: {
    pl: "ul. Parkowa 25",
    ua: "вул. Паркова 25",
    ru: "ул. Парковая 25",
    en: "25 Parkowa St.",
  },
  addressLine2: {
    pl: "51-516 Wrocław",
    ua: "51-516 Вроцлав",
    ru: "51-516 Вроцлав",
    en: "51-516 Wrocław",
  },
  addressUrl: "https://maps.app.goo.gl/9ZpL9pS6Z6G2", // Справжнє посилання на Parkowa 25, Wrocław
  socials: [
    withKey({
      name: "Telegram",
      url: "https://t.me/finrekin",
      icon: mockImageRef("/images/icons/telegram-blue.svg"),
    }),
    withKey({
      name: "Instagram",
      url: "https://www.instagram.com/finrekin_biuro",
      icon: mockImageRef("/images/icons/instagram-blue.svg"),
    }),
  ],
  navServices: { pl: "Usługi", ua: "Послуги", en: "Services", ru: "Услуги" },
  navAbout: { pl: "O nas", ua: "Про нас", en: "About us", ru: "О нас" },
  navContact: { pl: "Kontakt", ua: "Контакти", en: "Contact", ru: "Контакты" },
  contactButtonLabel: {
    pl: "Skontaktuj się",
    ua: "Зв'язатися",
    en: "Contact us",
    ru: "Связаться",
  },
  addressLabel: {
    pl: "Adres biura",
    ua: "Адреса офісу",
    en: "Office address",
    ru: "Адрес офиса",
  },
  mapLabel: {
    pl: "Jak dojechać?",
    ua: "Як доїхати?",
    en: "Directions",
    ru: "Как доехать?",
  },
};
const priceSectionData = {
  sectionTitle: {
    pl: "Usługi",
    ua: "Послуги",
    ru: "Услуги",
    en: "Services",
  },
  mainTitle: {
    pl: createBlockWithHighlight([
      { text: "Pełna " },
      { text: "lista usług ", highlight: true },
      { text: "naszego biura" },
    ]),
    ua: createBlockWithHighlight([
      { text: "Повний " },
      { text: "перелік послуг ", highlight: true },
      { text: "нашого офісу" },
    ]),
    ru: createBlockWithHighlight([
      { text: "Полный " },
      { text: "перечень услуг ", highlight: true },
      { text: "нашего офиса" },
    ]),
    en: createBlockWithHighlight([
      { text: "Full " },
      { text: "list of services ", highlight: true },
      { text: "of our office" },
    ]),
  },
  services: [
    // --- 1. KSIĘGOWOŚĆ I KADRY ---
    withKey({
      blockTitle: {
        pl: "Księgowość i kadry",
        ua: "Бухгалтерія та кадри",
        ru: "Бухгалтерия и кадры",
        en: "Accounting and HR",
      },
      subBlocks: [
        withKey({
          title: {
            pl: "Zakres oraz cennik usług księgowości i kadr",
            ua: "Обсяг та прайс бухгалтерських та кадрових послуг",
            en: "Scope and pricing of accounting and HR services",
          },
          content: {
            pl: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Do 10 dokumentów, bez VAT — " },
                  { _type: "span", text: "330 PLN netto", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Do 10 dokumentów z podatkiem VAT — ",
                  },
                  {
                    _type: "span",
                    text: "370 PLN netto / miesiąc",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Każdy dodatkowy dokument — " },
                  { _type: "span", text: "5 PLN netto", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Umowa zlecenia — " },
                  {
                    _type: "span",
                    text: "70 PLN netto / os.",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Umowa o pracę — " },
                  {
                    _type: "span",
                    text: "100 PLN netto / os.",
                    marks: ["strong"],
                  },
                ],
              },
            ]),
            ua: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "До 10 документів, без ПДВ — " },
                  { _type: "span", text: "330 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "До 10 документів з ПДВ — " },
                  {
                    _type: "span",
                    text: "370 PLN нетто / місяць",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Кожен наступний документ — " },
                  { _type: "span", text: "5 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Договір доручення (Zlecenia) — " },
                  {
                    _type: "span",
                    text: "70 PLN нетто / ос.",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Трудовий договір (Praca) — " },
                  {
                    _type: "span",
                    text: "100 PLN нетто / ос.",
                    marks: ["strong"],
                  },
                ],
              },
            ]),
            ru: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "До 10 документов, без НДС — " },
                  { _type: "span", text: "330 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "До 10 документов с НДС — " },
                  {
                    _type: "span",
                    text: "370 PLN нетто / месяц",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Каждый доп. документ — " },
                  { _type: "span", text: "5 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Договор поручения (Zlecenia) — " },
                  {
                    _type: "span",
                    text: "70 PLN нетто / чел.",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Трудовой договор (Praca) — " },
                  {
                    _type: "span",
                    text: "100 PLN нетто / чел.",
                    marks: ["strong"],
                  },
                ],
              },
            ]),
            en: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Up to 10 docs, non-VAT — " },
                  { _type: "span", text: "330 PLN net", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Up to 10 docs, VAT registered — " },
                  {
                    _type: "span",
                    text: "370 PLN net / month",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Each additional document — " },
                  { _type: "span", text: "5 PLN net", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Mandate contract (Zlecenia) — " },
                  {
                    _type: "span",
                    text: "70 PLN net / pers.",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Employment contract (Praca) — " },
                  {
                    _type: "span",
                    text: "100 PLN net / pers.",
                    marks: ["strong"],
                  },
                ],
              },
            ]),
          },
        }),
      ],
    }),

    // --- 2. LEGALIZACJA POBYTU ---
    withKey({
      blockTitle: {
        pl: "Legalizacja pobytu",
        ua: "Легалізація перебування",
        ru: "Легализация пребывания",
        en: "Legalization of stay",
      },
      subBlocks: [
        withKey({
          title: {
            pl: "Pakiet podstawowy (brutto)",
            ua: "Базовий пакет (брутто)",
            en: "Basic package (gross)",
          },
          content: {
            pl: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Karta pobytu (działalność, praca) — ",
                  },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Łączenie rodzin, studia — " },
                  { _type: "span", text: "1000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Pobyt stały, rezydent UE — " },
                  { _type: "span", text: "1500 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Zakres pakietu usług:",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Założenie konta, wniosek, rejestracja, przygotowanie dokumentów, instrukcje.",
                  },
                ],
              },
            ]),
            ua: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Карта побиту (бізнес, робота) — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Возз'єднання сім'ї, навчання — " },
                  { _type: "span", text: "1000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Сталий побит, резидент ЄС — " },
                  { _type: "span", text: "1500 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Що входить у пакет:",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Створення кабінету, анкета, запис на подачу, підготовка документів, інструктаж.",
                  },
                ],
              },
            ]),
            ru: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Карта побыту (бизнес, работа) — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Воссоединение семьи, учеба — " },
                  { _type: "span", text: "1000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Постоянный побыт, резидент ЕС — " },
                  { _type: "span", text: "1500 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Что входит в пакет:",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Создание кабинета, анкета, запись на подачу, подготовка документов, инструктаж.",
                  },
                ],
              },
            ]),
            en: withPortableTextKeys([
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Residence card (business, work) — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Family reunification, studies — " },
                  { _type: "span", text: "1000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Permanent residence, EU resident — ",
                  },
                  { _type: "span", text: "1500 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Package includes:",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Account setup, application, registration, doc preparation, instructions.",
                  },
                ],
              },
            ]),
          },
        }),
        withKey({
          title: {
            pl: "Pakiet rozszerzony (brutto)",
            ua: "Розширений пакет (брутто)",
            en: "Extended package (gross)",
          },
          content: {
            pl: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Karta pobytu (biznes, praca) — " },
                  { _type: "span", text: "1850 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Obywatelstwo polskie — " },
                  { _type: "span", text: "3000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Zakres: Pełne wsparcie przez cały proces aplikacji (do otrzymania karty).",
                    marks: ["strong"],
                  },
                ],
              },
            ],
            ua: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Карта побиту (бізнес, робота) — " },
                  { _type: "span", text: "1850 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Громадянство Польщі — " },
                  { _type: "span", text: "3000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Обсяг: Повний супровід протягом усього процесу (до отримання карти).",
                    marks: ["strong"],
                  },
                ],
              },
            ],
            ru: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Карта побыту (бизнес, работа) — " },
                  { _type: "span", text: "1850 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Гражданство Польши — " },
                  { _type: "span", text: "3000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Объем: Полное сопровождение на протяжении всего процесса (до получения карты).",
                    marks: ["strong"],
                  },
                ],
              },
            ],
            en: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Residence card (business, work) — " },
                  { _type: "span", text: "1850 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Polish citizenship — " },
                  { _type: "span", text: "3000 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                children: [
                  {
                    _type: "span",
                    text: "Scope: Full support throughout the entire application process (until card receipt).",
                    marks: ["strong"],
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),

    // --- 3. USŁUGI DODATKOWE (Весь список) ---
    withKey({
      blockTitle: {
        pl: "Usługi dodatkowe",
        ua: "Додаткові послуги",
        ru: "Дополнительные услуги",
        en: "Additional services",
      },
      subBlocks: [
        withKey({
          title: {
            pl: "Zakres oraz cennik usług dodatkowych",
            ua: "Перелік та прайс додаткових послуг",
            en: "Additional services pricing",
          },
          content: {
            pl: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Pomoc w zakładaniu JDG — " },
                  {
                    _type: "span",
                    text: "100 PLN netto / h",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Wystawienie faktur na zlecenie — " },
                  { _type: "span", text: "30 PLN netto", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Zakładanie spółki z o. o. — " },
                  { _type: "span", text: "1400 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Zawieszenie / wznowienie spółki — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Zmiany w rejestrze spółki — " },
                  { _type: "span", text: "indywidualnie", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Sprawozdanie finansowe — " },
                  { _type: "span", text: "indywidualnie", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Polityka rachunkowości — " },
                  { _type: "span", text: "900 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Deklaracje (CIT, VAT, PIT i inne) — ",
                  },
                  { _type: "span", text: "indywidualnie", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Złożenie wniosku o A1 — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Rejestracja PUESC / EORI — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Sprawozdanie do GUS — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Rejestracja do BDO — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Sprawozdanie do BDO — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Pozyskanie licencji transportowej — ",
                  },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Wymiana prawa jazdy — " },
                  { _type: "span", text: "450 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Zezwolenia na pracę (Typ A, B) — " },
                  { _type: "span", text: "250 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Rejestracja auta — " },
                  { _type: "span", text: "od 200 PLN", marks: ["strong"] },
                ],
              },
            ],
            ua: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Допомога у відкритті JDG — " },
                  {
                    _type: "span",
                    text: "100 PLN нетто / год",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Виставлення фактур на замовлення — ",
                  },
                  { _type: "span", text: "30 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Реєстрація ТОВ (sp. z o.o.) — " },
                  { _type: "span", text: "1400 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Призупинення / відновлення ТОВ — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Зміни в реєстрі компанії — " },
                  { _type: "span", text: "індивідуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Фінансова звітність — " },
                  { _type: "span", text: "індивідуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Облікова політика — " },
                  { _type: "span", text: "900 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Декларації (CIT, VAT, PIT тощо) — " },
                  { _type: "span", text: "індивідуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Подача заявки на A1 — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Реєстрація PUESC / EORI — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Звітність до GUS — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Реєстрація в BDO — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Звіт до BDO — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Транспортна ліцензія — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Заміна посвідчення водія — " },
                  { _type: "span", text: "450 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Дозволи на роботу (Тип А, Б) — " },
                  { _type: "span", text: "250 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Реєстрація авто — " },
                  { _type: "span", text: "від 200 PLN", marks: ["strong"] },
                ],
              },
            ],
            ru: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Помощь в открытии JDG — " },
                  {
                    _type: "span",
                    text: "100 PLN нетто / час",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Выставление фактур под заказ — " },
                  { _type: "span", text: "30 PLN нетто", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Регистрация ООО (sp. z o.o.) — " },
                  { _type: "span", text: "1400 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Приостановка / возобновление ООО — ",
                  },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Изменения в реестре компании — " },
                  { _type: "span", text: "индивидуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Финансовая отчетность — " },
                  { _type: "span", text: "индивидуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Учетная политика — " },
                  { _type: "span", text: "900 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Декларации (CIT, VAT, PIT и т.д.) — ",
                  },
                  { _type: "span", text: "индивидуально", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Подача заявки на A1 — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Регистрация PUESC / EORI — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Отчетность в GUS — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Регистрация в BDO — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Отчет в BDO — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Транспортная лицензия — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Замена водительских прав — " },
                  { _type: "span", text: "450 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Разрешения на работу (Тип А, Б) — " },
                  { _type: "span", text: "250 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Регистрация авто — " },
                  { _type: "span", text: "от 200 PLN", marks: ["strong"] },
                ],
              },
            ],
            en: [
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "JDG setup assistance — " },
                  {
                    _type: "span",
                    text: "100 PLN net / hour",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Invoicing service — " },
                  { _type: "span", text: "30 PLN net", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Limited company setup — " },
                  { _type: "span", text: "1400 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Company suspension / resumption — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Company registry changes — " },
                  {
                    _type: "span",
                    text: "individual pricing",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Financial statements — " },
                  {
                    _type: "span",
                    text: "individual pricing",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Accounting policy — " },
                  { _type: "span", text: "900 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  {
                    _type: "span",
                    text: "Tax declarations (CIT, VAT, etc.) — ",
                  },
                  {
                    _type: "span",
                    text: "individual pricing",
                    marks: ["strong"],
                  },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "A1 certificate application — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "PUESC / EORI registration — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "GUS reporting — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "BDO registration — " },
                  { _type: "span", text: "150 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "BDO reporting — " },
                  { _type: "span", text: "300 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Transport license — " },
                  { _type: "span", text: "1200 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Driving license exchange — " },
                  { _type: "span", text: "450 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Work permits (Type A, B) — " },
                  { _type: "span", text: "250 PLN", marks: ["strong"] },
                ],
              },
              {
                _type: "block",
                listItem: "bullet",
                children: [
                  { _type: "span", text: "Car registration — " },
                  { _type: "span", text: "from 200 PLN", marks: ["strong"] },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
};
const faqSectionData = {
  sectionTitle: { pl: "FAQ", ua: "FAQ", ru: "FAQ", en: "FAQ" },
  mainTitle: {
    pl: "Częste pytania",
    ua: "Часті запитання",
    ru: "Частые вопросы",
    en: "Frequently Asked Questions",
  },
  faqList: [
    // 1
    withKey({
      question: {
        pl: "Jakiego rodzaju usługi księgowe świadczysz?",
        ua: "Які види бухгалтерських послуг ви надаєте?",
        ru: "Какие виды бухгалтерских услуг вы предоставляете?",
        en: "What kind of accounting services do you provide?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Świadczymy pełen zakres usług księgowych dla firm. Szczegółową listę można znaleźć w sekcji Usługi.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Ми надаємо повний спектр бухгалтерських послуг для компаній. Детальний перелік можна знайти в розділі Послуги.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Мы предоставляем полный спектр бухгалтерских услуг для компаний. Подробный перечень можно найти в разделе Услуги.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "We provide a full range of accounting services for businesses. A detailed list can be found in the Services section.",
              },
            ],
          },
        ],
      },
    }),
    // 2
    withKey({
      question: {
        pl: "Czy możliwa jest praca zdalna?",
        ua: "Чи можлива дистанційна робота?",
        ru: "Возможна ли удаленная работа?",
        en: "Is remote work possible?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Tak, możesz w pełni współpracować z nami online - wszystkie procesy są organizowane zdalnie.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Так, ви можете повноцінно співпрацювати з нами онлайн - усі процеси організовані дистанційно.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Да, вы можете полностью сотрудничать с нами онлайн — все процессы организованы дистанционно.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Yes, you can fully cooperate with us online - all processes are organized remotely.",
              },
            ],
          },
        ],
      },
    }),
    // 3
    withKey({
      question: {
        pl: "Czy pomagacie w rejestracji firmy w Polsce?",
        ua: "Чи допомагаєте ви з реєстрацією фірми в Польщі?",
        ru: "Помогаете ли вы с регистрацией фирмы в Польше?",
        en: "Do you help with company registration in Poland?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Tak, pomagamy w rejestracji JDG oraz różnych form spółek (в tym sp. z o.o.). Towarzyszymy в procesie od przygotowania dokumentów do uzyskania NIP, REGON i KRS.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Так, ми допомагаємо з реєстрацією ФОП (JDG) та різних форм товариств (включаючи sp. z o.o.). Супроводжуємо процес від підготовки документів до отримання NIP, REGON та KRS.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Да, мы помогаем с регистрацией ИП (JDG) и различных форм обществ (включая sp. z o.o.). Сопровождаем процесс от подготовки документов до получения NIP, REGON и KRS.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Yes, we help with the registration of sole proprietorships (JDG) and various types of companies (including sp. z o.o.). We support you from document preparation to obtaining NIP, REGON, and KRS.",
              },
            ],
          },
        ],
      },
    }),
    // 4
    withKey({
      question: {
        pl: "Jakie dokumenty są potrzebne do założenia firmy?",
        ua: "Які документи потрібні для заснування фірми?",
        ru: "Какие документы нужны для основания фирмы?",
        en: "What documents are needed to start a company?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Lista dokumentów zależy od formy działalności i sytuacji. Możesz umówić się na bezpłatną konsultację, aby otrzymać dokładną listę.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Перелік документів залежить від форми діяльності та ситуації. Ви можете записатися на безкоштовну консультацію, щоб отримати точний список.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Список документов зависит от формы деятельности и ситуации. Вы можете записаться на бесплатную консультацию, чтобы получить точный список.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The list of documents depends on the form of business and your situation. You can book a free consultation to receive an exact list.",
              },
            ],
          },
        ],
      },
    }),
    // 5
    withKey({
      question: {
        pl: "Czy można otworzyć firmę w Polsce bez polskiego obywatelstwa?",
        ua: "Чи можна відкрити фірму в Польщі без польського громадянства?",
        ru: "Можно ли открыть фирму в Польше без польского гражданства?",
        en: "Can I open a company in Poland without Polish citizenship?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Tak, cudzoziemcy mogą otworzyć spółkę lub JDG в Polsce. Zapraszamy на bezpłatną konsultację, aby omówić Twoje możliwości.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Так, іноземці можуть відкрити товариство або ФОП у Польщі. Запрошуємо на безкоштовну консультацію, щоб обговорити ваші можливості.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Да, иностранцы могут открыть общество или ИП в Польше. Приглашаем на бесплатную консультацию, чтобы обсудить ваши возможности.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Yes, foreigners can open a company or sole proprietorship in Poland. We invite you for a free consultation to discuss your options.",
              },
            ],
          },
        ],
      },
    }),
    // 6
    withKey({
      question: {
        pl: "Jak przekazać dokumenty do działu księgowości?",
        ua: "Як передавати документи в бухгалтерський відділ?",
        ru: "Как передавать документы в бухгалтерский отдел?",
        en: "How to transfer documents to the accounting department?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Pracujemy za pośrednictwem systemu SaldeoSmart - wystarczy zrobić zdjęcie lub zeskanować dokumenty i przesłać je przez aplikację.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Ми працюємо через систему SaldeoSmart - достатньо зробити фото або відсканувати документи та надіслати їх через додаток.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Мы работаем через систему SaldeoSmart — достаточно сделать фото или отсканировать документы и отправить их через приложение.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "We work via the SaldeoSmart system - just take a photo or scan the documents and upload them through the app.",
              },
            ],
          },
        ],
      },
    }),
    // 7
    withKey({
      question: {
        pl: "Ile kosztują usługi?",
        ua: "Скільки коштують послуги?",
        ru: "Сколько стоят услуги?",
        en: "How much do the services cost?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Koszt zależy od formy działalności i ilości dokumentów. Szczegółowy cennik znajduje się w sekcji Usługi.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Вартість залежить від форми діяльності та кількості документів. Детальний прайс знаходиться в розділі Послуги.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Стоимость зависит от формы деятельности и количества документов. Подробный прайс находится в разделе Услуги.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The cost depends on the form of business and the volume of documents. A detailed price list is in the Services section.",
              },
            ],
          },
        ],
      },
    }),
    // 8
    withKey({
      question: {
        pl: "Jak zawrzeć umowę o świadczenie usług księgowych?",
        ua: "Як укласти договір на надання бухгалтерських послуг?",
        ru: "Как заключить договор на оказание бухгалтерских услуг?",
        en: "How to conclude an accounting services agreement?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Umowę możesz zawrzeć online lub w naszym biurze. My przygotujemy всі dokumenty, wystarczy Twój podpis.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Договір можна укласти онлайн або в нашому офісі. Ми підготуємо всі документи, від вас потрібен лише підпис.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Договор можно заключить онлайн или в нашем офисе. Мы подготовим все документы, от вас нужна только подпись.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "You can sign the agreement online or at our office. We will prepare all the documents; all we need is your signature.",
              },
            ],
          },
        ],
      },
    }),
    // 9
    withKey({
      question: {
        pl: "Czy można zmienić księgowego w firmie?",
        ua: "Чи можна змінити бухгалтера в компанії?",
        ru: "Можно ли сменить бухгалтера в компании?",
        en: "Can I change the company's accountant?",
      },
      answer: {
        pl: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Tak, możesz przejść do nas w dowolnym momencie. Pomożemy w prawidłowym przeniesieniu dokumentacji і zapewnimy płynne przejęcie spraw.",
              },
            ],
          },
        ],
        ua: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Так, ви можете перейти до нас у будь-який момент. Ми допоможемо з правильним перенесенням документації та забезпечимо плавний перехід.",
              },
            ],
          },
        ],
        ru: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Да, вы можете перейти к нам в любой момент. Мы поможем с правильным переносом документации и обеспечим плавный переход.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Yes, you can switch to us at any time. We will help with the correct transfer of documentation and ensure a smooth transition.",
              },
            ],
          },
        ],
      },
    }),
  ],
};
const footerData = {
  companyName: {
    pl: "Finrekin spółka z ograniczoną odpowiedzialnością",
    ua: "Finrekin Товариство з обмеженою відповідальністю",
    ru: "Finrekin Общество с ограниченной ответственностью",
    en: "Finrekin limited liability company",
  },
  address: {
    pl: "ul. Parkowa 25 lok. 58",
    ua: "вул. Паркова 25, офіс 58",
    ru: "ул. Парковая 25, офис 58",
    en: "Parkowa 25 str., office 58",
  },
  city: {
    pl: "51-616 Wrocław",
    ua: "51-616 Вроцлав",
    ru: "51-616 Вроцлав",
    en: "51-616 Wroclaw",
  },
  taxId: "8982310567",
  regId: "529341562",
  capital: {
    pl: "Kapitał zakładowy 5000 zł",
    ua: "Статутний капітал 5000 PLN",
    ru: "Уставной капитал 5000 PLN",
    en: "Initial capital 5000 PLN",
  },
  privacyPolicyLabel: {
    pl: "Polityka prywatności",
    ua: "Політика конфіденційності",
    ru: "Политика конфиденциальности",
    en: "Privacy policy",
  },
  devLabel: {
    pl: "Tworzenie stron",
    ua: "Розробка сайтів",
    ru: "Разработка сайтов",
    en: "Website development",
  },
};
export const mockPageData = {
  // Title (Portable Text)
  hero: {
    title: {
      pl: createBlockWithHighlight([
        { text: "FINREKIN - zaufane " },
        { text: "biuro rachunkowe", highlight: true },
        { text: " we Wrocławiu" },
      ]),
      ua: createBlockWithHighlight([
        { text: "FINREKIN - надійне " },
        { text: "бухгалтерське бюро", highlight: true },
        { text: " у Вроцлаві" },
      ]),
      en: createBlockWithHighlight([
        { text: "FINREKIN - trusted " },
        { text: "accounting office", highlight: true },
        { text: " in Wrocław" },
      ]),
      ru: createBlockWithHighlight([
        { text: "FINREKIN - надежное " },
        { text: "бухгалтерское бюро", highlight: true },
        { text: " во Вроцлаве" },
      ]),
    },

    // Subtitle (String)
    subtitle: {
      pl: "Pomagamy firmom rozwijać się, zapewniając niezawodne wsparcie księgowe, oferując rozwiązania, które sprawiają, że księgowość jest prosta, a kwestie podatkowe przewidywalne.",
      ua: "Допомагаємо компаніям розвиватися, надаючи надійну бухгалтерську підтримку та пропонуючи рішення, які роблять облік простим, а податкові питання — передбачуваними.",
      en: "We help companies grow by providing reliable accounting support, offering solutions that make bookkeeping simple and tax matters predictable.",
      ru: "Мы помогаем компаниям развиваться, предоставляя надежную бухгалтерскую поддержку и предлагая решения, которые делают учет простым, а налоговые вопросы — предсказуемыми.",
    },

    buttonText: {
      pl: "Skontaktuj się z nami",
      ua: "Зв'яжіться з нами",
      en: "Contact us",
      ru: "Свяжитесь с нами",
    },

    image: mockImageRef("/images/hero-img.png"),

    // Services (Array)
    services: [
      withKey({
        title: {
          pl: "Księgowość",
          ua: "Бухгалтерія",
          en: "Accounting",
          ru: "Бухгалтерия",
        },
        icon: mockImageRef("/images/icons/service-1.svg"),
        buttonText: {
          pl: "Sprawdź koszt →",
          ua: "Дізнатися вартість →",
          en: "Check cost →",
          ru: "Узнать стоимость →",
        },
      }),
      withKey({
        title: {
          pl: "Legalizacja pobytu",
          ua: "Легалізація перебування",
          en: "Legalization of stay",
          ru: "Легализация пребывания",
        },
        icon: mockImageRef("/images/icons/service-2.svg"),
        buttonText: {
          pl: "Sprawdź koszt →",
          ua: "Дізнатися вартість →",
          en: "Check cost →",
          ru: "Узнать стоимость →",
        },
      }),
      withKey({
        title: {
          pl: "Skontaktuj się z nami",
          ua: "Зв'яжіться з нами",
          en: "Contact us",
          ru: "Свяжитесь с нами",
        },
        icon: mockImageRef("/images/icons/service-3.svg"),
        buttonText: {
          pl: "Zostaw prośbę →",
          ua: "Залишити запит →",
          en: "Leave a request →",
          ru: "Оставить заявку →",
        },
      }),
      withKey({
        title: {
          pl: "Usługi dodatkowe",
          ua: "Додаткові послуги",
          en: "Additional services",
          ru: "Дополнительные услуги",
        },
        icon: mockImageRef("/images/icons/service-4.svg"),
        buttonText: {
          pl: "Sprawdź koszt →",
          ua: "Дізнатися вартість →",
          en: "Check cost →",
          ru: "Узнать стоимость →",
        },
      }),
    ],
  },

  // OFFERS SECTION
  offersSection: {
    // ✅ ВИПРАВЛЕНО: Головний заголовок тепер Portable Text
    mainTitle: {
      pl: createBlockWithHighlight([
        { text: "Aktualne " },
        { text: "oferty", highlight: true },
        { text: " dla naszych klientów" },
      ]),
      ua: createBlockWithHighlight([
        { text: "Актуальні " },
        { text: "пропозиції", highlight: true },
        { text: " для наших клієнтів" },
      ]),
      en: createBlockWithHighlight([
        { text: "Current " },
        { text: "offers", highlight: true },
        { text: " for our clients" },
      ]),
      ru: createBlockWithHighlight([
        { text: "Актуальные " },
        { text: "предложения", highlight: true },
        { text: " для наших клиентов" },
      ]),
    },
    mainSubtitle: {
      pl: "Skontaktuj się z nami, aby uzyskać więcej informacji!",
      ua: "Зв'яжіться з нами, щоб отримати більше інформації!",
      en: "Contact us for more details!",
      ru: "Свяжитесь с нами, чтобы получить больше информации!",
    },
    mainButtonText: {
      pl: "Zostaw prośbę",
      ua: "Залишити запит",
      en: "Leave a request",
      ru: "Оставить заявку",
    },

    // Список карток пропозицій
    offersList: [
      withKey({
        title: {
          pl: "Dla nowych klientów oferujemy atrakcyjne zniżki!",
          ua: "Для нових клієнтів пропонуємо привабливі знижки!",
          en: "We offer attractive discounts for new clients!",
          ru: "Для новых клиентов предлагаем привлекательные скидки!",
        },
        icon: mockImageRef("/images/icons/offer.svg"),
        buttonText: {
          pl: "Zostaw prośbę →",
          ua: "Залишити запит →",
          en: "Leave a request →",
          ru: "Оставить заявку →",
        },
        bg: mockImageRef("/images/background/offer-bg-1.png"),
      }),
      withKey({
        title: {
          pl: "Poleć nasze usługi księgowe swoim przyjaciołom i znajomym, a otrzymasz atrakcyjne bonusy",
          ua: "Порекомендуйте наші послуги друзям та знайомим і отримайте привабливі бонуси",
          en: "Refer our services to friends and get attractive bonuses",
          ru: "Порекомендуйте наши услуги друзьям и получите привлекательные бонусы",
        },
        icon: mockImageRef("/images/icons/offer.svg"),
        buttonText: {
          pl: "Zostaw prośbę →",
          ua: "Залишити запит →",
          en: "Leave a request →",
          ru: "Оставить заявку →",
        },
        bg: mockImageRef("/images/background/offer-bg-2.png"),
      }),
      withKey({
        title: {
          pl: "Zniżki i bonusy dla stałych klientów",
          ua: "Знижки та бонуси для постійних клієнтів",
          en: "Discounts and bonuses for regular clients",
          ru: "Скидки и бонусы для постоянных клиентов",
        },
        icon: mockImageRef("/images/icons/offer.svg"),
        buttonText: {
          pl: "Zostaw prośbę →",
          ua: "Залишити запит →",
          en: "Leave a request →",
          ru: "Оставить заявку →",
        },
        bg: mockImageRef("/images/background/offer-bg-3.png"),
      }),
    ],
  },

  // ABOUT SECTION
  aboutSection: {
    sectionTitle: { pl: "O nas", ua: "Про нас", en: "About us", ru: "О нас" },

    // ✅ ВИПРАВЛЕНО: Головний заголовок тепер Portable Text
    mainTitle: {
      pl: createBlockWithHighlight([
        { text: "Nasz zespół to " },
        { text: "profesjonaliści", highlight: true },
        {
          text: " w swojej dziedzinie, zapewniający skuteczne usługi księgowe",
        },
      ]),
      ua: createBlockWithHighlight([
        { text: "Наша команда — це " },
        { text: "професіонали", highlight: true },
        {
          text: " своєї справи, які забезпечують ефективні бухгалтерські послуги",
        },
      ]),
      en: createBlockWithHighlight([
        { text: "Our team consists of " },
        { text: "professionals", highlight: true },
        { text: " in their field, providing effective accounting services" },
      ]),
      ru: createBlockWithHighlight([
        { text: "Наша команда — это " },
        { text: "профессионалы", highlight: true },
        {
          text: " своего дела, обеспечивающие эффективные бухгалтерские услуги",
        },
      ]),
    },
    mainSubtitle: {
      pl: "Znamy specyfikę pracy na polskim rynku, każdy z nas przyczynia się do tego, aby Twój biznes rozwijał się bez ryzyka i z maksymalną efektywnością",
      ua: "Ми знаємо специфіку роботи на польському ринку, кожен із нас сприяє тому, щоб Ваш бізнес розвивався без ризику та з максимальною ефективністю",
      en: "We know the specifics of the Polish market, each of us contributes to ensuring your business grows without risk and with maximum efficiency",
      ru: "Мы знаем специфику работы на польском рынке, каждый из нас способствует тому, чтобы Ваш бизнес развивался без риска и с максимальной эффективностью",
    },
    members: [
      withKey({
        name: "Oleksii Kovalov",
        image: mockImageRef("/images/member-1.png"),
        description: {
          pl: "Dyrektor operacyjny, ekspert ds. księgowości",
          ua: "Операційний директор, експерт з питань бухгалтерії",
          en: "Chief Operating Officer, Accounting Expert",
          ru: "Операционный директор, эксперт по вопросам бухгалтерии",
        },
      }),
      withKey({
        name: "Lesia Moldovan",
        image: mockImageRef("/images/member-2.png"),
        description: {
          pl: "Starszy księgowy",
          ua: "Старший бухгалтер",
          en: "Senior Accountant",
          ru: "Старший бухгалтер",
        },
      }),
    ],
  },

  bannerSection: bannerSectionData,
  areaSection: areaSectionData,
  contactFormSection: mockContactData,
  transparencySection: transparencyData,
  opinionsSection: opinionsData,
  formFields: formFieldsData,
  stepsSection: stepsSectionData,
  contactSection: contactSectionData,
  priceSection: priceSectionData,
  faqSection: faqSectionData,
  footer: footerData,
};

// -------------------------------------------------------------
// 4. ЕКСПОРТ: Очищені дані для Sanity Import
// -------------------------------------------------------------

// Функція для рекурсивного очищення mockPath та asset._ref
const cleanMockData = (data) => {
  if (Array.isArray(data)) {
    return data.map(cleanMockData);
  }
  if (typeof data === "object" && data !== null) {
    if (data._type === "image") {
      // 1. Якщо це зображення, повертаємо очищений об'єкт (без mockPath та asset)
      return { _type: "image" };
    }

    const cleaned = {};
    for (const key in data) {
      if (key === "mockPath" || key === "asset") {
        // 2. Ігноруємо mockPath та asset для всіх об'єктів
        continue;
      }
      // 3. Рекурсивно очищуємо вкладені об'єкти (включаючи LocaleString, LocalecreateBlockWithHighlight)
      cleaned[key] = cleanMockData(data[key]);
    }
    return cleaned;
  }
  return data;
};
export const pageDataForSanity = cleanMockData(mockPageData);
