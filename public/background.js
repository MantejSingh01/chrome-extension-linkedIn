// // Listen for messages from content script

// let modalOpen = false;

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, message);
//       });
//   if (message.type === "linkedin_company_page") {
//     // Set badge and execute scripts
//     chrome.action.setBadgeText({ text: "Active" });
//     chrome.action.setBadgeBackgroundColor({ color: "#00FF00" });

//     // Execute scripts
//     // chrome.scripting.executeScript({
//     //   target: { tabId: sender.tab.id },
//     //   files: [
//     //     "./static/js/main.a296798c.js",
//     //     "./static/js/453.277594b7.chunk.js",
//     //     "./static/js/453.277594b7.chunk.js.map",
//     //     "./static/js/main.a296798c.js.map",
//     //     "./static/js/main.a296798c.js.LICENSE.txt"
//     //   ]
//     // }, (result) => {
//     //   if (chrome.runtime.lastError) {
//     //     console.error(chrome.runtime.lastError.message);
//     //   } else {
//     //     console.log('Script executed successfully');
//     //   }
//     // });

//     // // Insert CSS
//     // chrome.scripting.insertCSS({
//     //   target: { tabId: sender.tab.id },
//     //   files: [
//     //     './static/css/main.d6d4e14d.css',
//     //     "./static/css/main.d6d4e14d.css.map"
//     //   ]
//     // }, (result) => {
//     //   if (chrome.runtime.lastError) {
//     //     console.error(chrome.runtime.lastError.message);
//     //   } else {
//     //     console.log('CSS inserted successfully');
//     //   }
//     // });
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "linkedin_company_page" ) {
 
    chrome.storage.local.set({ myKey: message }, () => {
      console.log("Data saved to Chrome storage");
    });
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  } 

  if (message.type === 'clean the storage') {
    chrome.storage.local.clear(function() {
      console.log('Local storage cleared');
    });
    
  }
});

