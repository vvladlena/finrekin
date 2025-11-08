"use client";
import Image from "next/image";
import styles from "@/app/styles/components/TransparencySection.module.scss";

export default function TransparencySection() {
  return (
    <section className={styles.transparency}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Ліва колонка */}
          <div className={styles.content}>
            <h2 className={styles.title}>
              Opowiadamy się za{" "}
              <span className={styles.highlight}>przejrzystą księgowością</span>
            </h2>
            <p className={styles.description}>
              Wyjaśniamy skomplikowane kwestie w prosty sposób. Zawsze jesteśmy
              pod telefonem, aby odpowiedzieć na pytania, pomóc w załatwieniu
              formalności i powiadomić o ważnych terminach. Z nami wszystko jest
              jasne, wygodne i bezstresowe.
            </p>

            <ul className={styles.list}>
              {[
                {
                  title: "Czy chcesz zmienić księgowego?",
                  text: "Pomożemy Ci przenieść księgowość szybko i bezstresowo. Sprawdzimy dokumenty, zrozumiemy obecną sytuację, poprawimy ją w razie potrzeby.",
                },
                {
                  title: "Dopiero zaczynasz działalność?",
                  text: "Doradzimy, jaki formularz wybrać, przygotujemy i złożymy dokumenty, zarejestrujemy firmę i założymy księgowość.",
                },
                {
                  title: "Łatwy start — bez wizyt",
                  text: "Umowę zawieramy online. Nie trzeba przyjeżdżać, czekać ani wypełniać wielu dokumentów. Wszystko jest proste, jasne i oficjalne.",
                },
                {
                  title: "Zawsze pod telefonem — bez dodatkowych opłat",
                  text: "Wszystkie konsultacje w ramach umowy są bezpłatne i bez ograniczeń. Jesteśmy do Twojej dyspozycji, kiedy nas potrzebujesz.",
                },
                {
                  title: "Usługi dodatkowe",
                  text: `Oferujemy szereg dodatkowych usług na indywidualne zamówienie. <a href="#">Kliknij tutaj</a>, aby wyświetlić pełną listę.`,
                },
              ].map((item, index) => (
                <li className={styles.item} key={index}>
                  <p className={styles.itemTitle}>{item.title}</p>

                  <p
                    className={styles.itemText}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Права колонка */}
          <div className={styles.images}>
            <div className={styles.imageTop}>
              <Image
                src="/images/team-1.png"
                alt="accountant portrait"
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.imageBottom}>
              <Image
                src="/images/team-2.png"
                alt="accountant working"
                fill
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
