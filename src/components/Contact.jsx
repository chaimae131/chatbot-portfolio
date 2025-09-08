import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useTranslation } from "react-i18next";



export default function Contact() {

  const { t } = useTranslation();
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4i2hprq", // service_id EmailJS
        "template_vx5h0vb", // template_id EmailJS
        formRef.current,
        "ciweFGFeW9XrbdM19" // clé publique EmailJS
      )
      .then(
        () => {
          alert("Message envoyé avec succès ✅");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          alert("❌ Erreur lors de l'envoi du message.");
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">{t("contact.title")}</h2>
        <p className="contact-subtitle">
          {t("contact.subtitle")}
        </p>

        <div className="contact-grid">
          {/* Formulaire de contact */}
          <div className="contact-card form-card">
            <h3>{t("contact.formTitle")}</h3>
            <p className="form-description">
              {t("contact.formDescription")}
            </p>

            <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t("contact.name")}</label>
                  <input type="text" name="name" placeholder={t("contact.namePlaceholder")} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t("contact.email")}</label>
                  <input type="email" name="email" placeholder={t("contact.emailPlaceholder")} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t("contact.subject")}</label>
                <input type="text" name="subject" placeholder={t("contact.subjectPlaceholder")} required />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t("contact.message")}</label>
                <textarea name="message" placeholder={t("contact.messagePlaceholder")} rows={5} required></textarea>
              </div>

              <button type="submit" className="btn-submit">
                {t("contact.sendButton")}
              </button>
            </form>
          </div>

          {/* Informations de contact et réseaux sociaux */}
          <div className="contact-info-column">
            <div className="contact-card info-card">
              <h3>{t("contact.contactInfo")}</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <Mail className="contact-icon" />
                  <div>
                    <span className="info-label">{t("contact.emailLabel")}</span>
                    <p>chaimabissi03@gmail.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Phone className="contact-icon" />
                  <div>
                    <span className="info-label">{t("contact.phoneLabel")}</span>
                    <p>+212 7059646</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <span className="info-label">{t("contact.locationLabel")}</span>
                    <p>Marrakech, Morocco</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card social-card">
              <h3>{t("contact.socialTitle")}</h3>
              <div id="links" className="sociel-links">
                <div className="social-item">
                  <Github className="social-icon" />
                  <div>
                    <span className="social-label">GitHub</span>
                    <a href="https://github.com/chaimae131" target="_blank" rel="noopener noreferrer">
                      github.com/chaimae131
                    </a>
                  </div>
                </div>


                <div className="social-item">
                  <Linkedin className="social-icon" />
                  <div>
                    <span className="social-label">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/chaima-bissi/" target="_blank" rel="noopener noreferrer">
                      Chaima Bissi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="contact-footer">
          <p>{t("contact.footerText")}</p>
          <div className="footer-social">
            <a href="https://github.com/chaimae131" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/chaima-bissi/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="mailto:chaimabissi03@gmail.com">
              <Mail size={20} />
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
