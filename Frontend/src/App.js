// src/App.js
import VoiceAssistant from "./components/VoiceAssistant";
import SprayBox from "./components/SprayBox";
import CropAnalyzer from "./components/CropAnalyzer";
import WeatherPrediction from "./components/WeatherPrediction";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";





import "./App.css";
import {
  getSymptoms,
  getMedicines,
  getSpraySchedule,
  getPrecautions,
} from "./api/suggestionService";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [sprayData, setSprayData] = useState(null);

  const [suggestion, setSuggestion] = useState("");
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  // ---------------- IMAGE UPLOAD ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setSuggestion("");
    setActiveTab("");
    setChatMessages([]);
  };

  // ---------------- ANALYZE BUTTON ----------------
  const handleAnalyze = async () => {
    if (!image) {
      alert("Kripya pehle patte ki tasveer upload karein.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);

      const diseaseRes = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        body: formData,
      });

      const raw = await diseaseRes.text();
      let diseaseData = {};

      try {
        diseaseData = JSON.parse(raw);
      } catch {
        diseaseData = { class: raw };
      }

      setResult(diseaseData);
      setSuggestion("");
      setActiveTab("");
      setChatMessages([]);
    } catch (err) {
      console.log("ANALYZE ERROR:", err);
    }
  };

  // ---------------- SUGGESTIONS ----------------
  // SUGGESTION BUTTON CLICK
      const handleSuggestion = () => {
        if (!result || !result.class) {
          alert("Kripya pehle analysis karein.");
          return;
        }
        setActiveTab("symptoms");
        setSuggestion("");
      };

      // STREAMING — Symptoms
      const handleSymptoms = async () => {
        setActiveTab("symptoms");
        setSuggestion("");
        setSuggestionLoading(true);

        await getSymptoms(result.class, (chunk) => {
          setSuggestion(prev => prev + chunk);
        });

        setSuggestionLoading(false);
      };

      // STREAMING — Medicines
      const handleMedicines = async () => {
        setActiveTab("medicine");
        setSuggestion("");
        setSuggestionLoading(true);

        await getMedicines(result.class, (chunk) => {
          setSuggestion(prev => prev + chunk);
        });

        setSuggestionLoading(false);
      };

      // STREAMING — Spray
      const handleSpray = async () => {
        setActiveTab("spray");
        setSuggestion("");
        setSuggestionLoading(true);

        await getSpraySchedule(result.class, (chunk) => {
          setSuggestion(prev => prev + chunk);
        });

        setSuggestionLoading(false);
      };

      // STREAMING — Precautions
      const handlePrecautions = async () => {
        setActiveTab("precaution");
        setSuggestion("");
        setSuggestionLoading(true);

        await getPrecautions(result.class, (chunk) => {
          setSuggestion(prev => prev + chunk);
        });

        setSuggestionLoading(false);
      };


  // ---------------- CHAT SEND ----------------
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const diseaseName = result?.class || "Potato";
      const fullMsg = `Disease: ${diseaseName}\nकिसान का सवाल:\n${msg}`;

      const res = await fetch(
        `http://localhost:8080/api/chat?message=${encodeURIComponent(fullMsg)}`
      );
      const text = await res.text();

      setChatMessages((prev) => [...prev, { sender: "bot", text }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "माफ़ कीजिए, सर्वर जवाब नहीं दे रहा।" },
      ]);
    }

    setChatLoading(false);
  };

  return (
    <div className="main-wrapper">
      <div className="pro-card">
        
        {/* HEADER */}
        <div className="potato-header">
          <div className="potato-icon">🚜</div>
          <div>
            <div className="potato-title">किसान मित्र – आलू पत्ती रोग पहचान</div>
            <div className="potato-subtitle">
              बस पत्ते की फोटो अपलोड करें और तुरंत समाधान पाएं 🌿
            </div>
          </div>
        </div>

        {/* 3 COLUMN GRID */}
        <div className="main-grid-layout">

          {/* LEFT COLUMN */}
          <div className="left-column">

            {/* UPLOAD SECTION */}
            <div className="upload-section">
              <div className="upload-title">📸 पत्ते की फोटो अपलोड करें</div>

              <div className="upload-buttons">
                <label className="btn-yellow">
                  📁 फोटो चुनें
                  <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                </label>

                <button className="btn-blue" onClick={handleAnalyze}>
                  🔍 बीमारी पहचानें
                </button>
              </div>

              <div className="preview-section">
                {preview ? (
                  <div className="preview-image-container">
                    <img src={preview} className="preview-image" alt="preview" />
                  </div>
                ) : (
                  <div className="preview-box">
                    <div className="preview-icon">🖼️</div>
                    <div className="preview-text">यहां प्रीव्यू दिखाई देगा</div>
                  </div>
                )}
              </div>
            </div>

            {/* ANALYZER */}
            <CropAnalyzer onResult={(data) => setSprayData(data)} />

            {/* RESULT */}
            {result?.class && (
              <div className="disease-card">
                <div className="disease-title">🩺 बीमारी की जानकारी</div>

                <div className="disease-info">
                  <span className="disease-label">रोग:</span>
                  <span className="green-text">{result.class}</span>
                </div>

                <div className="disease-info">
                  <span className="disease-label">भरोसा:</span>
                  <span>{(result.confidence * 100).toFixed(2)}%</span>
                </div>

                <button className="btn-yellow" onClick={handleSuggestion}>
                  🌾 उपाय देखें
                </button>
              </div>
            )}

            {/* SUGGESTION BOX */}
              {activeTab && (
              <div className="suggestion-card">

            {/* TABS */}
            <div className="suggestion-tabs">

      {/* Symptoms */}
            <button
              onClick={handleSymptoms}
              disabled={suggestionLoading}
              className={`suggestion-tab 
                ${activeTab === "symptoms" ? "suggestion-tab-active" : ""} 
                ${suggestionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              📋 लक्षण
            </button>

            {/* Medicines */}
            <button
              onClick={handleMedicines}
              disabled={suggestionLoading}
              className={`suggestion-tab 
                ${activeTab === "medicine" ? "suggestion-tab-active" : ""} 
                ${suggestionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              💊 दवाइयाँ
            </button>

            {/* Spray */}
            <button
              onClick={handleSpray}
              disabled={suggestionLoading}
              className={`suggestion-tab 
                ${activeTab === "spray" ? "suggestion-tab-active" : ""} 
                ${suggestionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              🚿 स्प्रे
            </button>

            {/* Precautions */}
            <button
              onClick={handlePrecautions}
              disabled={suggestionLoading}
              className={`suggestion-tab 
                ${activeTab === "precaution" ? "suggestion-tab-active" : ""} 
                ${suggestionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              ⚠️ सावधानियाँ
            </button>
          </div>

          {/* CONTENT */}
          <div className="suggestion-content">
            {suggestionLoading ? (
              <div className="loading-text">⏳ लोड हो रहा है...</div>
            ) : (
              <div className="markdown-box">
                <ReactMarkdown>{suggestion}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}


          </div>

          {/* MIDDLE COLUMN — WEATHER */}
          <div className="middle-column">
            <WeatherPrediction />
          </div>

          {/* RIGHT COLUMN */}
          <div className="third-column">

            {/* CHAT */}
            <div className="chat-card">
              <div className="chat-header">💬 किसान चैट</div>

              <div className="chat-messages">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`chat-message ${m.sender === "user" ? "chat-message-user" : "chat-message-bot"}`}>
                    <div className="chat-bubble markdown-chat">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.text}
                            </ReactMarkdown>
                          </div>

                  </div>
                ))}
              </div>

              <div className="chat-input-container">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="अपना सवाल लिखें..."
                  className="chat-input"
                />
                <button className="chat-send-btn" onClick={handleChatSend} disabled={chatLoading}>
                  {chatLoading ? "कृपया प्रतीक्षा करें..." : "भेजें"}
                </button>
              </div>
            </div>

            {/* VOICE */}
              <div className="voice-assistant-card">
                <VoiceAssistant />
              </div>

              {/* SPRAY CALCULATOR */}
              <div className="spraybox-card">
                <SprayBox data={sprayData} />
              </div>
            </div>
            
        </div>
      </div>
    </div>
    
  );
}
