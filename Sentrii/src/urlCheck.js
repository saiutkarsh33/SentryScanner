const key = "features";
const value = window.location.href;

// Query URL
const baseUrl = "http://127.0.0.1:8000/predict/{feature}";
const url = `${baseUrl}?${key}=${encodeURIComponent(value)}`;

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.isPhishing) {
      chrome.runtime.sendMessage({ isPhishing: true });
    }
  })
  .catch((error) => {
    console.error("Request Error:", error);
  });
