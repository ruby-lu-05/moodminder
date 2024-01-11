//extract comments with the <p> tag
function extractComments() {
  const comments = [];
  const commentElements = document.querySelectorAll('p');

  commentElements.forEach(commentElement => {
    console.log(commentElement.textContent)
    comments.push(commentElement.textContent);
  });

  return comments;
}

// send extracted comments to the background script
chrome.runtime.sendMessage({ comments: extractComments() });

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
      commentElement.style.filter = 'blur(6px)';
      // option2 hide comments, add function for user to choose between the options later using the extension interface
      // commentElement.style.display = 'none';
    }
  });
}

function findCommentElementByContent(commentContent) {
  const commentElements = document.querySelectorAll('p');
  console.log('matched comment elements:', commentElements);
  for (let i = 0; i < commentElements.length; i++) {
    const currentCommentText = commentElements[i].textContent;
    if (currentCommentText.includes(commentContent)) {
      return commentElements[i];
    }
  }
  return null;
}

