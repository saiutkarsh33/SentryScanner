chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.isPhishing) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: injectHTML,
    });
  }
});


function injectHTML() {
  // Create a container for the alert
  const customContainer = document.createElement('div');
  
  // Attach Shadow DOM to the container
  const shadowRoot = customContainer.attachShadow({ mode: 'open' });

  // Create a style element and add the CSS rules
  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial; /* This will reset the styling for everything inside the Shadow DOM */
      display: block; /* We need to set this to make the :host a block element */
    }
    .alert-box {
      position: fixed; 
      top: 20px; 
      right: 20px; 
      z-index: 2147483647; /* Use maximum value for z-index to ensure it's on top */
      background-color: #cc0000 !important; /* Slightly darker red */
      color: white !important; 
      text-align: center !important; 
      padding: 10px !important; 
      font-weight: normal !important; /* Default to normal and then specify bold for 'Warning' */
      border-radius: 5px !important;
      font-family: 'Arial', sans-serif !important;
      font-size: 16px !important; /* Standard text size */
      box-sizing: border-box !important;
      width: 250px !important; /* Adjust the width as needed */
      height: auto !important; /* Set height to auto to adjust for content */
    }
    .alert-box p {
      margin: 0 !important; /* Reset the margin for paragraphs */
      line-height: 1.6 !important;
    }
    .alert-box p strong {
      font-weight: bold !important; /* Bold for 'Warning' */
      font-size: 18px !important; /* Slightly larger text for 'Warning' */
    }
    .alert-box p span {
      text-decoration: underline !important; /* Underline 'malicious' and 'phishing' */
    }
    #closeButton {
      position: absolute !important; 
      top: 0 !important; 
      right: 0 !important; 
      cursor: pointer !important; 
      background: transparent !important; 
      border: none !important; 
      font-size: 20px !important; 
      color: white !important;
      line-height: 1 !important;
      padding: 5px !important; /* Add padding to make the button easier to click */
    }
`;


  // Create the alert box div and set its content
  const customHTML = document.createElement('div');
  customHTML.setAttribute('class', 'alert-box');
  customHTML.innerHTML = `
  <img
  src="${chrome.runtime.getURL('128x128.png')}"
  alt="Sentrii Logo"
  style="width: 50px; height: auto; margin-top: 10px;"
/>
    <p><strong>Warning:</strong> Sentrii detects <span>malicious</span> activity! This website may be a <span>phishing</span> site!</p>
    <button id="closeButton">&times;</button>
`;


  // Append the style and the alert box to the shadow root
  shadowRoot.appendChild(style);
  shadowRoot.appendChild(customHTML);

  // Insert the container at the beginning of the body
  document.body.insertBefore(customContainer, document.body.firstChild);

  // Add the click event listener to the close button
  shadowRoot.getElementById("closeButton").addEventListener("click", function () {
    customContainer.remove();
  });
}

