import axios from "axios";

const API_URL = "http://localhost:8080/api/analyze";

export const analyzeDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // backend returns: { class, confidence }
  return {
    diseaseName: res.data.class,       // convert to React-friendly field
    confidence: res.data.confidence
  };
};
