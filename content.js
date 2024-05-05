let isEnabled = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 if (request.action === 'toggleFocus') {
    isEnabled = !isEnabled;
    if (isEnabled) {
      // Inject the stylesheet
      chrome.runtime.sendMessage({ action: 'injectCSS', file: 'focus.css' });
    } else {
      // Remove the stylesheet
      chrome.runtime.sendMessage({ action: 'removeCSS', file: 'focus.css' });
    }
 }
});
// `document.querySelector` may return null if the selector doesn't match anything.
const article = document.querySelector("article");
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}