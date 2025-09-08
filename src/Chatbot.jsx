"use client"

import { useEffect, useState } from "react"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"
import qa from "./data"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { franc } from "franc"
import "./Chatbot.css"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Fonction de normalisation de texte
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim()
}

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [chatHistory, setChatHistory] = useState([])
  const [qaEmbeddings, setQaEmbeddings] = useState([])

  const cosineSimilarity = (vecA, vecB) => {
    const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
    return dot / (magA * magB)
  }

  useEffect(() => {
    const generateEmbeddings = async () => {
      const model = genAI.getGenerativeModel({ model: "embedding-001" })

      const embeddings = await Promise.all(
        qa.map(async (entry) => {
          const allQuestions = [entry.question, ...(entry.variants || [])]
          const normalizedVariants = allQuestions.map(normalizeText)

          const results = await Promise.all(
            normalizedVariants.map(async (variant) => {
              const result = await model.embedContent(variant)
              return result.embedding.values
            }),
          )

          return { ...entry, embeddings: results }
        }),
      )

      setQaEmbeddings(embeddings)
    }

    generateEmbeddings()
  }, [])

  const generateBotResponse = async (updatedChatHistory) => {
    const lastMessage = updatedChatHistory.at(-1)?.text
    const normalized = normalizeText(lastMessage)
    const detectedLang = franc(normalized) // e.g., 'fra', 'eng', etc.
    console.log("Langue détectée :", detectedLang)

    const model = genAI.getGenerativeModel({ model: "embedding-001" })
    const result = await model.embedContent(lastMessage)
    const userEmbedding = result.embedding.values

    let bestMatch = null
    let highestSimilarity = 0

    for (const entry of qaEmbeddings) {
      for (const variantEmbedding of entry.embeddings) {
        const sim = cosineSimilarity(userEmbedding, variantEmbedding)
        if (sim > highestSimilarity) {
          highestSimilarity = sim
          bestMatch = entry
        }
      }
    }

    if (highestSimilarity > 0.75 && bestMatch) {
      setChatHistory((history) => [...history.slice(0, -1), { role: "model", text: bestMatch.answer }])
      return
    }

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

    const isFrench = detectedLang === "fra"

    const systemPrompt = isFrench
      ? `Tu es Chaima, une étudiante en cybersécurité à l'ENSA Marrakech. Tu réponds toujours à la première personne. Tu ne dis jamais que tu es un modèle ou une IA.`
      : `You are Chaima, a cybersecurity student at ENSA Marrakech. Always answer in the first person as Chaima. Never say you are an AI or model.`

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        ...updatedChatHistory
          .filter((msg) => msg.text !== "Thinking ...")
          .map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          })),
      ],
    }

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Je n'ai pas compris."

      setChatHistory((history) => [...history.slice(0, -1), { role: "model", text: botText }])
    } catch (error) {
      console.error("Erreur API Gemini:", error)
      setChatHistory((history) => [
        ...history.slice(0, -1),
        {
          role: "model",
          text: "Erreur lors de la réponse du bot.",
        },
      ])
    }
  }

  return (
    <>
      {isOpen ? (
        // Ton style d'ouverture déjà défini
        <div className="container chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chat with Chaimae</h2>
            </div>
            <button
              className="material-symbols-rounded"
              onClick={() => setIsOpen(false)} // Fermer
            >
              keyboard_arrow_down
            </button>
          </div>

          <div className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there 👋<br />
                I'm here to help you learn more about Chaima's cybersecurity journey and projects.
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      ) : (
        // Petit bouton rond fermé
        <div
          onClick={() => setIsOpen(true)} // Ouvrir
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            backgroundColor: " #000080",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(249, 239, 239, 0.2)",
            zIndex: 9999,
          }}
        >
          <ChatbotIcon />
        </div>
      )}
    </>
  )
}

export default Chatbot
