from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
# Enable CORS for all origins
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "OPTIONS"],
            "allow_headers": ["Content-Type", "Accept", "Origin"],
            "expose_headers": ["Access-Control-Allow-Origin"],
            "supports_credentials": False,
        }
    },
)

# Initialize Firebase
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


@app.route("/getBlockedWords", methods=["GET", "OPTIONS"])
def get_blocked_words():
    if request.method == "OPTIONS":
        # Handle preflight request
        response = jsonify({"status": "ok"})
    else:
        blocked_words = []
        rules_ref = db.collection("rules")
        rules = rules_ref.stream()

        for rule in rules:
            blocked_words.extend(rule.to_dict().get("blockedWords", []))
        response = jsonify(blocked_words)

    # Ensure CORS headers are set
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Accept")
    response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    return response, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
