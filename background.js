//ON OFF function
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

link = "https://www.reddit.com"
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(link)) {
    // retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'
    // set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "ON") {
      console.log('extension on');
      chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ['content.js'],
          });
      })
    } else if (nextState === "OFF") {
      console.log('extension not on')
      chrome.tabs.reload();
      //consider altering this to remove the blur/hide instead
    }
  }
});

// listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.comments) {
    const url = 'http://127.0.0.1:5000/analyze_sentiment';
    // send comments to Flask server
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
        // send sentiment analysis results to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { analysisResults: data.sentiment_analysis });
        });
      })
      .catch(error => console.error('Error:', error));
  }
});