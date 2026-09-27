import { MIN_COMMENTS, MAX_COMMENTS, MIN_AVATAR_ID, MAX_AVATAR_ID, NAMES, MESSAGES } from './data.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

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
