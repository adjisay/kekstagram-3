import { isEscapeKey } from '../utils.js';
import { resetValidation } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagInputElement.addEventListener('keydown', onFieldKeydown);
commentInputElement.addEventListener('keydown', onFieldKeydown);

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

  formElement.reset();
  resetValidation();
  resetScale();
  resetEffects();
}

export { openUploadForm, closeUploadForm };
