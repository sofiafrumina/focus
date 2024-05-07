chrome.runtime.onInstalled.addListener(() => {
   chrome.action.setBadgeText({
     text: "OFF",
   });
 });

chrome.action.onClicked.addListener(async (tab) => {
 const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
 const extensionEnabled = prevState === 'ON';
 chrome.action.setBadgeText({tabId: tab.id, text: extensionEnabled ? "OFF" : "ON"});
 if (!extensionEnabled) {
   // Insert the CSS file when the user turns the extension on
   await chrome.scripting.insertCSS({
     files: ["content.css"],
     target: { tabId: tab.id },
   });
 } else {
   // Remove the CSS file when the user turns the extension off
   await chrome.scripting.removeCSS({
     files: ["content.css"],
     target: { tabId: tab.id },
   });
 }
});