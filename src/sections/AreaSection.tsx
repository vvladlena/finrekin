"use client";
const areas = [
  {
    id: 1,
    title: "Księgowość dla <b>e-commerce<b>",
    icon: "/images/icons/area-1.svg",
  },
  {
    id: 2,
    title: "Księgowość dla <b>firm IT i freelancerów</b>",
    icon: "/images/icons/area-2.svg",
  },
  {
    id: 3,
    title: "Księgowość dla <b>nieruchomości</b>",
    icon: "/images/icons/area-3.svg",
  },
  {
    id: 4,
    title: "Księgowość dla <b>firm transportowych i logistycznych</b>",
    icon: "/images/icons/area-4.svg",
  },
  {
    id: 5,
    title: "Księgowość dla <b> salonów kosmetycznych i usług kosmetycznych</b>",
    icon: "/images/icons/area-5.svg",
  },
  {
    id: 6,
    title: "Księgowość dla <b>firm budowlanych</b>",
    icon: "/images/icons/area-6.svg",
  },
];

export default function AreaSection() {
  return (
    <section className="about">
      <div className="container">
        <div className="standard-content">
          <h2 className="standard-title">
            Świadczymy usługi
            <span className="text-secondary">dla różnych sektorów</span> {""}
            biznesowych
          </h2>
          <p className="text-standard">
            Naszą misją jest{" "}
            <b>uwolnienie Cię od zmartwień związanych z księgowością,</b> abyś
            mógł skoncentrować się na rozwijaniu swojego biznesu. Ważne jest dla
            nas, aby dane liczbowe odzwierciedlały rzeczywisty stan Twojej firmy
            - jasno, uczciwie i na temat.
          </p>
        </div>

        <ul className="area-list">
          {areas.map((area) => (
            <li className="area-item" key={area.id}>
              <img className="area-icon" src={area.icon} alt={area.title} />
              <p
                className="area-title text-standard"
                dangerouslySetInnerHTML={{ __html: area.title }}
              />
            </li>
          ))}
        </ul>

        <div className="area-add">
          <p>
            Podobnie jak w innych branżach – dostosowujemy rozwiązanie do
            potrzeb Twojej firmy
          </p>
        </div>
      </div>
    </section>
  );
}
