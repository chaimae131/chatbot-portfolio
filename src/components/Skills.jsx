"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "./Skills.css"
import { SiSpring } from "react-icons/si";
import {
  FaCode,
  FaServer,
  FaCloud,
  FaPeopleCarry,
  FaClock,
  FaBrain,
  FaBalanceScale,
  FaLinux,
  FaDatabase as FaSql,
  FaTrophy,
  FaWindows,
  FaDocker,
  FaKey,
  FaLock,
  FaNetworkWired,
} from "react-icons/fa"
import {
  SiPython,
  SiCplusplus,
  SiPhp,
  SiJavascript,
  SiGnubash,
  SiReact,
  SiVirtualbox,
  SiVmware,
  SiProxmox,
  SiAnsible,
  SiOpenstack,
  SiAmazonwebservices,
  SiWireshark,
  SiFortinet,
  SiPfsense,
  SiTryhackme,
  SiLetsencrypt,
  SiHashicorp,
} from "react-icons/si"
import { DiJava } from "react-icons/di"
import { useTranslation } from "react-i18next"

const Skills = () => {
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState("all")

  // Données techniques avec catégories
  const technicalSkills = [
    {
      category: t("skills.categories.languages"),
      icon: <FaCode className="skill-category-icon" />,
      skills: [
        { name: "Python", icon: <SiPython />, level: 75 },
        { name: "C++", icon: <SiCplusplus />, level: 60 },
        { name: "PHP", icon: <SiPhp />, level: 40 },
        { name: "JavaScript", icon: <SiJavascript />, level: 65 },
        { name: "Shell scripting", icon: <SiGnubash />, level: 70 },
        { name: "Java", icon: <DiJava />, level: 30 },
        { name: "React", icon: <SiReact />, level: 40 },
        { name: "SQL", icon: <FaSql />, level: 55 },
      ],
    },
    {
      category: t("skills.categories.platforms"),
      icon: <FaServer className="skill-category-icon" />,
      skills: [
        { name: "Linux (Kali, Ubuntu, Tsurugi)", icon: <FaLinux />, level: 90 },
        { name: "Windows", icon: <FaWindows />, level: 85 },
        { name: "VirtualBox", icon: <SiVirtualbox />, level: 85 },
        { name: "VMware", icon: <SiVmware />, level: 85 },
        { name: "Proxmox", icon: <SiProxmox />, level: 85 },
        { name: "TryHackMe", icon: <SiTryhackme />, level: 70 },
        { name: "LetsDefend", icon: <SiLetsencrypt />, level: 50 },
      ],
    },
    {
      category: t("skills.categories.cloud"),
      icon: <FaCloud className="skill-category-icon" />,
      skills: [
        { name: "AWS (GuardDuty, EventBridge, Lambda, S3, EC2, ECS)", icon: <SiAmazonwebservices />, level: 70 },
        { name: "Docker", icon: <FaDocker />, level: 80 },
        { name: "Ansible", icon: <SiAnsible />, level: 55 },
        { name: "OpenStack", icon: <SiOpenstack />, level: 40 },
        { name: "Spring Cloud Eureka", icon: <SiSpring />, level: 30 }
      ],
    },
    {
      category: t("skills.categories.security"),
      icon: <FaLock className="skill-category-icon" />,
      skills: [
        { name: "Wireshark", icon: <SiWireshark />, level: 60 },
        { name: "FortiGate", icon: <SiFortinet />, level: 75 },
        { name: "pfSense", icon: <SiPfsense />, level: 80 },
        { name: "DMZ", icon: <FaNetworkWired />, level: 65 },
        { name: "WAF", icon: <FaLock />, level: 80 },
      ],
    },
    {
      category: t("skills.categories.crypto"),
      icon: <FaKey className="skill-category-icon" />,
      skills: [
        { name: "OpenSSL", icon: <FaLock />, level: 85 },
        { name: "PKI", icon: <FaKey />, level: 85 },
        { name: "Digital Signatures", icon: <FaLock />, level: 85 },
        { name: "Hashing Functions", icon: <SiHashicorp />, level: 85 },
      ],
    },
  ]

  // Soft Skills avec une catégorie unique
  const softSkillsCategory = {
    category: t("skills.categories.soft"),
    icon: <FaPeopleCarry className="skill-category-icon" />,
    skills: [
      { name: t("skills.softSkills.teamwork"), icon: <FaPeopleCarry /> },
      { name: t("skills.softSkills.timeManagement"), icon: <FaClock /> },
      { name: t("skills.softSkills.problemSolving"), icon: <FaBrain /> },
      { name: t("skills.softSkills.adaptability"), icon: <FaBalanceScale /> },
      { name: t("skills.softSkills.communication"), icon: <FaPeopleCarry /> },
      { name: t("skills.softSkills.rigour"), icon: <FaTrophy /> },
      { name: t("skills.softSkills.attention"), icon: <FaBrain /> },
    ],
  }

  const filterKeys = ["all", "languages", "platforms", "cloud", "security", "crypto", "soft"]

  const technicalSkillsWithKeys = technicalSkills.map((skill, index) => ({
    ...skill,
    filterKey: ["languages", "platforms", "cloud", "security", "crypto"][index],
  }))

  const softSkillsCategoryWithKey = {
    ...softSkillsCategory,
    filterKey: "soft",
  }

  const displayedCategories =
    selectedCategory === "all"
      ? [...technicalSkillsWithKeys, softSkillsCategoryWithKey]
      : selectedCategory === "soft"
        ? [softSkillsCategoryWithKey]
        : technicalSkillsWithKeys.filter((c) => c.filterKey === selectedCategory)

  // Animation variants (copie ton code original)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  }
  const skillItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.3)", transition: { duration: 0.3 } },
  }
  const sectionVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backOut" } },
  }

  return (
    <div className="skills-container">
      <h2 className="skills-title">{t("skills.title")}</h2>
      <div className="skills-filters">
        {filterKeys.map((key) => (
          <button
            key={key}
            className={key === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(key)}
          >
            {t(`skills.filters.${key}`)}
          </button>
        ))}
      </div>

      {/* Skills Display */}
      <motion.section className="skills-section" initial="hidden" animate="visible" variants={sectionVariants}>
        <motion.div className="technical-skills-grid" variants={containerVariants} initial="hidden" animate="visible">
          {displayedCategories.map((category, idx) => (
            <motion.div
              key={category.category}
              className="skill-category-card"
              variants={skillItemVariants}
              whileHover="hover"
            >
              <div className="skill-category-header">
                {category.icon}
                <h3>{category.category}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, i) => (
                  <motion.div key={skill.name} className="skill-item" whileHover={{ scale: 1.03 }}>
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      {/* Affiche la barre de niveau que pour les compétences techniques */}
                      {skill.level && (
                        <div className="skill-level-bar">
                          <motion.div
                            className="skill-level-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Skills
