from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    comments = data.get('comments', [])

    # perform sentiment analysis
    analysis_results = []
    for comment in comments:
        analysis = TextBlob(comment)
        polarity = analysis.sentiment.polarity
        is_negative = polarity < 0
        analysis_results.append({'comment': comment, 'is_negative': is_negative})

    return jsonify({'sentiment_analysis': analysis_results})

if __name__ == '__main__':
    app.run(debug=True)

# TESTING FOR INITIAL FLASK SERVER AND SENTIMENT ANALYSIS
# @app.route('/test', methods=['GET'])
# def test():
#     comment_text = "I love this video. It's amazing!"

#     payload = {'comment': comment_text}
#     response = app.test_client().post('/analyze_sentiment', json=payload, content_type = 'application/json')

#     if response.status_code == 200:
#         data = response.json
#         is_negative = data['is_negative']
#         if is_negative:
#             return "negative."
#         else:
#             return "not negative."
#     else:
#         return f"Error: {response.status_code}"



if __name__ == '__main__':
    app.run(debug=True)

