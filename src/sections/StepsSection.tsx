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
        <div className={styles.header}>
          <Image
            src="/images/icons/arrows.svg"
            alt="arrows"
            width={40}
            height={40}
          />
          <h2>
            Od aplikacji <span>do wyników</span>
          </h2>
        </div>

        <div className={styles.stepsWrapper}>
          <svg
            className={styles.pathLine}
            viewBox="0 0 1200 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="
      50,80
      250,180
      450,80
      650,180
      850,80
      1050,180
     
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
        <div className="steps-image">
          <Image
            src="/images/background/steps-bg.png"
            alt="Steps Illustration"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
