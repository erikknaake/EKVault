declare let window;

export function getTabs() {
  if (window.chrome != null && window.chrome.tabs != null) {
    return window.chrome.tabs;
  } else { // For ease of testing
    return {
      query: (queryInfo, callback: (result) => void) => {
        callback([{url: "http://www.example.com"}]);
      }
    };
  }
}
