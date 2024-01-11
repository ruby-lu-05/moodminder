console.log('background script loaded')

let extensionState = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'extensionState': extensionState });
});

// listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.extensionState !== undefined) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        });
    });
  }

  if (message.comments) {
    const url = 'http://127.0.0.1:5000/analyze_sentiment';
    // Send comments to Flask server
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: message.comments }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Send sentiment analysis results to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { analysisResults: data.sentiment_analysis });
        });
      })
      .catch(error => console.error('Error:', error));
  }
});
