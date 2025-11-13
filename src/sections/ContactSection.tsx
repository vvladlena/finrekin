"use client";

import ContactForm from "@/components/common/ContactForm/ContactForm";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          {/* <div className="contact-text"> */}

          <div className="standard-content">
            <div className="section-title">
              <img src="/images/icons/arrows.svg" alt="section arrows" />
              <p>Kontakt</p>
            </div>
            <div className="phone-wrapper">
              <a href="tel:+48608771993" className="contact-link">
                +48 608 771 993
              </a>
              {/* <p>Skontaktuj się z nami</p> */}
            </div>
            <div className="link-wrapper">
              <a
                href="https://www.google.com/maps/place/Wrocław,+Parkowa+25"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <p>ul. Parkowa 25</p>
                <p>51-516 Wrocław</p>
              </a>
            </div>
            <a href="mailto:finrekin.wro@gmail.com" className="contact-link">
              finrekin.wro@gmail.com
            </a>
            <div className="link-wrapper">
              <ul className="social-links" aria-label="Social media links">
                <li>
                  <a
                    href="https://t.me/ok_biuro"
                    target="_blank"
                    rel="nofollow noopener"
                    aria-label="Telegram"
                    className="contact-link"
                  >
                    <img src="/images/icons/telegram-blue.svg" alt="" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/finrekin_biuro"
                    target="_blank"
                    rel="nofollow noopener"
                    aria-label="Instagram"
                    className="contact-link"
                  >
                    <img src="/images/icons/instagram-blue.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* </div> */}
          <ContactForm
            isOpen={true}
            onClose={() => {}}
            variant="customBg"
            bgColor="#f9fafb"
          />
        </div>
      </div>
    </section>
  );
}
