"use client"

import { useState } from "react"
import certificatesData from "./certificatesData"
import experienceData from "./experienceData"
import "./About.css"
import { useTranslation } from "react-i18next"

export default function About() {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="about-container" id="about">
      <h1>{t("about.title")}</h1>

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
                src={cert.image || "/placeholder.svg"}
                alt={t(cert.titleKey)}
                className="cert-thumb"
                onClick={() => setSelectedImage(cert.image)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="experience-section">
        <h2>{t("experience.title")}</h2>
        <div className="experience-list">
          {experienceData.map((exp, index) => (
            <div key={index} className="experience-card">
              <h3 className="experience-title">{t(exp.titleKey)}</h3>
              <div className="experience-meta">
                <span>🏢 {t(exp.companyKey)}</span>
                <span>|</span>
                <span>🗓️ {t(exp.periodKey)}</span>
                {exp.typeKey && (
                  <>
                    <span>|</span>
                    <span>{t(exp.typeKey)}</span>  {/* Type de stage */}
                  </>
                )}
              </div>

              <p className="experience-intro"> {t(exp.descriptionKey)}</p>

              <p className="experience-tech">
                <strong>Technologies :</strong> {exp.technologies.join(", ")}
              </p>

              <div className="experience-footer">
                <div className="experience-links">
                  🔗 {" "}
                  {exp.links.map((link, idx) => (
                    <span key={idx}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {t(link.labelKey)}
                      </a>
                      {idx < exp.links.length - 1 && " · "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup agrandissement */}
      {selectedImage && (
        <div className="image-popup" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage || "/placeholder.svg"} alt="Certification" className="popup-img" />
        </div>
      )}
    </div>
  )
}
