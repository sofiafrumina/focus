let extensionEnabled = true;

chrome.action.onClicked.addListener((tab) => {
  extensionEnabled =!extensionEnabled;
  updateBadgeText();
  toggleExtensionFunctionality();
});

function updateBadgeText() {
  chrome.action.setBadgeText({text: extensionEnabled? "ON" : "Off"});
}

function toggleExtensionFunctionality() {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'toggleFocus') {
      if (extensionEnabled) {
        // Assuming you have a function to inject the CSS
        injectCSS('focus.css');
      } else {
        // Assuming you have a function to remove the CSS
        removeCSS('focus.css');
      }
    }
  });
  
  function injectCSS(cssFile) {
    chrome.tabs.insertCSS(sender.tab.id, {file: chrome.runtime.getURL(cssFile)});
  }
  
  function removeCSS(cssFile) {
    chrome.tabs.executeScript(sender.tab.id, {
      code: `
        const stylesheets = document.querySelectorAll('link[href="${chrome.runtime.getURL(cssFile)}"]');
        stylesheets.forEach(sheet => sheet.remove());
      `
    });
  }
}




















// let extensionEnabled = true;
//  chrome.action.onClicked.addListener((tab) => {
//  if (extensionEnabled) {
//     // Disable the extension
//     chrome.browserAction.setBadgeText({text: "Off"});
//     // Add logic here to disable the extension's functionality
//     // For example, stop any background processes or remove content scripts
//     extensionEnabled = false;
//  } else {
//     // Enable the extension
//     chrome.browserAction.setBadgeText({text: "ON"});
//     // Add logic here to enable the extension's functionality
//     // For example, start any background processes or inject content scripts
//     extensionEnabled = true;
//  }
// });
//   chrome.action.onClicked.addListener((tab) => {
//     chrome.tabs.sendMessage(tab.id, { action: 'toggleFocus' });
//    });

//    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'injectCSS') {
//        chrome.tabs.insertCSS(sender.tab.id, { file: request.file });
//     } else if (request.action === 'removeCSS') {
//        // Removing CSS is a bit trickier since there's no direct API for it.
//        // You might need to keep track of injected stylesheets and remove them manually.
//        // This example assumes you're injecting a new stylesheet each time.
//        chrome.tabs.executeScript(sender.tab.id, {
//          code: `
//            const stylesheets = document.querySelectorAll('link[href="${chrome.runtime.getURL(request.file)}"]');
//            stylesheets.forEach(sheet => sheet.remove());
//          `
//        });
//     }
//    });