document.addEventListener('DOMContentLoaded', function() {
    const applyChangesButton = document.getElementById('applyChanges');
  
    applyChangesButton.addEventListener('click', function() {
      const backgroundColor = document.getElementById('backgroundColor').value;
      const textColor = document.getElementById('textColor').value;
      const fontSize = document.getElementById('fontSize').value + 'px';
      const lineHeight = document.getElementById('lineHeight').value;
      const readingSpeed = document.getElementById('readingSpeed').value;
  
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applyChanges',
          styles: { backgroundColor, textColor, fontSize, lineHeight, readingSpeed }
        });
      });
    });
  });
  