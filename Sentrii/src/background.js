chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.isPhishing) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: injectHTML,
    });
  }
});

function injectHTML() {
  const customHTML = document.createElement("div");
  customHTML.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
        <div style="background-color: red; color: white; text-align: center; padding: 10px; font-weight: bold; border-radius: 5px;">
            <p>Warning: This website may be a phishing site!</p>
            <button id="closeButton" style="position: absolute; top: 5px; right: 5px; cursor: pointer; background: transparent; border: none; font-size: 20px; color: white;">&times;</button>
        </div>
    </div>
    `;

  document.body.appendChild(customHTML);

  document.getElementById("closeButton").addEventListener("click", function () {
    customHTML.remove();
  });
}
