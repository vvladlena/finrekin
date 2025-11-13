"use client";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="section-wrapper">
          <h1 className="hero-title text-primary">
            FINREKIN - zaufane{" "}
            <span className="text-secondary">biuro rachunkowe</span> we
            Wrocławiu
          </h1>
          <div className="description-wrapper">
            <p className="description-txt">
              Pomagamy firmom rozwijać się, zapewniając{" "}
              <strong>niezawodne wsparcie księgowe,</strong> oferując
              rozwiązania, które sprawiają, że księgowość jest prosta, a kwestie
              podatkowe przewidywalne.
            </p>
            <button className="btn-primary">
              Skontaktuj się z nami
              <Image
                src="/images/icons/arrows.svg"
                alt="strzałki"
                width={20}
                height={20}
                className="btn-icon"
              />
            </button>
          </div>
        </div>
        <div className="hero-image">
          <Image
            src="/images/hero-img.png"
            alt="księgowy Wrocław"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <ul className="hero-list">
          <li className="hero-item">
            <Image
              src="/images/icons/service-1.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Księgowość</h3>
            <button className="btn-secondary">Sprawdź koszt →</button>
          </li>
          <li className="hero-item">
            <Image
              src="/images/icons/service-2.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Legalizacja pobytu</h3>
            <button className="btn-secondary">Sprawdź koszt →</button>
          </li>
          <li className="hero-item invert">
            <Image
              src="/images/icons/service-3.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Skontaktuj się z nami</h3>
            <button className="btn-secondary btn-secondary--invert">
              Zostaw prośbę →
            </button>
          </li>
          <li className="hero-item">
            <Image
              src="/images/icons/service-4.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Usługi dodatkowe</h3>
            <button className="btn-secondary">Sprawdź koszt →</button>
          </li>
        </ul>
      </div>
    </section>
  );
}
