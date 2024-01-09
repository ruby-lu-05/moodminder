from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    comment_text = data.get('comment')

    analysis = TextBlob(comment_text)
    polarity = analysis.sentiment.polarity

    is_negative = polarity < 0

    return jsonify({'is_negative': is_negative})

if __name__ == '__main__':
    app.run(debug=True)