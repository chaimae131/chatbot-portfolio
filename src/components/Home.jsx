"use client"

import { Download, Eye, Github, Linkedin, Mail } from "lucide-react"
import "./Home.css"
import { useTranslation } from "react-i18next"

export default function Home({ onOpenChatbot }) {
  const { t } = useTranslation()

  return (
    <section className="home-section">
      <div className="home-container">
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <img src="./me.jpeg" className="profile-image" />
            <div className="profile-ring"></div>
          </div>

          <div className="profile-content">
            <span className="profile-name">{t("home.name")}</span>
            <h2 className="profile-title">{t("home.title")}</h2>
            <p className="profile-description">{t("home.description")}</p>

            <div className="action-buttons">
              <a href="/cv.pdf" className="btn btn-primary" download>
                <Download size={20} />
                <span>{t("home.downloadCV")}</span>
              </a>
              <button onClick={onOpenChatbot} className="btn btn-secondary">
                <Eye size={20} />
                <span>{t("home.chatbot")}</span>
              </button>
            </div>

            <div className="social-links">
              <a href="https://github.com/chaimae131" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/chaima-bissi/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
              </a>
              <a href="mailto:chaimabissi03@gmail.com" className="social-link">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">{t("home.stats.years")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">{t("home.stats.projects")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">{t("home.stats.tech")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
