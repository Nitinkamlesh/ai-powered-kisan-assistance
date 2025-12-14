# 🌾 AI-Powered Kisan Assistance Platform 🤖  
### Agentic GenAI System for Smart & Sustainable Agriculture

<p align="center">
  <img src="assets/logo.png" alt="Kisan AI Logo" width="180"/>
</p>

<p align="center">
  <b>
    An end-to-end AI + GenAI powered agriculture intelligence platform that helps
    farmers make accurate, timely, and language-friendly decisions.
  </b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GenAI-Agentic%20RAG-blueviolet"/>
  <img src="https://img.shields.io/badge/Spring%20AI-Enabled-brightgreen"/>
  <img src="https://img.shields.io/badge/CNN-Computer%20Vision-orange"/>
  <img src="https://img.shields.io/badge/Language-Hindi%20Voice-red"/>
  <img src="https://img.shields.io/badge/Docker-Ready-blue"/>
</p>

---

## 🚀 Project Overview

**AI-Powered Kisan Assistance Platform** is a **production-ready Agentic GenAI system**
designed to empower farmers with **intelligent, timely, and accessible agricultural assistance**.

### 🌾 What the Platform Delivers
- 🌱 **Early crop disease detection** using Computer Vision  
- 💊 **Precise pesticide dosage recommendations** to prevent overuse  
- 🌦️ **Weather-aware risk alerts** for safe and effective spraying  
- 💬 **Conversational assistance in Hindi** via chat & voice AI  

### 🧠 Technology at the Core
This platform seamlessly integrates:
- Computer Vision (CNN)
- Agentic RAG (Retrieval-Augmented Generation)
- Large Language Models (LLMs)
- Voice AI  

into a **single intelligent agriculture assistant**, ensuring:
- ✅ Document-grounded answers  
- ✅ Accurate recommendations  
- ✅ Farmer-friendly explanations  

---

## 🚜 Problem Statement

Farmers face severe crop losses due to:

- ❌ Late disease identification  
- ❌ Incorrect pesticide dosage  
- ❌ Non-personalized advisory systems  
- ❌ Lack of regional language support  

> Existing solutions are **fragmented, non-AI, and non-interactive**.

---

## 🧠 System Flow (Agentic RAG Architecture)

flowchart TD

A[Crop Image Upload] --> B[CNN Disease Detection]

B -->|Healthy| C1[Healthy Crop]
B -->|Disease Detected| C2[Early / Late Blight]

C2 --> D[Agentic RAG Orchestrator]

subgraph RAG_PIPELINE [Agentic RAG Pipeline]
    D1[Query Rewriter Agent]
    D2[Qdrant Vector Retrieval]
    D3[LLM Answer Generator]
    D4[Critic & Validation Agent]

    D1 --> D2
    D2 --> D3
    D3 --> D4
end

D --> D1
D4 --> E[Treatment & Spray Dosage Engine]
E --> F[Weather Risk Advisory Engine]

F --> G[Web Dashboard - React]
F --> H[Hindi Voice Assistant - VAPI.ai]

G --> I[Farmer Decision Support]
H --> I



flowchart TD

A[📸 Image Upload]
B[🧠 CNN Detection]
C[🧠 Agentic RAG]
D[💊 Dosage Engine]
E[🌦️ Weather Engine]
F[🖥️ Web UI]
G[🎙️ Voice AI]
H[👨‍🌾 Farmer]

A --> B --> C --> D --> E
E --> F --> H
E --> G --> H

classDef vision fill:#FFE0B2,stroke:#E65100,stroke-width:2px;
classDef ai fill:#E1F5FE,stroke:#0277BD,stroke-width:2px;
classDef engine fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px;
classDef ui fill:#F3E5F5,stroke:#6A1B9A,stroke-width:2px;
classDef user fill:#FFFDE7,stroke:#F9A825,stroke-width:2px;

class A,B vision
class C ai
class D,E engine
class F,G ui
class H user


flowchart LR

subgraph Frontend
UI[React Web App]
end

subgraph Backend [Spring Boot Microservices]
IMG[Image Service]
CNN[CNN Prediction Service]
RAG[Agentic RAG Service]
DOS[Dosage Service]
WEA[Weather Service]
VOICE[Voice Webhook Service]
end

subgraph AI_Data
QDR[Qdrant Vector DB]
LLM[LLM Provider]
end

UI --> IMG
IMG --> CNN
CNN --> RAG
RAG --> QDR
RAG --> LLM
RAG --> DOS
DOS --> WEA
WEA --> UI

VOICE --> RAG
VOICE --> UI
