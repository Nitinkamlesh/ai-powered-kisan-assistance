# AI-Powered Kisan Assistance Platform 🌾🤖

An end-to-end GenAI-powered agriculture assistance system designed to help farmers detect crop diseases early, optimize pesticide usage, and make informed decisions using AI-driven insights.

---

## 🚜 Problem Statement
Farmers often face significant crop losses due to late disease detection, incorrect pesticide dosage, and lack of timely, accessible agricultural advisory systems—especially in regional languages.

---

## 💡 Solution
The AI-Powered Kisan Assistance Platform provides a unified AI-driven solution that:
- Detects potato crop diseases from images
- Generates document-grounded treatment recommendations using GenAI
- Calculates exact pesticide dosage
- Provides weather-based risk advisories
- Enables conversational support via chatbot and Hindi voice assistant

---

## ✨ Key Features
- 📸 Potato disease detection (Early & Late Blight) with **99%+ accuracy**
- 🧠 GenAI-based treatment recommendations using **Agentic RAG**
- 💊 Spray quantity calculation based on field size
- 🌦️ 24-hour weather-based disease risk prediction
- 💬 Memory-enabled AI chatbot for follow-up queries
- 🎙️ Hindi voice assistant using **VAPI.ai webhook-based tool calling**

---

## 🛠️ Tech Stack
- **Backend:** Spring Boot, Spring AI, Microservices, REST APIs  
- **AI / ML:** CNN, LLMs, Agentic RAG  
- **Vector Database:** Qdrant  
- **Frontend:** React.js  
- **Voice AI:** VAPI.ai  
- **DevOps:** Docker  

---

## 🏗️ System Architecture
Image Upload → CNN Disease Detection →  
Agentic RAG (Qdrant + LLM) →  
Treatment & Advisory APIs →  
React UI / Hindi Voice Assistant

---

## 🚀 How to Run (High-Level)
1. Clone the repository  
2. Start backend services (Spring Boot)  
3. Start frontend (React.js)  
4. Configure vector database (Qdrant)  
5. Access the application via browser  

> Detailed setup steps can be added based on deployment environment.

---

## 🎯 Impact
This platform aims to reduce crop loss, minimize chemical misuse, and provide accessible AI-driven agricultural guidance to farmers, especially in rural and non-English-speaking regions.

---

## 👨‍💻 Author
**Nitin Kamlesh**  
Backend & GenAI Engineer  
