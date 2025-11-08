export default function OpinionsSection() {
  return (
    <section className="opinions">
      <div className="container">
        <div className="section-title">
          <img src="/images/icons/arrows.svg" alt="section arrows" />
          <p>Opinie</p>
        </div>
        <h2 className="standard-title" style={{ marginBottom: "40px" }}>
          Twoja opinia czyni
          <span className="text-secondary"> nas lepszymi</span> {""}
        </h2>

        <div className="opinions-content">
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-45eb0560-689a-4fcf-a355-5fd5bba4787d"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
}
