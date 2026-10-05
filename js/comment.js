import { getRandomInteger, getRandomArrayElement } from './util.js';

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const NAMES = [
  'Александр',
  'Евгения',
  'Руслан',
  'Татьяна',
  'Максим',
  'Светлана',
  'Артём',
  'Мария',
  'Иван',
  'Анна',
  'Дмитрий',
  'Екатерина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
];


const getRandomMessage = () => {
  const firstMessage = getRandomArrayElement(MESSAGES);

  if (getRandomInteger(1, 2) === 1) {
    return firstMessage;
  }

  const secondMessage = getRandomArrayElement(MESSAGES);

  return `${firstMessage} ${secondMessage}`;
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, (_, index) => createComment(index + 1));

export { createComments };
