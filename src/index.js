import './css/style.css';
const axios = require('axios').default;
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './js/api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchBtn: document.querySelector('button'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryBox: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
let imgsArray = [];
let gallery = null;
let totalHits = null;

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryBox.addEventListener('click', onGalleryItemClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  clearImgContainer();
  imagesApiService.query = evt.currentTarget.elements.query.value;
  if (imagesApiService.query === '') {
    Notiflix.Notify.warning(`Please, enter your request in the input field`, {
      timeout: 4000,
    });
    return;
  } else {
    imagesApiService.resetPage();
    try {
      const data = await imagesApiService.fetchImages();
      totalHits = data.totalHits;

      imgsArray = data.hits;

      if (imgsArray.length === 0) {
        showMessage();
      } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`, {
          timeout: 4000,
        });
        appendImagesMarkup(imgsArray);
        newSimpleLightbox();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function onLoadMore() {
  imagesApiService.incrementPage();
  try {
    const data = await imagesApiService.fetchImages();
    imgsArray = data.hits;
    if (imgsArray.length < 40) {
      Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`,
        {
          timeout: 4000,
        }
      );
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.galleryBox.insertAdjacentHTML(
      'beforeend',
      renderGalleryMarkup(imgsArray)
    );
    refreshSimpleLightbox();
  } catch (error) {
    return console.log(error);
  }
}

function clearImgContainer() {
  refs.galleryBox.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}

function appendImagesMarkup(array) {
  refs.galleryBox.insertAdjacentHTML('beforeend', renderGalleryMarkup(array));
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function showMessage() {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
    {
      timeout: 4000,
    }
  );
}

function renderGalleryMarkup(images) {
  return images
    .map(
      image =>
        `<div class="photo-card">
    <a class="gallery-item" href="${image.largeImageURL}"><img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
    <div class="info">
    <p class="info-item ">
        <b>Likes: </b>${image.likes}
    </p>
    <p class="info-item ">
        <b>Views: </b>${image.views}
    </p>
    <p class="info-item ">
        <b>Comments: </b>${image.comments}
    </p>
    <p class="info-item ">
        <b>Downloads: </b>${image.downloads}
    </p>
    </div></div>`
    )
    .join('');
}

function onGalleryItemClick(event) {
  event.preventDefault();
  const isGalleryImage = event.target.classList.contains('gallery-img');
  if (!isGalleryImage) {
    return;
  }
}

function newSimpleLightbox() {
  gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function refreshSimpleLightbox() {
  gallery.refresh();
}
