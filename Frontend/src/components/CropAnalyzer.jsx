import React, { useState } from "react";
import { analyzeAndSpray } from "../api/apiClient";

export default function CropAnalyzer({ onResult }) {
  const [area, setArea] = useState(1);
  const [unit, setUnit] = useState("bigha");
  const [disease, setDisease] = useState("");
  const [pumpSize, setPumpSize] = useState(15);         // default 15L
  const [pumpRequired, setPumpRequired] = useState(3);  // default 3 pump
  const [loading, setLoading] = useState(false);

  const diseaseList = [
    "Late Blight",
    "Early Blight",
    "Leaf Spot",
    "Potassium Deficiency",
    "Bacterial Wilt",
    "Virus Infection",
    "Powdery Mildew",
    "Root Rot",
    "Healthy"
  ];

  async function handleSubmit() {

    if (!disease) {
      alert("कृपया बीमारी चुनें!");
      return;
    }

    if (!area || area <= 0) {
      alert("कृपया खेत का सही क्षेत्रफल डालें!");
      return;
    }

    if (!pumpSize || pumpSize <= 0) {
      alert("कृपया पंप का साइज़ सही डालें (जैसे 15 या 18 लीटर)");
      return;
    }

    if (!pumpRequired || pumpRequired <= 0) {
      alert("कृपया कितने पंप लगेंगे वह दर्ज करें!");
      return;
    }

    setLoading(true);

    try {
      const result = await analyzeAndSpray(
        disease,
        area,
        unit,
        pumpSize,
        pumpRequired
      );

      onResult(result);
    } catch (e) {
      alert("Server Error!");
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow-md">

      {/* Title */}
      <h3 className="text-xl font-semibold mb-4">🌿 स्प्रे कैलकुलेटर</h3>

      {/* Disease Dropdown */}
      <label className="text-sm font-semibold text-green-700">🌱 बीमारी चुनें</label>
      <select
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mb-4"
      >
        <option value="">-- बीमारी चुनें --</option>
        {diseaseList.map((d, idx) => (
          <option key={idx} value={d}>{d}</option>
        ))}
      </select>

      {/* Area Input */}
      <label className="text-sm font-semibold text-green-700">क्षेत्रफल</label>
      <div className="flex items-center gap-2 mb-4 mt-1">
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border px-3 py-2 rounded w-24"
          min="0.1"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="bigha">Bigha</option>
          <option value="acre">Acre</option>
          <option value="hectare">Hectare</option>
        </select>
      </div>

      {/* Pump Size */}
      <label className="text-sm font-semibold text-green-700">🚿 पंप का साइज़ (लीटर)</label>
      <input
        type="number"
        value={pumpSize}
        onChange={(e) => setPumpSize(e.target.value)}
        placeholder="उदा: 15, 16, 18"
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {/* Pump Required */}
      <label className="text-sm font-semibold text-green-700">🔢 कितने पंप लगेंगे?</label>
      <input
        type="number"
        value={pumpRequired}
        onChange={(e) => setPumpRequired(e.target.value)}
        placeholder="उदा: 3, 4, 5"
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
      >
        {loading ? "Processing..." : "🔍 Spray Suggestion Generate करें"}
      </button>
    </div>
  );
}
