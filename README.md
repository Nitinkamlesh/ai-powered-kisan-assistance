# 🌾 AI-Powered Kisan Assistance Platform 🤖
### Agentic GenAI System for Smart & Sustainable Agriculture

<p align="center">
  <img src="assets/logo.png" alt="Kisan AI Logo" width="200"/>
</p>

<p align="center">
  <b>
    An end-to-end AI + GenAI powered agriculture intelligence platform that helps 
    farmers make accurate, timely, and language-friendly decisions.
  </b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GenAI-Agentic%20RAG-blueviolet?style=for-the-badge&logo=openai"/>
  <img src="https://img.shields.io/badge/Spring%20AI-Enabled-brightgreen?style=for-the-badge&logo=spring"/>
  <img src="https://img.shields.io/badge/Computer%20Vision-CNN-orange?style=for-the-badge&logo=tensorflow"/>
  <img src="https://img.shields.io/badge/Language-Hindi%20Voice-red?style=for-the-badge&logo=googletranslate"/>
  <img src="https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker"/>
</p>

<p align="center">
  <a href="#-project-overview">Overview</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-installation">Installation</a>
</p>

---

## 🚀 Project Overview

**AI-Powered Kisan Assistance Platform** is a **production-ready Agentic GenAI system** designed to empower farmers with intelligent, timely, and accessible agricultural assistance. Bridging the gap between complex agronomy data and rural farmers, we utilize **Agentic RAG** and **Voice AI** to deliver expert advice in Hindi.

### 🎥 Demo Video
[![Watch the video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://youtu.be/YOUR_VIDEO_LINK)
---

## 🚜 The Problem Statement

Farmers in India face severe crop losses and financial distress due to:
* ❌ **Late Disease Identification:** Lack of access to experts for immediate diagnosis.
* ❌ **Incorrect Pesticide Usage:** Overuse of chemicals damages soil health and increases costs.
* ❌ **Generic Advice:** Weather and soil conditions are hyper-local; generic advisories fail.
* ❌ **Language Barrier:** Most high-tech tools are in English, excluding the rural demographic.

> **Our Solution:** A single intelligent assistant combining **Computer Vision** (eyes), **LLMs** (brain), and **Voice AI** (speech) to guide farmers from diagnosis to dosage.

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
