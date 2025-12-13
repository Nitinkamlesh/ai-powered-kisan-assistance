const API_BASE = "http://localhost:8080";

export async function analyzeAndSpray(disease, area, unit, pumpSize, pumpRequired) {
  const payload = {
    disease: disease,
    area: Number(area),
    unit: unit,
    pumpSize: Number(pumpSize),
    pumpRequired: Number(pumpRequired)
  };

  const res = await fetch(`${API_BASE}/api/spray/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
