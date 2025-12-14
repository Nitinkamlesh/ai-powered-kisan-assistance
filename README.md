# 🌾 AI-Powered Kisan Assistance Platform 🤖
### Agentic GenAI System for Smart & Sustainable Agriculture

<p align="center">
  <img src="assets/logo.png" alt="Kisan AI Logo" width="180"/>
  </p>

<p align="center">
  <b>
    An end-to-end GenAI-powered agriculture assistance system helping farmers detect 
    crop diseases early, optimize pesticide usage, and make informed decisions.
  </b>
</p>

<p align="center">
  <a href="#-demo-video">View Demo</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Setup</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GenAI-Agentic%20RAG-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Spring%20AI-Enabled-brightgreen?style=for-the-badge&logo=spring"/>
  <img src="https://img.shields.io/badge/Vision-CNN%2099%25-orange?style=for-the-badge&logo=tensorflow"/>
  <img src="https://img.shields.io/badge/Voice-VAPI.ai-red?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-green?style=for-the-badge&logo=springboot"/>
</p>

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

## 🧠 System Architecture

We utilize an **Agentic RAG (Retrieval-Augmented Generation)** approach where the AI doesn't just "chat"—it orchestrates tools to validate dosage, check weather, and retrieve scientific data.

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
