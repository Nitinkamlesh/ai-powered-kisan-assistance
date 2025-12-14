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
    subgraph User_Interaction
      A[📸 Image Upload] --> B[CNN Disease Detection]
      H[🎙️ Hindi Voice Input] --> I[Voice-to-Text]
    end

    subgraph Decision_Engine
      B -->|Disease Detected| C[Agentic RAG Orchestrator]
      I --> C
      
      C --> D1{Query Planner}
      D1 -->|Retrieve Info| D2[(Qdrant Vector DB)]
      D1 -->|Scientific Validation| D3[LLM Reasoner]
      
      D3 --> E[💊 Dosage Calculator Engine]
      D3 --> F[🌦️ Weather Risk Engine]
    end

    subgraph Output
      E --> G[Final Response Generator]
      F --> G
      G -->|Visual| UI[Web Dashboard]
      G -->|Audio| V[VAPI.ai Voice Output]
    end

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D2 fill:#bbf,stroke:#333,stroke-width:2px
    style B fill:#bfb,stroke:#333,stroke-width:2px
