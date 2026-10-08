import { isEscapeKey } from './utils.js';

const COMMENTS_PER_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const socialComments = bigPictureElement.querySelector('.social__comments');
const bigPictureButtonCancel = bigPictureElement.querySelector('.big-picture__cancel');

const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
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
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const renderComments = () => {
  const commentsToShow = currentComments.slice(0, shownCommentsCount);

  socialComments.innerHTML = '';

  commentsToShow.forEach((comment) => {
    socialComments.append(createCommentElement(comment));
  });

  commentShownCountElement.textContent = commentsToShow.length;
  commentTotalCountElement.textContent = currentComments.length;

  if (commentsToShow.length >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;

  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_PER_STEP, currentComments.length);

  commentCountElement.classList.remove('hidden');

  renderComments();
};

const onCommentsLoaderClick = () => {
  shownCommentsCount += COMMENTS_PER_STEP;

  renderComments();
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureButtonCancel.addEventListener('click', () => {
  closeBigPicture();
  document.removeEventListener('keydown', onDocumentKeydown);
});

export { openBigPicture };
