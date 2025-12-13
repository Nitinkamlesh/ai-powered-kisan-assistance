const API_URL = "http://localhost:8080/api/suggestion";

// Generic streaming caller
export async function streamSuggestion(message, onChunk) {
  const response = await fetch(
    `${API_URL}?message=${encodeURIComponent(message)}`
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
}

// Symptoms
export async function getSymptoms(name, onChunk) {
  return streamSuggestion(`${name} Symptoms and Signs`, onChunk);
}

// Medicines
export async function getMedicines(name, onChunk) {
  return streamSuggestion(`${name} All Medicines`, onChunk);
}

// Spray Schedule
export async function getSpraySchedule(name, onChunk) {
  return streamSuggestion(`${name} Spray Schedule`, onChunk);
}

// Precautions
export async function getPrecautions(name, onChunk) {
  return streamSuggestion(`${name} All precautions`, onChunk);
}
