import { isEscapeKey } from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  HASHTAG_COUNT: `Превышено количество хэштегов (максимум ${MAX_HASHTAG_COUNT})`,
  HASHTAG_DUPLICATE: 'Хэштеги повторяются',
  COMMENT_LENGTH: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
};

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtagFormat = (value) => getHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const validateHashtagCount = (value) => getHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInputElement, validateHashtagFormat, ErrorText.INVALID_HASHTAG, 3, true);
pristine.addValidator(hashtagInputElement, validateHashtagCount, ErrorText.HASHTAG_COUNT, 2, true);
pristine.addValidator(hashtagInputElement, validateHashtagUnique, ErrorText.HASHTAG_DUPLICATE, 1, true);
pristine.addValidator(commentInputElement, validateComment, ErrorText.COMMENT_LENGTH);

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function openUploadForm() {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  // сбросим все поля, чтобы change сработал при выборе того же файла
  formElement.reset();
  pristine.reset();
}

hashtagInputElement.addEventListener('keydown', onFieldKeydown);
commentInputElement.addEventListener('keydown', onFieldKeydown);

fileInputElement.addEventListener('change', openUploadForm);
cancelButtonElement.addEventListener('click', closeUploadForm);

formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
