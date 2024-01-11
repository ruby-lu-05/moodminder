document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  let extensionState = false;

  // Retrieve extension state from Chrome storage
  chrome.storage.local.get('extensionState', function (data) {
      extensionState = data.extensionState || false;
      updateToggleButton(extensionState);
  });

  toggleButton.addEventListener('click', function () {
      extensionState = !extensionState;
      updateToggleButton(extensionState);

      // Save the updated extension state to Chrome storage
      chrome.storage.local.set({ 'extensionState': extensionState });

      // Send a message to background.js to update the state
      chrome.runtime.sendMessage({ extensionState: extensionState });
  });

  function updateToggleButton(state) {
      toggleButton.innerText = state ? 'OFF' : 'ON';
  }
});
