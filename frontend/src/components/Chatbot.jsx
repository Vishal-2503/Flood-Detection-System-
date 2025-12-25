import { useState } from "react";

export default function Chatbot({ lat, lng, risk }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendQuestion = async () => {
    if (!question) return;

    const userMsg = { from: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        flood_risk: risk,
        latitude: lat,
        longitude: lng,
      }),
    });

    const data = await response.json();

    const botMsg = { from: "bot", text: data.answer };
    setMessages((prev) => [...prev, botMsg]);

    setQuestion("");
  };

  return (
    <div style={{ marginTop: "30px", border: "1px solid #ccc", padding: "15px" }}>
      <h3>🤖 Flood Assistant</h3>

      <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={question}
        placeholder="Ask about flood risk, safety, etc..."
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "80%", marginRight: "5px" }}
      />

      <button onClick={sendQuestion}>Send</button>
    </div>
  );
}
