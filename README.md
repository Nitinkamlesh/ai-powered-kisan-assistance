# AI-Powered Kisan Assistance Platform 🌾🤖

🌾 AI-Powered Kisan Assistance Platform
Agentic GenAI System for Smart & Sustainable Agriculture
<p align="center"> <img src="assets/logo.png" alt="Kisan AI Logo" width="180"/> </p> <p align="center"> <b>An end-to-end AI + GenAI powered agriculture intelligence platform helping farmers make accurate, timely, and language-friendly decisions.</b> </p> <p align="center"> <img src="https://img.shields.io/badge/GenAI-Agentic%20RAG-blueviolet"/> <img src="https://img.shields.io/badge/Spring%20AI-Enabled-brightgreen"/> <img src="https://img.shields.io/badge/CNN-Computer%20Vision-orange"/> <img src="https://img.shields.io/badge/Language-Hindi%20Voice-red"/> <img src="https://img.shields.io/badge/Docker-Ready-blue"/> </p>

🚀 Project Overview

AI-Powered Kisan Assistance Platform is a production-ready GenAI system designed to support farmers with early crop disease detection, precise pesticide guidance, weather-aware risk alerts, and conversational assistance in Hindi.

This platform integrates Computer Vision, Agentic RAG, LLMs, and Voice AI into a single intelligent agriculture assistant.

🚜 Problem Statement

Farmers face severe crop losses due to:

Late disease identification

Incorrect pesticide dosage

Non-personalized advisory systems

Lack of regional language support

❌ Existing solutions are fragmented, non-AI, and non-interactive.

---

flowchart TD
    A[📸 Farmer Uploads Crop Image] --> B[🧠 CNN Disease Detection Model]

    B -->|Healthy| C1[✅ Crop is Healthy]
    B -->|Early / Late Blight| C2[⚠️ Disease Identified]

    C2 --> D[🧠 Agentic RAG System]

    subgraph Agentic_RAG [🤖 Agentic RAG Pipeline]
        D1[🔍 Query Rewriter Agent]
        D2[📚 Qdrant Vector Search]
        D3[🧠 LLM Answer Generator]
        D4[✅ Critic / Validation Agent]
        D1 --> D2 --> D3 --> D4
    end

    D --> Agentic_RAG
    Agentic_RAG --> E[💊 Treatment & Spray Dosage Engine]
    E --> F[🌦️ Weather Risk Advisory Engine]

    F --> G[🖥️ React Web Dashboard]
    F --> H[🎙️ Hindi Voice Assistant (VAPI.ai)]

    G --> I[👨‍🌾 Farmer Decision Support]
    H --> I


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
📸 Image Upload
      ↓
🧠 CNN Disease Detection
      ↓
🧠 Agentic RAG Pipeline
   ├─ Query Rewriter
   ├─ Qdrant Vector Search
   ├─ LLM Answer Generator
   └─ Critic Agent
      ↓
💊 Treatment + Dosage APIs
      ↓
🌦️ Weather Risk Engine
      ↓
🖥️ React UI / 🎙️ Hindi Voice Assistant


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
