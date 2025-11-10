"use client";
type ServiceItem = {
  description: string;
  price?: string;
};

type SubBlock = {
  title: string;
  mainList: ServiceItem[];
  subList?: string[];
};

type ServiceBlock = {
  blockTitle: string;
  subBlocks: SubBlock[];
};

const services: ServiceBlock[] = [
  {
    blockTitle: "Księgowość i kadry",
    subBlocks: [
      {
        title: "Zakres oraz cennik usług księgowości i kadr ",
        mainList: [
          {
            description:
              "Do 10 dokumentów, bez VAT (dla klientów bez rejestracji VAT) ",
            price: "330 PLN netto",
          },
          {
            description:
              "Do 10 dokumentów z podatkiem VAT (dla klientów zarejestrowanych jako płatnicy VAT)",
            price: "370 PLN netto / miesiąc",
          },
          {
            description: "Każdy dodatkowy dokument ",
            price: " 5 PLN netto",
          },
          {
            description: "Umowa zlecenia",
            price: "70 PLN netto / os.",
          },
          {
            description: "Umowa o pracę ",
            price: "100 PLN netto / os.",
          },
        ],
      },
    ],
  },
  {
    blockTitle: "Legalizacja pobytu",
    subBlocks: [
      {
        title: "Pakiet podstawowy (ceny w brutto)",
        mainList: [
          {
            description:
              "Zezwolenie na pobyt czasowy w celu prowadzenia działalności gospodarczej, praca",
            price: "1200 PLN",
          },
          {
            description:
              "Zezwolenie na pobyt czasowy na podstawie łączenia rodzin, studia",
            price: "1000 PLN",
          },
          {
            description:
              "Zezwolenie na pobyt stały, rezydenta długoterminowego UE",
            price: "1500 PLN",
          },
        ],
        subList: [
          "Założenie konta osobistego",
          "Wypełnienie wniosku",
          "Rejestracja na złożenie dokumentów",
          "Przygotowanie pakietu dokumentów",
          "Instrukcje dotyczące wizyty w urzędzie i dalszej współpracy z urzędnikiem",
        ],
      },
      {
        title: "Pakiet rozszerzony (ceny w brutto)",
        mainList: [
          {
            description:
              "Zezwolenie na pobyt czasowy w celu prowadzenia działalności gospodarczej, praca",
            price: "1850 PLN",
          },
          {
            description:
              "Zezwolenie na pobyt czasowy na podstawie łączenia rodzin, studia",
            price: "1650 PLN",
          },
          {
            description:
              "Zezwolenie na pobyt stały, rezydenta długoterminowego UE",
            price: "2100 PLN",
          },
          {
            description: "Uzyskania obywatelstwa polskiego",
            price: "3000 PLN",
          },
        ],
        subList: [
          "Założenie konta osobistego",
          "Wypełnienie wniosku",
          "Rejestracja na złożenie dokumentów",
          "Przygotowanie pakietu dokumentów",
          "Pełne wsparcie przez cały proces aplikacji (od założenia konta do otrzymania karty)",
        ],
      },
    ],
  },
  {
    blockTitle: "Usługi dodatkowe",
    subBlocks: [
      {
        title: "Zakres oraz cennik usług dodatkowych ",
        mainList: [
          {
            description: "Konsultacja oraz pomoc w zakładaniu JDG",
            price: "100 PLN netto / godzinę",
          },
          {
            description: "Wystawienie faktur na zlecenie klienta",
            price: "30 PLN netto",
          },
          {
            description: "Konsultacja oraz pomoc w zakładaniu spółki z o. o.",
            price: "1400 PLN",
          },
          {
            description: "Zawieszenie lub wznowienie spółki z o. o.",
            price: "300 PLN",
          },
          {
            description:
              "Kompleksowa konsultacja oraz przeprowadzenie zmian w rejestrze spółki",
            price: "indywidualnie",
          },
          {
            description: "Sporządzenie sprawozdania finansowego",
            price: "indywidualnie",
          },
          {
            description: "Opracowanie polityki rachunkowości",
            price: "900 PLN",
          },
          {
            description:
              "Sporządzenie i wysyłka deklaracji CIT-8, VAT-REF, VAT-23, VAT-26, VAT-8, VAT-12, VAT-9M, SD Z2, SD Z3, PCC-3, PIT-37, PIT-38, PIT-39, NIP-2, NIP-8 oraz inne",
            price: "indywidualnie",
          },
          { description: "Złożenie wniosku o A1", price: "150 PLN" },
          {
            description:
              "Rejestracja firmy na platformie PUESC oraz uzyskanie numeru EORI",
            price: "300 PLN",
          },
          {
            description: "Sporządzenie i wysyłka sprawozdania do GUS",
            price: "300 PLN",
          },
          { description: "Rejestracja firmy do BDO", price: "150 PLN" },
          { description: "Sporządzenie sprawozdania do BDO", price: "300 PLN" },
          {
            description: "Pozyskanie cesji na sprzedaż alkoholu",
            price: "300 PLN",
          },
          {
            description: "Pozyskanie licencji transportowej",
            price: "1200 PLN",
          },
          { description: "Wymiana prawa jazdy", price: "450 PLN" },
          {
            description:
              "Rejestracja oświadczenia o powierzeniu wykonywania pracy cudzoziemcowi",
            price: "50 PLN",
          },
          { description: "Pozyskanie zezwoleń typu A, B", price: "250 PLN" },
          {
            description: "Rejestracja auta PL, UE, Zagranica",
            price: "od 200 PLN",
          },
          {
            description: "Przygotowanie załącznika nr. 1 do wniosku pobytowego",
            price: "150 PLN",
          },
          {
            description: "Rejestracja spółki",
            price: "1400 PLN ",
          },
        ],
      },
    ],
  },
];

export default function PriceSection() {
  return (
    <section className="price-section" id="services">
      <div className="container">
        <div className="section-title">
          <img src="/images/icons/arrows.svg" alt="section arrows" />
          <p>Usługi</p>
        </div>

        <h2 className="standard-title" style={{ marginBottom: 40 }}>
          Pełna <span className="text-secondary">lista usług </span> naszego
          biura
        </h2>

        {services.map((block, idx) => (
          <div key={idx}>
            <p className="card-title">{block.blockTitle}</p>

            {block.subBlocks.map((sub, subIdx) => (
              <div className="price-card static" key={subIdx}>
                <div className="card-header">
                  <div className="title-wrapper">
                    <span className="dot" />
                    <h3>{sub.title}</h3>
                  </div>
                </div>

                <div className="divider" />

                <div className="card-content">
                  <ul className="main-list">
                    {sub.mainList.map((item, i) => (
                      <li key={i}>
                        {item.description}{" "}
                        {item.price && (
                          <>
                            — <strong>{item.price}</strong>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {sub.subList && (
                    <>
                      <p>Zakres pakietu usług:</p>
                      <ul className="sub-list">
                        {sub.subList.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
