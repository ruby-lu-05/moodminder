document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    let extensionState = false;
  
    chrome.storage.local.get('extensionState', function(data) {
      extensionState = data.extensionState || false;
      updateToggleButton(extensionState);
    });
  
    toggleButton.addEventListener('click', function() {
      extensionState = !extensionState;
      updateToggleButton(extensionState);
  
      chrome.storage.local.set({ 'extensionState': extensionState });
  
      // send message to background.js to update the state
      chrome.runtime.sendMessage({ extensionState: extensionState });
    });
  
    function updateToggleButton(state) {
      toggleButton.innerText = state ? 'ON' : 'OFF';
    }
  });
  