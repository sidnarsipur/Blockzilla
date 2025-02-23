from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
# Enable CORS for all origins without restrictions
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


@app.route("/getBlockedWords", methods=["GET", "OPTIONS"])
def get_blocked_words():
    blocked_words = []
    rules_ref = db.collection("rules").where("enabled", "==", True)
    rules = rules_ref.stream()

    for rule in rules:
        blocked_words.extend(rule.to_dict().get("blockedWords", []))

    return jsonify(blocked_words), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
