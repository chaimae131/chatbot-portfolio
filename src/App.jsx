"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Chatbot from "./Chatbot"
import "./App.css"

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      <Navbar />
      <section id="home">
        <Home onOpenChatbot={() => setIsChatbotOpen(true)} />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="contact">
        <Contact />
      </section>

      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
        <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
      </div>
    </>
  )
}
