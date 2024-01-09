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

# @app.route('/test', methods=['GET'])
# def test():
#     comment_text = "I feel very neutral about this video"

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

