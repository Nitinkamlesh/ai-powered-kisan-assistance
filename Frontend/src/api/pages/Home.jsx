import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import DiseaseResult from "../components/DiseaseResult";
import SuggestionBox from "../components/SuggestionBox";
import { analyzeDisease } from "../api/analyzeService";
import { getSuggestion } from "../api/suggestionService";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const handleAnalyze = async () => {
    const diseaseData = await analyzeDisease(image);
    setResult(diseaseData);

    const suggestionData = await getSuggestion(diseaseData.diseaseName);
    setSuggestion(suggestionData.suggestion);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="p-4 bg-white shadow text-2xl font-bold">
        Potato Disease Detector
      </div>

      {/* MAIN TWO COLUMN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="w-1/2 p-4 overflow-y-auto space-y-6 bg-white shadow-inner">

          {/* Image Upload Box */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Upload Leaf Image</h2>
            <ImageUploader onImageSelect={setImage} />
          </div>

          {/* Analyze Button */}
          <button
            className="w-full py-3 bg-green-600 text-white text-lg rounded-xl shadow"
            onClick={handleAnalyze}
          >
            Analyze Disease
          </button>
        </div>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="w-1/2 p-4 overflow-y-auto space-y-6">

          {/* Disease Result */}
          <div className="bg-white p-4 rounded-xl shadow">
            <DiseaseResult result={result} />
          </div>

          {/* Suggestion Box */}
          <div className="bg-white p-4 rounded-xl shadow">
            <SuggestionBox suggestion={suggestion} />
          </div>
        </div>
      </div>
    </div>
  );
}
