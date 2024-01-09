// listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.analysisResults) {
      handleSentimentAnalysisResults(message.analysisResults);
    }
  });
  
  function handleSentimentAnalysisResults(results) {
    results.forEach(commentData => {
      const commentElement = findCommentElementByContent(commentData.comment);
      if (commentElement && commentData.is_negative) {
        commentElement.style.filter = 'blur(4px)';
        // or option two hide comments, add function for user to choose between the two options later
        // commentElement.style.display = 'none';
      }
    });
  }
  
  function findCommentElementByContent(commentContent) {
    const commentElements = document.querySelectorAll('.content-text'); 
    for (let i = 0; i < commentElements.length; i++) {
      const currentCommentText = commentElements[i].textContent;
      if (currentCommentText.includes(commentContent)) {
        return commentElements[i];
      }
    }
    return null;
  }