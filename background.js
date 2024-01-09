console.log('Background script loaded!');

// listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.comments) {
    // send comments to Flask server
    fetch('http://127.0.0.1:5000/analyze_sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: message.comments }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Received sentiment analysis:', data);
        // send sentiment analysis results to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { analysisResults: data });
        });
      })
      .catch(error => console.error('Error:', error));
  }
});