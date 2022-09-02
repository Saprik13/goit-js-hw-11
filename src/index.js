import './css/style.css';
import { makeCardsMarkup } from './js/render-gallery';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

const refs = {
  cardsContainer: document.querySelector('.gallery'),
};

const searchForm = new LoadMoreBtn({
  selector: '.search-form',
});

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const fetchImg = new ApiService();

searchForm.showForm();

searchForm.refs.button.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();
  fetchImg.query = e.currentTarget.elements.searchQuery.value.trim();
  if (fetchImg.query === '') {
    return Notify.warning(`Please, enter your request in the input field`);
  }

  loadMoreBtn.show();
  fetchImg.resetPage();
  clearCardsContainer();
  searchForm.hideForm();
  fetchHits();
}

async function fetchHits() {
  loadMoreBtn.disable();
  try {
    const res = await fetchImg.fetchArticles();

    if (res.hits.length === 0) {
      Notify.failure(
        `We're sorry, but you've reached the end of search results: ${fetchImg.query}. Please try again.`
      );
      loadMoreBtn.hide();
      searchForm.showForm();
      return;
    }

    if (fetchImg.page === 2) {
      Notify.success(`Hooray! We found ${res.totalHits} images.`);
      searchForm.showForm();
    }

    appendCardsMarkup(res.hits);
    lightbox.refresh();

    if (fetchImg.page > Math.ceil(res.totalHits / res.hits.length)) {
      console.log(Math.round(res.totalHits / res.hits.length));
      Notify.failure(
        `We're sorry, but you've reached the end of search results`
      );
      loadMoreBtn.hide();
      return;
    }

    loadMoreBtn.enable();
    searchForm.showForm();
  } catch (error) {
    console.log(error);
  }
}

function appendCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', makeCardsMarkup(hits));
}
function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}
