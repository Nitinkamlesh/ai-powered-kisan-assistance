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

Farmers in India face significant crop losses and financial distress due to:
* ❌ **Late Disease Identification:** Lack of timely access to agricultural experts.
* ❌ **Incorrect Pesticide Dosage:** Guesswork leads to chemical overuse and soil damage.
* ❌ **Language Barriers:** Most advisory systems are not available in regional languages.
* ❌ **Static Information:** Generic chatbots lack real-time context like weather or field size.

> **The Solution:** A unified, Agentic AI platform that acts as a **Digital Agronomist**, combining Computer Vision (Sight), GenAI (Reasoning), and Voice (Speech) to guide farmers in Hindi.

---

## ✨ Key Features

### 1. 📸 Precision Disease Detection
* Custom **CNN Model** trained on potato leaf datasets.
* Detects **Early Blight** and **Late Blight** with **99%+ accuracy**.
* Provides instant visual feedback on crop health.

### 2. 🧠 Agentic RAG Advisory (The "Brain")
* Uses **Spring AI** to orchestrate an autonomous agent.
* **Document Grounded:** Retrieves treatment protocols from verified agricultural PDFs (stored in **Qdrant**).
* **Memory Enabled:** Remembers context across the conversation for follow-up queries.

### 3. 💊 Smart Dosage Engine
* Unlike generic tools, our system asks for the field size (acres/hectares).
* Calculates the **exact pesticide quantity** needed, minimizing cost and environmental impact.

### 4. 🌦️ Weather-Aware Risk Guard
* The Agent proactively checks **24-hour weather forecasts** before recommending sprays.
* *Scenario:* If rain is predicted, the AI warns the farmer to delay spraying to prevent washout.

### 5. 🎙️ Hindi Voice Assistant
* Integrated with **VAPI.ai** using **Webhook-based tool calling**.
* Farmers can speak naturally in Hindi (*"Mere aaloo mein keeda laga hai"*), and the system responds with voice audio powered by the backend knowledge base.

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
