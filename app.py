from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app, origins="chrome-extension://iobpegidgaikaooclpomdpplcffiablb")

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    comments = data.get('comments', [])
    sentiment = SentimentIntensityAnalyzer()

    # perform sentiment analysis 
    analysis_results = []
    for comment in comments:
        analysis = sentiment.polarity_scores(comment)
        compound = analysis.get('compound')
        # from scoring system of vader, compound score of less than -0.05 is deemed 'negative'
        is_negative = (compound <= -0.55)

        analysis_results.append({'comment': comment, 'is_negative': is_negative})

    return jsonify({'sentiment_analysis': analysis_results})

if __name__ == '__main__': 
    app.run(debug=True)
