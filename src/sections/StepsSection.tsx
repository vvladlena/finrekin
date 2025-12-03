import Image from "next/image";
import styles from "@/app/styles/components/StepsSection.module.scss";

const steps = [
  { id: 1, title: "Aplikacja i wstępna konsultacja" },
  { id: 2, title: "Analiza działalności i zawarcie umowy" },
  { id: 3, title: "Konfigurowanie metod księgowania" },
  { id: 4, title: "Miesięczne wsparcie księgowe" },
  { id: 5, title: "Analiza wskaźników miesięcznych" },
  { id: 6, title: "Rezultat: stabilna i legalna działalność" },
];

export default function StepsSection() {
  return (
    <section className={styles.stepsSection}>
      <div className="container">
        <div className="section-title">
          <img src="/images/icons/arrows.svg" alt="section arrows" />
          <p>Etapy pracy</p>
        </div>
        <h2>
          Od aplikacji <span>do wyników</span>
        </h2>

        <div className={styles.stepsWrapper}>
          <svg
            className={styles.pathLine}
            viewBox="0 0 1200 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="
      95,80
      295,180
      495,80
      695,180
      895,80
      1095,180
    "
              stroke="#36a8c3"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>

          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.step} ${
                  index % 2 === 0 ? styles.top : styles.bottom
                }`}
              >
                <div className={styles.circle}>{step.id}</div>
                <p>{step.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stepsImage}>
          <Image
            src="/images/background/steps-bg.png"
            alt="Steps Illustration"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
