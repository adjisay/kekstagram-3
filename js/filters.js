import { getRandomInteger } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');

const getRandomPhotos = (photos) => {
  const shuffledPhotos = [...photos];

  for (let i = shuffledPhotos.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]];
  }

  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const getFilteredPhotos = {
  [FilterId.DEFAULT]: (photos) => [...photos],
  [FilterId.RANDOM]: getRandomPhotos,
  [FilterId.DISCUSSED]: getDiscussedPhotos,
};

const initFilters = (photos, renderFilteredPictures) => {
  const onFiltersFormClick = (evt) => {
    const buttonElement = evt.target.closest('.img-filters__button');

    if (!buttonElement || buttonElement.classList.contains(ACTIVE_BUTTON_CLASS)) {
      return;
    }

    filtersFormElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`).classList.remove(ACTIVE_BUTTON_CLASS);
    buttonElement.classList.add(ACTIVE_BUTTON_CLASS);

    renderFilteredPictures(getFilteredPhotos[buttonElement.id](photos));
  };

  filtersFormElement.addEventListener('click', onFiltersFormClick);
  filtersElement.classList.remove('img-filters--inactive');
};

export { initFilters };
