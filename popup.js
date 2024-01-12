document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('switch');
  const blurButton = document.getElementById('blur-button');
  const hideButton = document.getElementById('hide-button');
  const buttons = document.getElementById('buttons-container');
  const onOff = document.getElementById('on-off');
  const note = document.getElementById('note');
  const error = document.getElementById('error');
  const popupWindow = document.getElementById('popup');
  let extensionState = false;
  let blurred = true;

  function updateUI(tab) {
    if (tab.url.includes('reddit.com')) {
      buttons.style.display = 'flex';
      onOff.style.display = 'flex';
      note.style.display = 'inline';
      error.style.display = 'none';
      popupWindow.style.height = '380px';
    } else {
      buttons.style.display = 'none';
      onOff.style.display = 'none';
      note.style.display = 'none';
      error.style.display = 'inline';
      popupWindow.style.height = '240px';
    }
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    updateUI(tabs[0]);
  });

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
