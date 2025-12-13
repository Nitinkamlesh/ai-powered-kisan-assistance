export default function SuggestionBox({ suggestion }) {
  if (!suggestion || suggestion.trim().length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-blue-100 rounded-xl">
      <h2 className="font-bold text-xl mb-2">Suggestions</h2>
      <pre className="whitespace-pre-wrap text-gray-800">
        {suggestion}
      </pre>
    </div>
  );
}
