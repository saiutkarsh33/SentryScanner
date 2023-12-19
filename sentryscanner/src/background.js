chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.isPhishing) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['injectAlertBox.js'] // This is the bundled JSX component
    });
  }
});

