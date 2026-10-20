import { getRandomInteger, debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');

let activeButtonElement = filtersFormElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

const getRandomPhotos = (photos) => {
  const shuffledPhotos = [...photos];
  const count = Math.min(RANDOM_PHOTOS_COUNT, shuffledPhotos.length);

  for (let i = shuffledPhotos.length - 1; i >= shuffledPhotos.length - count; i--) {
    const j = getRandomInteger(0, i);
    [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]];
  }

  return shuffledPhotos.slice(-count);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const filterIdToPhotosGetter = {
  [FilterId.DEFAULT]: (photos) => [...photos],
  [FilterId.RANDOM]: getRandomPhotos,
  [FilterId.DISCUSSED]: getDiscussedPhotos,
};

const initFilters = (photos, renderFilteredPictures) => {
  const renderDebounced = debounce((filterId) => {
    renderFilteredPictures(filterIdToPhotosGetter[filterId](photos));
  }, RERENDER_DELAY);

  const onFiltersFormClick = (evt) => {
    const buttonElement = evt.target.closest('.img-filters__button');

    if (!buttonElement || buttonElement.classList.contains(ACTIVE_BUTTON_CLASS)) {
      return;
    }

    activeButtonElement.classList.remove(ACTIVE_BUTTON_CLASS);
    buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
    activeButtonElement = buttonElement;

    renderDebounced(buttonElement.id);
  };

  filtersFormElement.addEventListener('click', onFiltersFormClick);
  filtersElement.classList.remove('img-filters--inactive');
};

export { initFilters };
