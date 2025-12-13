export default function DiseaseResult({ result }) {
  // If no result or missing fields, return nothing
  if (!result || !result.diseaseName || !result.confidence) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-green-100 rounded-xl">
      <h2 className="font-bold text-xl">
        Disease Detected: {result.diseaseName}
      </h2>
      <p>
        Confidence: {(Number(result.confidence) * 100).toFixed(2)}%
      </p>
    </div>
  );
}
