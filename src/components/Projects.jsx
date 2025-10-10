"use client"

import { useState } from "react"
import projectsData from "./ProjectsData"
import "./Projects.css"
import { ArrowRight, X, ArrowLeft, ExternalLink, Github } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Projects() {
  const { t } = useTranslation()

  const filterKeys = ["all", "academicProjects", "personalProjects", "network", "cloud", "ai", "web", "devsecops"]

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects =
    selectedCategory === "all" ? projectsData : projectsData.filter((p) => p.categoriesKeys.includes(selectedCategory))

  // Fonctions pour ouvrir/fermer la modale
  const openProjectDetails = (project) => {
    setSelectedProject(project)
  }
  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  return (
    <section className="projects-section" id="projects">
      <h1 className="projects-title">{t("projects.title")}</h1>

      {/* Filtres */}
      <div className="projects-filters">
        {filterKeys.map((filterKey) => (
          <button
            key={filterKey}
            className={filterKey === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(filterKey)}
          >
            {t(`projects.filters.${filterKey}`)}
          </button>
        ))}
      </div>

      {/* Liste des projets */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <p>{t("projects.noProjects")}</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.images[0] || "/placeholder.svg"} alt={project.title} className="project-image" />
              <h3>{t(project.titleKey)}</h3>
              <p>{t(project.descriptionKey)}</p>

              {/* Technologies */}
              <div className="technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bouton pour ouvrir la modale */}
              <button className="btn-project" onClick={() => openProjectDetails(project)}>
                {t("projects.viewProject")}
                <ArrowRight size={16} style={{ marginLeft: "8px" }} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modale */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectDetails}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()} // Empêche fermeture si clic à l'intérieur
          >
            {/* Header */}
            <div className="modal-header">
              <button className="back-btn" onClick={closeProjectDetails}>
                <ArrowLeft size={20} />
                {t("projects.backToProjects")}
              </button>
              <button className="close-btn" onClick={closeProjectDetails}>
                <X size={24} />
              </button>
            </div>

            {/* Contenu */}
            <div className="modal-content">
              <div className="project-header">
                <h1 className="project-modal-title">{selectedProject.title}</h1>
                <p className="project-modal-description">{selectedProject.description}</p>

                <div className="project-technologies">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge-large">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sections du projet */}
              {selectedProject.sections?.length > 0 && (
                <div className="project-sections">
                  {selectedProject.sections.map((section, index) => (
                    <div key={index} className={`project-section ${index % 2 === 0 ? "image-right" : "image-left"}`}>
                      <div className="section-content">
                        <div className="section-text">
                          <div className="section-number">{String(index + 1).padStart(2, "0")}</div>
                          <p>{t(section.textKey)}</p>
                        </div>
                        <div className="section-image">
                          <img
                            src={section.image || "/placeholder.svg?height=300&width=400" || "/placeholder.svg"}
                            alt={`${selectedProject.title} - Step ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Liens */}
              <div className="project-links">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn primary"
                  >
                    <ExternalLink size={20} />
                    {t("projects.viewLive")}
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn secondary"
                  >
                    <Github size={20} />
                    {t("projects.viewCode")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
