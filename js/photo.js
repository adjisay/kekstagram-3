import { PHOTOS_COUNT, MIN_LIKES, MAX_LIKES, DESCRIPTIONS } from './data.js';
import { createComments } from './comment.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const createPhotos = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export { createPhotos };
