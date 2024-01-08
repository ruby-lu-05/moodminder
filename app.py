from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    comment_text = data.get('comment')
    is_negative = True  # placeholder
    return jsonify({'is_negative': is_negative})

if __name__ == '__main__':
    app.run(debug=True)