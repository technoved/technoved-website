import json
import os
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# ===============================
# LOAD CHATBOT FAQ FILE
# ===============================
FAQ_PATH = os.path.join("data", "chatabot.json")

with open(FAQ_PATH, "r", encoding="utf-8") as f:
    faq_data = json.load(f)

# ===============================
# ROUTES
# ===============================
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "msg").lower()

    for item in faq_data:
        for keyword in item["keywords"]:
            if keyword in user_msg:
                return jsonify({"reply": item["answer"]})

    return jsonify({
        "reply": "Sorry, I didn't understand that. Please try another question."
    })

if __name__ == "__main__":
    app.run(debug=True)
