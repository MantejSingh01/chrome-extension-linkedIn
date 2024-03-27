if (window.location.href.includes('linkedin.com/company/')) {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    const href = window.location.href;
    const element = document.querySelector(".org-top-card-summary__title");
    const textContent = element ? element.textContent.trim() : null;
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
  
    if (!window.location.href.includes('linkedin.com/company/')) {

      chrome.storage.local.clear(function() {
        console.log('Local storage cleared');
      });
      chrome.runtime.sendMessage({ type: 'clean the storage'});
    } else {
      const href = window.location.href;
  
      const element = document.querySelector(".org-top-card-summary__title");
      const textContent = element ? element.textContent.trim() : null;
  
      if (href && textContent) {
        chrome.runtime.sendMessage({ type: 'linkedin_company_page', href, textContent });
      }
    }
  }

  const observer = new MutationObserver(handleUrlChange);

  const observerOptions = {
    childList: true,
    subtree: true
  };

  observer.observe(document.body, observerOptions);
 
  handleUrlChange();
  
  
 
  