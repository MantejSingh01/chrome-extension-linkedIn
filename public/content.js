if (window.location.href.includes('linkedin.com/company/')) {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
  
    // Get the window href
    const href = window.location.href;
  
    // Find the DOM element and get its text content
    const element = document.querySelector(".org-top-card-summary__title");
    const textContent = element ? element.textContent.trim() : null;
  
    // Send message to background script with window href and text content
    if (href && textContent) {
      chrome.runtime.sendMessage({ type: 'linkedin_company_page', href, textContent });
    }


  }
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    
    chrome.storage.local.set({ myKey: message }, function() {
        console.log("Data saved to Chrome storage");
      });
  });
  function handleUrlChange() {
  // Check if the current URL is a LinkedIn company page
  if (!window.location.href.includes('linkedin.com/company/')) {
    // Clear local storage
    chrome.storage.local.clear(function() {
      console.log('Local storage cleared');
    });
    chrome.runtime.sendMessage({ type: 'clean the storage'});
  } else {
    const href = window.location.href;

    // Find the DOM element and get its text content
    const element = document.querySelector(".org-top-card-summary__title");
    const textContent = element ? element.textContent.trim() : null;

    // Send message to background script with window href and text content
    if (href && textContent) {
      chrome.runtime.sendMessage({ type: 'linkedin_company_page', href, textContent });
    }
  }
}

// Create a MutationObserver to observe changes in the URL
const observer = new MutationObserver(handleUrlChange);

// Define the options for the observer
const observerOptions = {
  childList: true,
  subtree: true
};

// Observe changes in the <body> element
observer.observe(document.body, observerOptions);

// Initial check for URL change
handleUrlChange();

  
 
  