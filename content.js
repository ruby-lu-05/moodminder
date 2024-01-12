var isMousePressed = false;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event) {
  const clickedComment = event.target;

  if (clickedComment.tagName.toLowerCase() === 'p') {
    isMousePressed = true;
    toggleUnblurOnComment(clickedComment);
  }
}

function handleMouseUp() {
  isMousePressed = false;
}

// mutationObserver to detect changes in the DOM
observer = new MutationObserver(() => {
  // handle the changes (e.g., check for new comments)
  handleButtonClick();
});

// configuration of the observer
observerConfig = {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
};

// start observing the target node for changes
observer.observe(document.body, observerConfig);

// handling button clicks
function handleButtonClick() {
  const comments = extractComments();

  // send the updated comments to the background script
  chrome.runtime.sendMessage({ reloadContentScript: true });
  chrome.runtime.sendMessage({ comments: comments});
}

document.addEventListener('click', event => {
  // console.log('clicked')
  handleButtonClick();
});

//extract comments with the <p> tag
function extractComments() {
  const comments = [];
  const commentElements = document.querySelectorAll('p');

  commentElements.forEach(commentElement => {
    // console.log(commentElement.textContent)
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
    if (commentElement && commentData.is_negative && window.location.hostname.includes('reddit.com')) {
      chrome.storage.local.get(["extensionState"]).then((is_on) => {
        if (is_on.extensionState) {
          chrome.storage.local.get(["blurred"]).then((is_blur) => {
            if (is_blur.blurred) {
              commentElement.style.display = 'inline';
              commentElement.style.filter = 'blur(4px)';
            } else {
              commentElement.style.filter = 'blur(0px)';
              commentElement.style.display = 'none';
            }});
        } else {
          chrome.storage.local.get(["blurred"]).then((is_blur) => {
            if (is_blur.blurred) {
              commentElement.style.display = 'inline';
              commentElement.style.filter = 'blur(0px)';
            } else {
              commentElement.style.display = 'inline';
              commentElement.style.filter = 'blur(0px)';
            }});
        }
      });
    }
  });
}

function findCommentElementByContent(commentContent) {
  const commentElements = document.querySelectorAll('p');
  // console.log('matched comment elements:', commentElements);
  for (let i = 0; i < commentElements.length; i++) {
    const currentCommentText = commentElements[i].textContent;
    if (currentCommentText.includes(commentContent)) {
      return commentElements[i];
    }
  }
  return null;
}

function toggleUnblurOnComment(commentElement) {
  chrome.storage.local.get(["extensionState"], (is_on) => {
    if (is_on.extensionState) {
      if (isMousePressed) {
        commentElement.style.filter = 'blur(0px)';
      } else {
        commentElement.style.filter = 'blur(4px)';
      }
    }
  });
}