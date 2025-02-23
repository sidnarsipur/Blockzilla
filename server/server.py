from flask import Flask, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
import logging

app = Flask(__name__)
# Enable CORS for all origins without restrictions
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("key.json")
initialize_app(cred)

db = firestore.client()

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/getBlockedWords", methods=["GET", "OPTIONS"])
def get_blocked_words():
    logging.debug("Received request for /getBlockedWords")
    blocked_words = []
    try:
        rules_ref = db.collection("rules")
        rules = rules_ref.stream()

        for rule in rules:
            blocked_words.extend(rule.to_dict().get("blockedWords", []))

        logging.debug(f"Blocked words retrieved: {blocked_words}")
        return jsonify(blocked_words), 200
    except Exception as e:
        logging.error(f"Error retrieving blocked words: {e}")
        return jsonify({"error": "Failed to retrieve blocked words"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
