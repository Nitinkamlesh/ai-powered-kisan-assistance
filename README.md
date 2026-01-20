<h1 align="center">🌾 AI-Powered Kisan Assistance Platform 🤖</h1>

<p align="center">
  <b>Agentic GenAI System for Smart & Sustainable Agriculture</b>
</p>

<p align="center">
  <img src="assets/logo.png" width="160" alt="Kisan AI Logo"/>
</p>

---

## 🎥 Demo Video
(Watch the platform in action – disease detection, AI advice & Hindi voice assistant)

[https://www.youtube.com/watch?v=uzGPuKBdA_c]

---


<p align="center">
  An end-to-end <b>GenAI-powered agriculture intelligence platform</b> helping farmers
  detect crop diseases early, optimize pesticide usage, and make
  <b>timely, language-friendly decisions</b>.
</p>

<p align="center">
  <a href="#-problem-statement">Problem</a> •
  <a href="#-solution">Solution</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-how-to-run-high-level">Setup</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GenAI-Agentic%20RAG-blueviolet"/>
  <img src="https://img.shields.io/badge/Spring%20AI-Enabled-brightgreen"/>
  <img src="https://img.shields.io/badge/CNN-Vision%2099%25-orange"/>
  <img src="https://img.shields.io/badge/Voice-Hindi-red"/>
  <img src="https://img.shields.io/badge/Docker-Ready-blue"/>
</p>

---


## 🚜 Problem Statement

Indian farmers face significant crop losses due to:

- ⏱️ **Late disease detection**
- 💊 **Incorrect pesticide dosage**
- 🌦️ **Ignoring weather risk during spraying**
- 🗣️ **Lack of advisory systems in regional languages**

❌ Existing solutions are fragmented, non-AI, and non-interactive.  
✅ Farmers need a **single intelligent assistant**, not multiple tools.


---


## 💡 Solution

The **AI-Powered Kisan Assistance Platform** delivers a unified, AI-driven solution that:

- 📸 Detects potato crop diseases directly from images
- 🧠 Generates **document-grounded treatment advice** using Agentic GenAI
- 💊 Calculates **exact pesticide dosage** based on field size
- 🌦️ Provides **weather-aware spray risk advisories**
- 🎙️ Enables **Hindi conversational support** via chat & voice AI


---

## ✨ Key Features

- 📸 Potato disease detection (Early & Late Blight) with **99%+ accuracy**
- 🧠 GenAI-based treatment recommendations using **Agentic RAG**
- 💊 Spray quantity calculation based on field size
- 🌦️ 24-hour weather-based disease risk prediction
- 💬 Memory-enabled AI chatbot for follow-up questions
- 🎙️ Hindi voice assistant using **VAPI.ai webhook-based tool calling**


---

## 🏆 Why This Is Different

✔️ Not a chatbot — an **Agentic AI system**  
✔️ Tool-calling + validation logic  
✔️ Domain-grounded agriculture intelligence  
✔️ Designed for real farmers, not demos
---

## 🛠️ Tech Stack

### 🧩 Backend
<p> <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/> <img src="https://img.shields.io/badge/Spring%20AI-00C853?style=for-the-badge&logo=spring&logoColor=white"/> <img src="https://img.shields.io/badge/Microservices-FF6F00?style=for-the-badge"/> <img src="https://img.shields.io/badge/REST%20APIs-005571?style=for-the-badge"/> </p>

| Technology        | Architectural Role        | Why It Matters                                |
| ----------------- | ------------------------- | --------------------------------------------- |
| **Spring Boot**   | Core backend framework    | Rapid development, production-ready APIs      |
| **Spring AI**     | GenAI orchestration layer | Clean integration of LLMs, RAG & tool-calling |
| **Microservices** | Modular service design    | Scalability, fault isolation, cloud readiness |
| **REST APIs**     | Service communication     | Frontend, voice AI & external integrations    |


### 🧠 AI / ML
<p> <img src="https://img.shields.io/badge/CNN-Computer%20Vision-orange?style=for-the-badge"/> <img src="https://img.shields.io/badge/LLMs-Generative%20AI-blueviolet?style=for-the-badge"/> <img src="https://img.shields.io/badge/Agentic%20RAG-Advanced%20GenAI-8E24AA?style=for-the-badge"/> </p>

| Technology                | Architectural Role              | Why It Matters                                       |
| ------------------------- | ------------------------------- | ---------------------------------------------------- |
| **CNN (Computer Vision)** | Disease detection engine        | Early & accurate crop disease identification         |
| **LLMs**                  | Reasoning & response generation | Human-like, explainable answers                      |
| **Agentic RAG**           | AI decision orchestrator        | Tool-calling, validation & document-grounded outputs |


### 🗄️ Data & Infrastructure
<p> <img src="https://img.shields.io/badge/Qdrant-Vector%20DB-FF5722?style=for-the-badge&logo=databricks&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white"/> </p>

| Technology             | Architectural Role           | Why It Matters                                 |
| ---------------------- | ---------------------------- | ---------------------------------------------- |
| **Qdrant (Vector DB)** | Semantic knowledge retrieval | Accurate, context-aware recommendations        |
| **Docker**             | Infrastructure packaging     | Consistent local, hackathon & cloud deployment |


### 🖥️ Frontend & Voice AI
<p> <img src="https://img.shields.io/badge/React.js-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/VAPI.ai-Hindi%20Voice%20AI-E53935?style=for-the-badge&logo=googleassistant&logoColor=white"/> </p>

| Technology   | Architectural Role | Why It Matters                                |
| ------------ | ------------------ | --------------------------------------------- |
| **React.js** | Web dashboard UI   | Real-time insights & farmer-friendly UX       |
| **VAPI.ai**  | Voice AI interface | Hindi conversational access via webhook tools |



---



## 🚀 How to Run (High-Level)

1. Clone the repository
2. Start backend services (Spring Boot)
3. Start frontend (React.js)
4. Run Qdrant using Docker
5. Access the application via browser

> ℹ️ Detailed setup steps can be added based on deployment environment.


---

## 🧠 System Architecture (Agentic RAG)

Unlike traditional chatbots, this platform uses an **Agentic RAG architecture** where
AI does not just answer questions — it **orchestrates tools** to:

- Validate pesticide dosage
- Check real-time weather conditions
- Retrieve scientific & agriculture documents
- Generate safe, explainable recommendations


```mermaid
flowchart TD
    %% Actors
    Farmer[👨‍🌾 Farmer / User]

    %% Frontend Layer
    subgraph Frontend [React JS Client]
        UI[Web Dashboard]
        VoiceUI[🎙️ VAPI.ai Voice Interface]
    end

    %% Backend Layer
    subgraph Backend [Spring Boot Microservices Cluster]
        Gateway[API Gateway / Controller]
        
        subgraph AI_Core [Spring AI Service]
            Agent[🤖 Agentic RAG Orchestrator]
            Prompt[Prompt Engineering Template]
        end
        
        subgraph Vision_Core [Computer Vision Service]
            CNN[🧠 CNN Model - 99% Acc]
            Classify[Disease Classifier: Early/Late Blight]
        end
        
        subgraph Tools [Agent Tools / Functions]
            WeatherTool[🌦️ 24h Weather Service]
            DosageTool[💊 Dosage Calculator]
        end
    end

    %% Data Layer
    subgraph Data [Data Persistence]
        Qdrant[(Qdrant Vector DB)]
        PDF_Know[📄 Ag PDF Knowledge Base]
    end

    %% Connections
    Farmer --> UI
    Farmer --> VoiceUI
    
    %% Voice Flow
    VoiceUI -->|Audio-to-Text| Gateway
    
    %% Image Flow
    UI -->|Upload Image| Gateway
    Gateway --> CNN
    CNN --> Classify
    Classify -->|Result: Late Blight| Agent

    %% Text/Chat Flow
    UI -->|Query| Gateway
    Gateway --> Agent
    
    %% Agentic RAG Logic (The Brain)
    Agent -->|1. Retrieve Context| Qdrant
    Qdrant -.->|Embeddings| PDF_Know
    
    Agent -->|2. Check Conditions| WeatherTool
    Agent -->|3. Calculate Medicine| DosageTool
    
    %% Tools providing info back to Agent
    WeatherTool -->|Rain Forecast| Agent
    DosageTool -->|Quantity: 200ml/acre| Agent

    %% Final Output
    Agent -->|Synthesized Answer| Gateway
    Gateway --> UI
    Gateway -->|Text-to-Speech| VoiceUI

    %% Styling
    classDef ai fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef vision fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;
    classDef tools fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef db fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;

    class Agent,Prompt ai;
    class CNN,Classify vision;
    class WeatherTool,DosageTool tools;
    class Qdrant,PDF_Know db;
```
## 🎯 Impact

This platform aims to:

- 🌾 Reduce crop losses
- 💊 Minimize chemical misuse
- 🌍 Promote sustainable farming
- 🗣️ Empower rural & non-English-speaking farmers with AI


---
## 👨‍💻 Author

**Nitin Kamlesh**  
Backend & GenAI Engineer

