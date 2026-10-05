import { createComments } from './comment.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = [
  'Красивый закат над морем',
  'Прогулка по вечернему городу',
  'Мой любимый кот',
  'Отличный день на природе',
  'Незабываемое путешествие',
];

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const createPhotos = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export { createPhotos };
