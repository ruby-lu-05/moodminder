document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('switch');
  const blurButton = document.getElementById('blur-button');
  const hideButton = document.getElementById('hide-button');
  let extensionState = false;

  // Retrieve extension state from Chrome storage
  chrome.storage.local.get('extensionState', function (data) {
    extensionState = data.extensionState || false;
    updateToggleButton(extensionState);
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
    blurButton.classList.add('active');
    hideButton.classList.remove('active');
  });

  hideButton.addEventListener('click', function () {
    hideButton.classList.add('active');
    blurButton.classList.remove('active');
  });

  function updateToggleButton(state) {
    toggleButton.checked = state;
  }
});
