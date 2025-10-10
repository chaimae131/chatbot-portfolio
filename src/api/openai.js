// src/api/openai.js

export async function getEmbedding(text) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text
    })
  });

  if (!res.ok) {
    console.error("Erreur embeddings:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.data?.[0]?.embedding || null;
}

export async function getEmbeddingsBatch(inputs) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: inputs
    })
  });

  if (!res.ok) {
    console.error("Erreur batch embeddings:", await res.text());
    return [];
  }

  const data = await res.json();
  return data.data.map(obj => obj.embedding);
}

// 💡 ICI on ajoute la fonction qui manquait
export async function getChatResponse(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages
    })
  });

  if (!res.ok) {
    console.error("Erreur chat completions:", await res.text());
    return "Erreur lors de la génération de la réponse.";
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
