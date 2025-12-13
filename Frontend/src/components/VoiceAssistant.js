// src/components/VoiceAssistant.js
import { useEffect, useState, useRef } from "react";
import { vapi, assistantId } from "../vapi/vapiClient";

export default function VoiceAssistant() {
  const [isCalling, setIsCalling] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [micPermission, setMicPermission] = useState(null);

  const messagesEndRef = useRef(null);

  // Check microphone permission
  const checkMicrophonePermission = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission('granted');
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        return true;
      }
    } catch (err) {
      setMicPermission('denied');
      return false;
    }
    return false;
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pushMessage = (sender, text) => {
    setMessages((prev) => [...prev, { 
      sender, 
      text, 
      timestamp: new Date(),
      id: Date.now() + Math.random() 
    }]);
  };

  const clearError = () => setError("");

  // Real VAPI event listeners
  useEffect(() => {
    if (!vapi) return;

  const handleCallStart = () => {
  console.log("🎤 VAPI: Real Call Started!");

  // Clean old audio (very important for Hindi smoothness)
  try {
    if (vapi.player) {
      vapi.player.stop();
    }
  } catch (e) {
    console.warn("Audio cleanup skipped:", e);
  }

  setIsCalling(true);
  setError("");

  // Less spammy, cleaner UI
  pushMessage("system", "🎤 Call connected! Aap bol sakte hain...");
};


    const handleCallEnd = () => {
      console.log("🛑 VAPI: Real Call Ended");
      setIsCalling(false);
      pushMessage("system", "Voice call ended.");
    };

    const handleSpeechStart = () => {
      pushMessage("system", "🔊 Assistant bol raha hai...");
    };

    const handleSpeechEnd = () => {
      pushMessage("system", "✅ Assistant ne bola khatam.");
    };

    const handleUserTranscript = (data) => {
      if (data?.text) {
        console.log("🎤 User said:", data.text);
        pushMessage("user", data.text);
      }
    };

    const handleAssistantSpeech = (data) => {
  if (!data) return;

  // Show assistant text (same as before)
  if (data.text) {
    pushMessage("assistant", data.text);
  }

  // STOP previous audio before new chunk plays (Hindi fix)
  try {
    if (vapi.player) {
      vapi.player.stop();
    }
  } catch (e) {
    console.warn("Audio stop skipped:", e);
  }

  // When entire Hindi sentence is spoken
  if (data.isFinal) {
    console.log("💬 Final assistant speech chunk finished.");
  }
};


    const handleError = (error) => {
      console.error("VAPI Error:", error);
      setError(`Voice error: ${error.message}`);
      setIsCalling(false);
    };

    // Setup event listeners
    const cleanups = [
      vapi.on("call-start", handleCallStart),
      vapi.on("call-end", handleCallEnd),
      vapi.on("speech-start", handleSpeechStart),
      vapi.on("speech-end", handleSpeechEnd),
      vapi.on("transcript", handleUserTranscript),
      vapi.on("assistant-speech", handleAssistantSpeech),
      vapi.on("error", handleError),
    ];

    return () => {
      cleanups.forEach(cleanup => cleanup && cleanup());
    };
  }, []);

  const toggleVoice = async () => {
    try {
      setError("");
      setIsLoading(true);

      if (!isCalling) 
        {
        console.log("🚀 Starting REAL voice call...");
        
        // Check microphone permission first
        const hasMic = await checkMicrophonePermission();
        if (!hasMic) {
          setError("Microphone access required for voice call. Please allow microphone permission.");
          setIsLoading(false);
          return;
                  }

        // Start real VAPI call
        try {
        console.log("📞 Trying to start VAPI call with assistant:", assistantId);

        await vapi.start(assistantId);

        console.log("🎉 VAPI call successfully started!");
          } catch (err) {
              console.error("❌ VAPI START ERROR:", err);
          }




      } else {
        console.log("🛑 Stopping voice call...");
        await vapi.stop();
        setIsCalling(false);
      }
    } catch (err) {
      console.error("Voice call error:", err);
      
      if (err.message?.includes('microphone') || err.message?.includes('audio')) {
        setError("Microphone access issue. Please check browser permissions and allow microphone access.");
      } else {
        setError(`Voice call failed: ${err.message}. Kripya API keys check karein.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError("");
  };

  const requestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission('granted');
      stream.getTracks().forEach(track => track.stop());
      setError("✅ Microphone access granted! Ab voice call start kar sakte hain.");
    } catch (err) {
      setMicPermission('denied');
      setError("❌ Microphone access denied. Kripya browser settings mein jakar microphone allow karein.");
    }
  };

  return (
    <div className="voice-assistant-card">
      {/* Status Indicator */}
      <div className={`status-indicator ${vapi.isInitialized !== false ? 'status-ready' : 'status-warning'}`}>
        <div className="status-content">
          <span className="status-icon">
            {vapi.isInitialized !== false ? "✅" : "🔧"}
          </span>
          <div>
            <strong>Voice Assistant:</strong> 
            {vapi.isInitialized !== false ? " REAL Voice Ready" : " Demo Mode"}
            <div className="status-hint">
              {vapi.isInitialized !== false ? 
                "Real voice features enabled - bolna shuru karein!" : 
                "Real voice ke liye package install karein"}
            </div>
          </div>
        </div>
      </div>

      {/* Microphone Status */}
      <div className={`mic-status ${micPermission === 'granted' ? 'mic-granted' : micPermission === 'denied' ? 'mic-denied' : 'mic-unknown'}`}>
        <div className="mic-status-content">
          <span className="mic-icon">
            {micPermission === 'granted' ? '🎤' : micPermission === 'denied' ? '❌' : '🔍'}
          </span>
          <div>
            <strong>Microphone:</strong> 
            {micPermission === 'granted' ? ' Allowed' : 
             micPermission === 'denied' ? ' Blocked' : ' Check Required'}
            {micPermission !== 'granted' && (
              <button 
                onClick={requestMicrophone}
                className="mic-permission-btn"
              >
                Allow Microphone
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <div className="error-content">
            <strong>Note:</strong> {error}
            <button onClick={clearError} className="error-close">✕</button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="voice-controls">
        <button 
          onClick={toggleVoice} 
          disabled={isLoading || micPermission === 'denied'}
          className={`voice-toggle-btn ${isCalling ? 'voice-stop' : 'voice-start'} ${isLoading ? 'btn-loading' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner-small"></div>
              {isCalling ? "Disconnecting..." : "Connecting..."}
            </>
          ) : isCalling ? (
            "⛔ Stop Real Voice Call"
          ) : (
            "🎤 Start Real Voice Call"
          )}
        </button>

        <button onClick={clearMessages} className="clear-messages-btn">
          🗑️ Clear Chat
        </button>
      </div>

      {/* Voice Messages */}
      <div className="voice-messages-container">
        <div className="voice-messages-header">
          <span>
            {vapi.isInitialized !== false ? "Real Voice Conversation" : "Demo Conversation"}
            {isCalling && " 🔴 LIVE"}
          </span>
          <span className="message-count">{messages.length} messages</span>
        </div>
        
        <div className="voice-messages">
          {messages.length === 0 ? (
            <div className="no-messages">
              <div className="no-messages-icon">
                {vapi.isInitialized !== false ? "🎤" : "🔧"}
              </div>
              <div className="no-messages-text">
                {vapi.isInitialized !== false ? 
                  "Start voice call and begin speaking!" : 
                  "Demo mode - real voice requires setup"}
              </div>
              {vapi.isInitialized === false && (
                <div className="no-messages-hint">
                  Real voice ke liye: npm install @vapi-ai/web@latest
                </div>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`voice-message ${message.sender === "user" ? "voice-message-user" : "voice-message-assistant"}`}
              >
                <div className="voice-message-content">
                  <div className="message-sender">
                    {message.sender === "user" ? "You" : 
                     message.sender === "assistant" ? "Assistant" : "System"}
                  </div>
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {isCalling && (
        <div className="quick-messages">
          <div className="quick-messages-label">Try saying:</div>
          <div className="quick-messages-buttons">
            {[
              "Hello, what potato diseases can you help with?",
              "My potato leaves have spots",
              "What is early blight treatment?",
              "Organic remedies for potato diseases"
            ].map((question, index) => (
              <div key={index} className="quick-message-hint">
                "{question}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}