import { useState } from "react";
import "./ChatBox.css";

export default function ChatBox({ diseaseName }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- Send Message ----
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();

    // Add to UI
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    try {
      setLoading(true);

      // backend call (no diseaseName append here)
      const res = await fetch(
        `http://localhost:8080/api/chat?userName=farmer&message=${encodeURIComponent(
          userMsg
        )}`
      );

      const text = await res.text();

      setChatMessages((prev) => [...prev, { sender: "bot", text }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❗ जवाब लाने में दिक्कत आ रही है" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-title">💬 किसान चैट</div>

      <div className="chat-window">
        {chatMessages.length === 0 ? (
          <p className="chat-placeholder">यहाँ बातचीत दिखाई देगी…</p>
        ) : (
          chatMessages.map((m, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                m.sender === "user" ? "right" : "left"
              }`}
            >
              {m.text}
            </div>
          ))
        )}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="अपना सवाल लिखें…"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />

        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "…" : "➤"}
        </button>
      </div>
    </div>
  );
}
