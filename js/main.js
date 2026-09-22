const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MAX_AVATAR_ID = 6;

const descriptions = [
  'Красивый закат над морем',
  'Прогулка по вечернему городу',
  'Мой любимый кот',
  'Отличный день на природе',
  'Незабываемое путешествие',
];

const names = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomMessage = () => {
  const firstMessage = getRandomArrayElement(messages);

  if (getRandomInteger(1, 2) === 1) {
    return firstMessage;
  }

  const secondMessage = getRandomArrayElement(messages);

  return `${firstMessage} ${secondMessage}`;
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_ID)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(names),
});

const createComments = () => Array.from({ length: getRandomInteger(0, MAX_COMMENTS) }, (_, index) => createComment(index + 1));

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const photos = Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

window.console.log(photos);
