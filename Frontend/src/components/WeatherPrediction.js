// src/components/WeatherPrediction.js
import { useState } from "react";

const WeatherPrediction = () => {
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Predefined locations for quick selection
  const predefinedLocations = [
    { name: "📍 Uttar Pradesh (Main)", lat: 26.8467, lon: 80.9462 },
    { name: "📍 Punjab", lat: 31.1471, lon: 75.3412 },
    { name: "📍 West Bengal", lat: 22.9868, lon: 87.8550 },
    { name: "📍 Bihar", lat: 25.0961, lon: 85.3131 },
    { name: "📍 Gujarat", lat: 22.2587, lon: 71.1924 }
  ];

  const handleLocationSelect = (loc) => {
    setLocation({ lat: loc.lat, lon: loc.lon });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getWeatherPrediction = async () => {
    if (!location.lat || !location.lon) {
      setError("Kripya latitude aur longitude daalein");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/weather-prediction?lat=${location.lat}&lon=${location.lon}`
      );
      
      if (!response.ok) {
        throw new Error("Server se response nahi mila");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error("Weather prediction error:", err);
      setError(`Data load nahi ho paya: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high": return "🔴";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };

  return (
    <div className="weather-prediction-card">
      {/* Header */}
      <div className="weather-header">
        <div className="weather-icon">🌤️</div>
        <div>
          <div className="weather-title">मौसम आधारित रोग पूर्वानुमान</div>
          <div className="weather-subtitle">
            अपने क्षेत्र के मौसम के आधार पर आलू की बीमारियों का जोखिम जानें
          </div>
        </div>
      </div>

      {/* Location Input Section */}
      <div className="location-section">
        <div className="location-title">📍 स्थान चुनें</div>
        
        {/* Quick Location Buttons */}
        <div className="quick-locations">
          <div className="quick-locations-label">त्वरित स्थान:</div>
          <div className="quick-locations-buttons">
            {predefinedLocations.map((loc, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(loc)}
                className="location-btn"
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Manual Input */}
        <div className="manual-input grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">अक्षांश (Latitude)</label>
            <input
              type="number"
              step="any"
              name="lat"
              value={location.lat}
              onChange={handleInputChange}
              placeholder="e.g., 26.8467"
              className="location-input w-full"
            />
          </div>

          <div className="input-group">
            <label className="input-label">देशांतर (Longitude)</label>
            <input
              type="number"
              step="any"
              name="lon"
              value={location.lon}
              onChange={handleInputChange}
              placeholder="e.g., 80.9462"
              className="location-input w-full"
            />
          </div>
        </div>


        <button
          onClick={getWeatherPrediction}
          disabled={loading || !location.lat || !location.lon}
          className="predict-btn"
        >
          {loading ? (
            <>
              <div className="loading-spinner-small"></div>
              विश्लेषण हो रहा है...
            </>
          ) : (
            "🌾 रोग जोखिम जानें"
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <div className="error-content">
            <strong>त्रुटि:</strong> {error}
            <button 
              onClick={() => setError("")}
              className="error-close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Prediction Results */}
      {prediction && (
        <div className="prediction-results">
          <div className="results-header">
            <div className="results-title">पूर्वानुमान परिणाम</div>
            <div className="results-location">
              Location: {location.lat}, {location.lon}
            </div>
          </div>

          {/* Risk Level */}
          <div className="risk-level" style={{ borderLeftColor: getRiskColor(prediction.risk) }}>
            <div className="risk-header">
              <span className="risk-icon">{getRiskIcon(prediction.risk)}</span>
              <span className="risk-title">रोग जोखिम स्तर</span>
            </div>
            <div className="risk-value" style={{ color: getRiskColor(prediction.risk) }}>
              {prediction.risk || "N/A"}
            </div>
          </div>

          {/* Weather Details */}
          <div className="weather-details">
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-icon">🌡️</div>
                <div className="detail-content">
                  <div className="detail-label">वर्तमान तापमान</div>
                  <div className="detail-value">{prediction.temperature_current || "N/A"}</div>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">📊</div>
                <div className="detail-content">
                  <div className="detail-label">औसत तापमान</div>
                  <div className="detail-value">{prediction.temperature_avg || "N/A"}</div>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">📈</div>
                <div className="detail-content">
                  <div className="detail-label">रोग संभावना</div>
                  <div className="detail-value">{prediction.probability || "N/A"}</div>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">💧</div>
                <div className="detail-content">
                  <div className="detail-label">स्प्रे की खिड़की</div>
                  <div className="detail-value">{prediction.sprayWindow || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>

        {/* AI Advice */}
{prediction.aiAdvice && (
  <div className="ai-advice">
    <div className="ai-header">
      <div className="ai-icon">🤖</div>
      <div className="ai-title">AI सलाह</div>
    </div>
    
    <div className="ai-content">
      {typeof prediction.aiAdvice === "string"
        ? prediction.aiAdvice
        : prediction.aiAdvice?.text || "कोई सलाह उपलब्ध नहीं है।"}
    </div>
  </div>
)}


          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn-yellow"
              onClick={() => window.location.reload()}
            >
              🔄 नया विश्लेषण
            </button>
            <button 
              className="btn-blue"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(prediction, null, 2))}
            >
              📋 परिणाम कॉपी करें
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="info-section">
        <details className="info-details">
          <summary>ℹ️ मौसम पूर्वानुमान कैसे काम करता है?</summary>
          <div className="info-content">
            <p>यह सिस्टम आपके क्षेत्र के मौसम डेटा के आधार पर आलू की बीमारियों के जोखिम का विश्लेषण करता है:</p>
            <ul>
              <li><strong>तापमान:</strong> बीमारी के विकास के लिए आदर्श स्थितियाँ</li>
              <li><strong>नमी:</strong> फंगल बीमारियों के फैलाव को प्रभावित करता है</li>
              <li><strong>वर्षा:</strong> बीमारी के प्रसार को तेज करता है</li>
              <li><strong>AI विश्लेषण:</strong> मौसम पैटर्न और ऐतिहासिक डेटा का अध्ययन</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default WeatherPrediction;