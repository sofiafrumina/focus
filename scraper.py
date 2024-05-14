import os
import requests
from bs4 import BeautifulSoup

# URL репозитория с фильтрами
repo_url = "https://github.com/mtxadmin/ublock/tree/master/filters"

# Путь к папке, куда будут сохранены фильтры
output_folder = "resources"

# Создаем папку, если она еще не существует
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Получаем HTML-страницу репозитория
response = requests.get(repo_url)
soup = BeautifulSoup(response.text, 'html.parser')

# Находим все ссылки на файлы без расширений
file_links = soup.find_all('a', class_='js-navigation-open Link--primary')

# Фильтруем ссылки, оставляем только те, которые ведут на файлы без расширений
filtered_links = [link['href'] for link in file_links if not link['href'].endswith('.txt')]

# Загружаем и сохраняем содержимое каждого файла в папку output_folder
for link in filtered_links:
    file_url = f"https://github.com{link}"
    response = requests.get(file_url)
    file_content = response.content  # Используем.content для получения байт-кода
    file_name = link.split('/')[-1]
    with open(os.path.join(output_folder, file_name), 'wb') as f:  # Используем 'wb' для записи байт-кода
        f.write(file_content)

print("Файлы успешно сохранены в папку resources.")
