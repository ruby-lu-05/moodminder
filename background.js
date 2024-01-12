console.log('background script loaded');

let extensionState = false;
let blurred = true;

chrome.storage.local.get(['extensionState', 'blurred'], function (data) {
    extensionState = data.extensionState || false;
    blurred = data.blurred || true;
});

chrome.runtime.onInstalled.addListener(() => {
    // set the initial extension state in Chrome storage
    chrome.storage.local.set({ 'extensionState': extensionState });
    chrome.storage.local.set({ 'blurred': blurred });
});

// listen for messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.extensionState !== undefined) {
        // update the extension state and save it to Chrome storage
        extensionState = message.extensionState;
        chrome.storage.local.set({ 'extensionState': extensionState });

        // execute content script in the active tab
        executeContentScript();
    }

    if (message.blurred !== undefined) {
        // update the extension state and save it to Chrome storage
        blurred = message.blurred;
        chrome.storage.local.set({ 'blurred': blurred });

        // execute content script in the active tab
        executeContentScript();
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
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // check if the tab is fully loaded and the extension is enabled
    if (changeInfo.status === 'complete' && tab.active) {
        // Execute content script when the tab is updated and the extension is enabled
        executeContentScript(tabId);
        console.log('execute content script');
    }
});

// Function to execute content script in the active tab
function executeContentScript(tabId) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Execute content script in the specified tab or the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabId || tabs[0].id },
            files: ['content.js'],
        });
    });
}
