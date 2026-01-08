#Job Fraud Detection System using Deep Learning & Explainable AI

This project implements an **intelligent job fraud detection system** that analyzes job descriptions and classifies them as **Real** or **Fake** using a **Deep Learning (LSTM) model** with **Explainable AI (LIME)** support.  
It also provides a **full-stack web application** with a **Flask backend** and **Next.js frontend**.

---

##Problem Statement
Online job portals are increasingly exploited by fraudsters who post fake job advertisements to scam users.  
This project aims to **automatically detect fraudulent job postings** and **explain the prediction** in a transparent and user-friendly manner.

---

## 🎯 Objectives
- Detect fraudulent job postings with high accuracy  
- Provide explainable predictions using **LIME**  
- Build a user-friendly web interface  
- Enable real-time job description analysis  
- Ensure scalability and industry relevance  

---

## 🧠 Model & Algorithms Used

### 🔹 Primary Model
- **LSTM (Long Short-Term Memory Neural Network)**  
  - Handles long textual job descriptions
  - Captures contextual and sequential information
  - Outperforms traditional ML models on text data

### 🔹 Supporting Techniques
- **Tokenization & Padding**
- **Word Embedding**
- **Binary Classification (Sigmoid activation)**

### 🔹 Explainability
- **LIME (Local Interpretable Model-Agnostic Explanations)**  
  - Highlights keywords influencing predictions
  - Improves trust and transparency

---


---

## 🗂️ Dataset
- **Source:** Job postings dataset  
- **File Used:** `clean_fakejobs.csv`
- **Key Columns:**
  - `text` → Job description
  - `fraudlucent` → Label (0 = Real, 1 = Fake)

### Dataset Split
- **Training:** 80%
- **Testing:** 20%

---

## 📊 Performance Metrics
The model is evaluated using:
- **Accuracy**
- **Precision**
- **Recall**
- **F1-Score**
- **ROC-AUC**
- **Confusion Matrix**

> Achieved accuracy of approximately **98–99%**, outperforming traditional ML baselines.

---

## 🌐 Tech Stack

### 🔹 Backend
- Python
- Flask
- TensorFlow / Keras
- LIME
- Scikit-learn

### 🔹 Frontend
- Next.js
- React
- Tailwind CSS

### 🔹 Tools
- Git & GitHub
- VS Code
- Postman (API testing)
- -Google colab

---

## 🚀 Features
- Real-time job description analysis
- Fraud probability score
- Explainable predictions (keyword importance)
- Technical / Non-Technical job classification
- Interactive web UI
- Performance metrics dashboard

---

## 🧪 Testing
- **Unit Testing:** Tokenization, prediction pipeline
- **Integration Testing:** Frontend–Backend API communication
- **System Testing:** End-to-end job detection workflow

---

## 🏭 Industry Relevance
- Recruitment platforms
- HR analytics
- Cybersecurity & fraud prevention
- Online marketplaces
- Government employment portals

---

## 📜 License
This project is for academic and research purposes.


