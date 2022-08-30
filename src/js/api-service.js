// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.
// Pixabay API підтримує пагінацію і надає параметри page і per_page.Зроби так,
// щоб в кожній відповіді приходило 40 об'єктів (за замовчуванням 20).
import axios from 'axios';
const API_KEY = '11781399-d6d5af9a2b3424009791e8969';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQury) {
    this.searchQuery = newQury;
  }
}
