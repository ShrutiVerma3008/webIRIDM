
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_logic import get_bot_response

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    reply = get_bot_response(user_input)
    return jsonify({"response": reply})

if __name__ == "__main__":
    app.run(debug=True)
