"use client"

import { useState } from "react"
import "./Navbar.css"
import { Home, User, Briefcase, Code, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const { t, i18n } = useTranslation()

  const handleClick = (section) => {
    setActiveSection(section)
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={() => handleClick("home")}>
            <Home size={20} /> {t("navbar.home")}
          </a>
        </li>
        <li>
          <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={() => handleClick("about")}>
            <User size={20} /> {t("navbar.about")}
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
            onClick={() => handleClick("projects")}
          >
            <Briefcase size={20} /> {t("navbar.projects")}
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => handleClick("skills")}
          >
            <Code size={20} /> {t("navbar.skills")}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => handleClick("contact")}
          >
            <Mail size={20} /> {t("navbar.contact")}
          </a>
        </li>
      </ul>

      <div className="lang-switch">
        <div className="lang-toggle">
          <button className={i18n.language === "fr" ? "active" : ""} onClick={() => i18n.changeLanguage("fr")}>
            FR
          </button>
          <button className={i18n.language === "en" ? "active" : ""} onClick={() => i18n.changeLanguage("en")}>
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
