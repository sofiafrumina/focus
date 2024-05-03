chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'applyChanges') {
      const { styles } = request;
  
      document.body.style.backgroundColor = styles.backgroundColor;
      document.body.style.color = styles.textColor;
      document.body.style.fontSize = styles.fontSize;
      document.body.style.lineHeight = styles.lineHeight;
  
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        paragraph.style.transition = `color ${styles.readingSpeed}s`;
      });
    }
  });

  // Если нужна замедленность прокрутки, добавьте следующий код:

// var scrollSpeed = styles.readingSpeed * 100; // Преобразование скорости в миллисекунды
// var pageHeight = document.body.scrollHeight;
// var scrollPosition = 0;

// function scroll() {
//   if (scrollPosition < pageHeight) {
//     window.scrollBy(0, 1);
//     scrollPosition++;
//     setTimeout(scroll, scrollSpeed);
//   }
// }

// scroll();