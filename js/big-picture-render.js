import { isEscapeKey } from './utils.js';

const COMMENTS_PER_STEP = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const renderNextComments = () => {
  const nextCount = Math.min(shownCommentsCount + COMMENTS_PER_STEP, currentComments.length);
  const fragment = document.createDocumentFragment();

  currentComments.slice(shownCommentsCount, nextCount).forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  socialCommentsElement.append(fragment);
  shownCommentsCount = nextCount;

  commentShownCountElement.textContent = shownCommentsCount;
  commentTotalCountElement.textContent = currentComments.length;
  commentsLoaderElement.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;

  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;

  currentComments = comments;
  shownCommentsCount = 0;
  socialCommentsElement.innerHTML = '';

  renderNextComments();
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { openBigPicture };
