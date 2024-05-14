// background.js

// Функция для чтения содержимого файла filters.txt
async function readFiltersFile() {
  try {
    // Здесь мы предполагаем, что filters.txt находится в той же директории, что и background.js
    const response = await fetch(chrome.runtime.getURL('filters.txt'));
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Ошибка при чтении файла filters.txt:', error);
    return '';
  }
}

// Функция для применения фильтров из файла filters.txt
async function applyFiltersFromFile() {
  try {
    // Читаем содержимое файла filters.txt
    const filtersText = await readFiltersFile();
    // Разделяем текст файла по строкам
    const filters = filtersText.split('\n');
    // Применяем каждый фильтр
    filters.forEach(async (filter) => {
      // Игнорируем пустые строки и комментарии
      if (filter.trim() && !filter.trim().startsWith('#')) {
        // Создаем объект фильтра
        const filterOptions = {
          urls: ['<all_urls>'],
          types: ['main_frame', 'sub_frame'],
        };
        // Добавляем обработчик события onBeforeRequest для блокировки запросов, соответствующих фильтру
        chrome.webRequest.onBeforeRequest.addListener(
          () => ({ cancel: true }),
          filterOptions,
          ['blocking']
        );
      }
    });
    console.log('Фильтры из файла filters.txt успешно применены.');
  } catch (error) {
    console.error('Ошибка при применении фильтров из файла filters.txt:', error);
  }
}

// Вызываем функцию применения фильтров при установке расширения
chrome.runtime.onInstalled.addListener(applyFiltersFromFile);

// Функция для установки значка расширения при установке
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// Обработчик нажатия на кнопку расширения
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const extensionEnabled = prevState === 'ON';
  chrome.action.setBadgeText({tabId: tab.id, text: extensionEnabled ? "OFF" : "ON"});
  if (!extensionEnabled) {
    // Включение расширения: вставляем CSS файл
    await chrome.scripting.insertCSS({
      files: ["content.css"],
      target: { tabId: tab.id },
    });
  } else {
    // Выключение расширения: удаляем CSS файл
    await chrome.scripting.removeCSS({
      files: ["content.css"],
      target: { tabId: tab.id },
    });
  }
});
