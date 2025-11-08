const members = [
  {
    id: 1,
    name: "Oleksii Kovalov",
    image: "/images/member-1.png",
    description: "Dyrektor operacyjny, ekspert ds. księgowości",
  },
  {
    id: 2,
    name: "Lesia Moldovan",
    image: "/images/member-2.png",
    description: "Starszy księgowy",
  },
  {
    id: 3,
    name: "Name Surname",
    image: "/images/member-3.png",
    description: "Opis pracownika",
  },
];

export default function AboutSection() {
  return (
    <section className="about">
      <div className="container">
        <div className="section-title">
          <img src="/images/icons/arrows.svg" alt="section arrows" />
          <p>O nas</p>
        </div>
        <div className="standard-content">
          <h2 className="standard-title">
            Nasz zespół to profesjonaliści w swojej dziedzinie,{" "}
            <span className="text-secondary">
              zapewniający skuteczne usługi księgowe
            </span>
          </h2>
          <p className="text-standard">
            Znamy specyfikę pracy na polskim rynku, każdy z nas przyczynia się
            do tego, aby Twój biznes rozwijał się bez ryzyka i z maksymalną
            efektywnością{" "}
          </p>
        </div>
        <ul className="member-list">
          {members.map((member) => (
            <li
              className="member-item"
              style={{ backgroundImage: `url(${member.image})` }}
              key={member.id}
            >
              <p className="member-name">{member.name}</p>
              <p className="text-standard member-desc">{member.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
