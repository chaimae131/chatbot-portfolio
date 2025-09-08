import { useState } from "react";
import certificatesData from "./certificatesData";
import "./About.css";
import { useTranslation } from "react-i18next";


export default function About() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="about-container" id="about">
      <h1>{t("about.title")}</h1>
      <p className="about-summary">
        {t("about.summary")}
      </p>

      {/* Timeline */}
      <div className="timeline">
        {t("about.timeline", { returnObjects: true }).map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-header">
              <h3>{item.title}</h3>
              <span className="timeline-date">{item.date}</span>
            </div>
            <p>{item.place}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="certifications">
        <h2>{t("about.certificationsTitle")}</h2>
        <div className="cert-list">
          {certificatesData.map((cert, index) => (
            <div key={index} className="cert-row">
              <div className="cert-info">
                <h4 className="title">{t(cert.titleKey)}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
              <img
                src={cert.image}
                alt={t(cert.titleKey)}
                className="cert-thumb"
                onClick={() => setSelectedImage(cert.image)}
              />
            </div>
          ))}
        </div>
      </div>


      {/* Popup agrandissement */}
      {selectedImage && (
        <div className="image-popup" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Certification" className="popup-img" />
        </div>
      )}
    </div>
  );
}
