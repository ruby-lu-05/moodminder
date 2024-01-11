document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    let extensionState = false;
  
    chrome.storage.sync.get('extensionState', function(data) {
      extensionState = data.extensionState || false;
      updateToggleButton(extensionState);
    });
  
    toggleButton.addEventListener('click', function() {
      extensionState = !extensionState;
      updateToggleButton(extensionState);
  
      chrome.storage.sync.set({ 'extensionState': extensionState });
  
      // Send message to background.js to update the state
      chrome.runtime.sendMessage({ extensionState: extensionState });
    });
  
    function updateToggleButton(state) {
      toggleButton.innerText = state ? 'OFF' : 'ON';
    }
  });
  