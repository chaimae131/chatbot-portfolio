"use client"

import { useEffect, useState } from "react"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"
import qa from "./data"
import { franc } from "franc"
import "./Chatbot.css"
import { getChatResponse, getEmbedding, getEmbeddingsBatch } from "./api/openai";



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
    const saved = localStorage.getItem("qaEmbeddings");
    if (saved) {
      setQaEmbeddings(JSON.parse(saved));
      return; // pas d'appel API
    }

    const generateEmbeddings = async () => {
      const allVariants = qa.flatMap(entry =>
        [entry.question, ...(entry.variants || [])].map(normalizeText)
      );
      const allEmbeddings = await getEmbeddingsBatch(allVariants);
      // Redistribuer
      let index = 0;
      const embeddings = qa.map(entry => {
        const variants = [entry.question, ...(entry.variants || [])].map(normalizeText);
        const entryEmbeddings = variants.map(() => allEmbeddings[index++] || null);
        return { ...entry, embeddings: entryEmbeddings };
      });
      localStorage.setItem("qaEmbeddings", JSON.stringify(embeddings));
      setQaEmbeddings(embeddings);
    };

    generateEmbeddings();
  }, []);




  const generateBotResponse = async (updatedChatHistory) => {
    const lastMessage = updatedChatHistory.at(-1)?.text
    const normalized = normalizeText(lastMessage)
    const detectedLang = franc(normalized) // e.g., 'fra', 'eng', etc.
    console.log("Langue détectée :", detectedLang)

    

    let bestMatch = null
    let highestSimilarity = 0

    const userEmbedding = await getEmbedding(normalized);
    if (!userEmbedding) {
      setChatHistory((history) => [
        ...history.slice(0, -1),
        { role: "model", text: "Erreur lors du calcul de l'embedding utilisateur." },
      ]);
      return;
    }


    for (const entry of qaEmbeddings) {
      for (const variantEmbedding of entry.embeddings) {
        if (!variantEmbedding) continue; // skip null
        const sim = cosineSimilarity(userEmbedding, variantEmbedding);
        if (sim > highestSimilarity) {
          highestSimilarity = sim;
          bestMatch = entry;
        }
      }
    }


    if (highestSimilarity > 0.75 && bestMatch) {
      setChatHistory((history) => [...history.slice(0, -1), { role: "model", text: bestMatch.answer }])
      return
    }

    
    try {
      const isFrench = detectedLang === "fra"

      const systemPrompt = isFrench
        ? `Tu es Chaima, une étudiante en cybersécurité à l'ENSA Marrakech. Tu réponds toujours à la première personne. Tu ne dis jamais que tu es un modèle ou une IA.`
        : `You are Chaima, a cybersecurity student at ENSA Marrakech. Always answer in the first person as Chaima. Never say you are an AI or model.`

      const messages = [
        { role: "system", content: systemPrompt },
        ...updatedChatHistory
          .filter(msg => msg.text !== "Thinking ...")
          .map(msg => ({ role: msg.role, content: msg.text }))
      ]

      const botText = await getChatResponse(messages)

      setChatHistory((history) => [...history.slice(0, -1), { role: "model", text: botText }])
    } catch (error) {
      console.error("Erreur OpenAI:", error)
      setChatHistory((history) => [
        ...history.slice(0, -1),
        { role: "model", text: "Erreur lors de la réponse du bot." },
      ])}
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
