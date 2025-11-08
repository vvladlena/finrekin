import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    id: 1,
    title: "Dla nowych klientów oferujemy atrakcyjne zniżki!",
    image: "/images/offer-1.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Zostaw prośbę",
    link: "#form",
    bg: "/images/background/offer-bg-1.png",
  },
  {
    id: 2,
    title:
      "Poleć nasze usługi księgowe swoim przyjaciołom i znajomym, a otrzymasz atrakcyjne bonusy",
    image: "/images/offer-2.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Czytaj więcej",
    link: "#salemore",
    bg: "/images/background/offer-bg-2.png",
  },
  {
    id: 3,
    title: "Zniżki i bonusy dla stałych klientów",
    image: "/images/offer-3.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Zostaw prośbę",
    link: "#form",
    bg: "/images/background/offer-bg-3.png",
  },
];

export default function OffersSection() {
  return (
    <section className="offers">
      <div className="container">
        <div className="offers-grid">
          <div className="offer-content offer-content--main">
            <h2 className="standard-title">
              <span className="text-secondary">Aktualne oferty</span> dla
              naszych klientów
            </h2>
            <p className="text-standard">
              Skontaktuj się z nami, aby uzyskać więcej informacji!
            </p>
            <a href="#" className="btn-bold">
              Zostaw prośbę
            </a>
          </div>
          {offers.map((offer) => (
            <div
              className="offer-card"
              style={{ backgroundImage: `url(${offer.bg})` }}
              key={offer.id}
            >
              <div className="offer-content">
                <Image
                  src={offer.icon}
                  alt="icon"
                  width={60}
                  height={60}
                  className="offer-icon"
                />
                <p className="offer-text">{offer.title}</p>
                <Link href={offer.link} className="btn-bold">
                  {offer.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
