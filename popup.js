document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('switch');
  const blurButton = document.getElementById('blur-button');
  const hideButton = document.getElementById('hide-button');
  let extensionState = false;
  let blurred = true;

  chrome.storage.local.get(['extensionState', 'blurred'], function (data) {
    extensionState = data.extensionState || false;
    blurred = data.blurred || true;

    // Update toggle button state
    updateToggleButton(extensionState);

    if (blurred) {
      blurButton.classList.add('active');
      hideButton.classList.remove('active');
    } else {
      hideButton.classList.add('active');
      blurButton.classList.remove('active');
    }
    chrome.storage.local.set({ 'blurred': blurred });
    chrome.runtime.sendMessage({ blurred: blurred });
  });

  toggleButton.addEventListener('change', function () {
    extensionState = toggleButton.checked;
    updateToggleButton(extensionState);
    chrome.storage.local.set({ 'extensionState': extensionState });
    chrome.runtime.sendMessage({ extensionState: extensionState });
  });

  blurButton.addEventListener('click', function () {
    blurButton.classList.add('active');
    hideButton.classList.remove('active');
    blurred = true;
    chrome.storage.local.set({ 'blurred': blurred });
    chrome.runtime.sendMessage({ blurred: blurred });
  });

  hideButton.addEventListener('click', function () {
    hideButton.classList.add('active');
    blurButton.classList.remove('active');
    blurred = false;
    chrome.storage.local.set({ 'blurred': blurred });
    chrome.runtime.sendMessage({ blurred: blurred });
  });

  function updateToggleButton(state) {
    toggleButton.checked = state;
  }
});
