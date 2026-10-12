import { validateForm } from './validation.js';
import { openUploadForm, closeUploadForm } from './modal.js';

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');

const onFormSubmit = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

fileInputElement.addEventListener('change', openUploadForm);
cancelButtonElement.addEventListener('click', closeUploadForm);
formElement.addEventListener('submit', onFormSubmit);
