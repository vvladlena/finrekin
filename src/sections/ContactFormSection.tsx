"use client";

import ContactForm from "@/components/common/ContactForm/ContactForm";

export default function ContactFormSection() {
  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-text">
            <div className="section-title">
              <img src="/images/icons/arrows.svg" alt="section arrows" />
              <p>Skontaktuj się z nami</p>
            </div>
            <div className="standard-content">
              <h2 className="standard-title">
                Pomożemy Ci {""}
                <span className="text-secondary">zarejestrować firmę</span> {""}
                w Polsce
              </h2>
              <p className="text-standard">
                Zostaw swoje dane kontaktowe, a my skontaktujemy się z Tobą w
                celu przeprowadzenia bezpłatnej konsultacji
              </p>
              <div className="social-wrapper">
                <ul className="socialLinks" aria-label="Social media links">
                  <li>
                    <a
                      href="https://t.me/finrekin"
                      target="_blank"
                      rel="nofollow noopener"
                      aria-label="Telegram"
                    >
                      <img src="/images/icons/telegram.svg" alt="" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.instagram.com/finrekin_biuro"
                      target="_blank"
                      rel="nofollow noopener"
                      aria-label="Instagram"
                    >
                      <img src="/images/icons/instagram.svg" alt="" />
                    </a>
                  </li>
                </ul>
                <div className="phone-wrapper">
                  <a href="tel:+48608771993" className="phone-number">
                    +48 608 771 993
                  </a>
                  <p>• 10:00 do 17:00</p>
                </div>
              </div>
            </div>
          </div>
          <ContactForm isOpen={true} onClose={() => {}} variant="comment" />
        </div>
      </div>
    </section>
  );
}
