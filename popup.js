document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('switch');
  const blurButton = document.getElementById('blur-button');
  const hideButton = document.getElementById('hide-button');
  let extensionState = false;
  let blur = true;

  // Retrieve extension state from Chrome storage
  chrome.storage.local.get('extensionState', function (data) {
    extensionState = data.extensionState || false;
    updateToggleButton(extensionState);
  });

  chrome.storage.local.get('blur', function (data) {
    blur = data.blur !== undefined ? data.blur : true;
  });

  toggleButton.addEventListener('change', function () {
    extensionState = toggleButton.checked;
    updateToggleButton(extensionState);

    // Save the updated extension state to Chrome storage
    chrome.storage.local.set({ 'extensionState': extensionState });

    // Send a message to background.js to update the state
    chrome.runtime.sendMessage({ extensionState: extensionState });
  });

  blurButton.addEventListener('click', function () {
    if (!blurButton.classList.contains('active')) {
      blurButton.classList.add('active');
      hideButton.classList.remove('active');
      blur = true;
      chrome.storage.local.set({ 'blur': blur });
      chrome.runtime.sendMessage({ blur: blur });
    }
  });

  hideButton.addEventListener('click', function () {
    if (!hideButton.classList.contains('active')) {
      hideButton.classList.add('active');
      blurButton.classList.remove('active');
      blur = false;
      chrome.storage.local.set({ 'blur': blur });
      chrome.runtime.sendMessage({ blur: blur });
    }
  });

  function updateToggleButton(state) {
    toggleButton.checked = state;
  }
});
