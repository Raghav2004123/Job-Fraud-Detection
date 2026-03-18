from flask import Flask, request, jsonify
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from lime.lime_text import LimeTextExplainer
import numpy as np
import re
import os
from flask_cors import CORS


app = Flask(__name__)
# Replace your current CORS(app) with this:
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})


MAX_LEN = 150 


try:
    model = tf.keras.models.load_model("job_fraud_model_full.keras")
    with open("tokenizer_full.pkl", "rb") as f:
        tokenizer = pickle.load(f)
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
  
TECHNICAL_KEYWORDS = [
    "developer", "programmer", "software", "engineer", "frontend", "backend",
    "fullstack", "web development", "python", "java", "javascript", "react", 
    "angular", "nodejs", "devops", "docker", "kubernetes", "cloud", "aws", 
    "azure", "gcp", "database", "sql", "api", "data structure", "algorithm", 
    "machine learning", "deep learning", "artificial intelligence", "data scientist",
    "data analyst", "data engineer", "network", "cybersecurity", "information security",
    "technical support", "system administrator", "architecture", "git", "ci/cd",
    "golang", "swift", "kotlin", "ruby", "c++", "c#", "scala", "typescript", 
    "microservices", "agile", "scrum", "product owner", "quality assurance",
    "qa tester", "ux/ui", "design system", "salesforce developer", "sap basis",
    "erp", "vulnerability", "penetration testing", "blockchain", "iot",
    "firmware", "embedded", "virtualization", "storage","ai","ml"
]

NON_TECHNICAL_KEYWORDS = [
    "sales", "marketing", "hr", "recruitment", "customer service", "support",
    "cashier", "receptionist", "front office", "data entry", "clerk", 
    "administration", "operations", "business development", "field work",
    "assistant", "manager", "cleaner", "chef", "waiter", "cook", 
    "delivery", "driver", "teacher", "trainer", "counselor", "hospitality",
    "retail", "store", "fashion", "beauty", "accounting", "finance", 
    "auditor", "sales executive", "content writer", "copywriter", 
    "digital marketing", "telecaller", "bpo", "insurance", "real estate",
    "paralegal", "legal", "journalist", "editor", "procurement", "logistics", 
    "supply chain", "warehouse", "factory", "manufacturing", "project coordinator",
    "office assistant", "executive assistant", "public relations", "pr manager",
    "social media", "campaign manager", "human resources", "payroll",
    "bookkeeper", "tax preparation", "event planning", "client relations"
]


def classify_job_type_and_extract_keywords(text):
    """
    Analyzes text against keyword lists to determine job category and return 
    the list of keywords actually found in the text.
    """
    text_lower = text.lower()
    
   
    found_tech_keywords = [
        kw for kw in TECHNICAL_KEYWORDS 
        if re.search(r"\b" + re.escape(kw) + r"\b", text_lower)
    ]
    
   
    found_nontech_keywords = [
        kw for kw in NON_TECHNICAL_KEYWORDS 
        if re.search(r"\b" + re.escape(kw) + r"\b", text_lower)
    ]

    tech_count = len(found_tech_keywords)
    nontech_count = len(found_nontech_keywords)

    if tech_count > nontech_count + 1:
        category = "Technical"
    elif nontech_count > tech_count + 1:
        category = "Non-Technical"
    else:
        category = "Mixed"

    return category, found_tech_keywords, found_nontech_keywords


def predict_proba(texts):
    if isinstance(texts, str):
        texts = [texts]
    sequences = tokenizer.texts_to_sequences(texts)
    sequences = [[0] if not seq else seq for seq in sequences]
    padded = pad_sequences(sequences, maxlen=MAX_LEN) 
    preds = model.predict(padded, verbose=0) 
    return np.hstack((1 - preds, preds)) 


@app.route("/")
def home():
    return jsonify({"status": "Backend is healthy and CORS is active"}), 200


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("description", "")
    
 
    probabilities = predict_proba(text)[0]
    prob_fake = probabilities[1]
    
    result = "Fake" if prob_fake > 0.11 else "Real"
    
  
    job_type, found_tech_keywords, found_nontech_keywords = classify_job_type_and_extract_keywords(text)

    explainer = LimeTextExplainer(class_names=["Real", "Fake"])
    exp = explainer.explain_instance(text, predict_proba, num_features=10)
    lime_explanation = [{"word": w, "weight": float(score)} for w, score in exp.as_list()]

    return jsonify({
        "prediction": result,
        "probability": float(prob_fake),
        "job_type": job_type,
        "lime_explanation": lime_explanation,
        
        "technical_keywords_list": found_tech_keywords,
        "non_technical_keywords_list": found_nontech_keywords
    })


if __name__ == "__main__":
    # Render provides a 'PORT' environment variable. 
    # If it's not there (like on your laptop), it defaults to 5000.
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)