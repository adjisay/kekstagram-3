import { sendData } from '../api.js';
import { showSuccessMessage } from '../messages.js';
import { validateForm } from './validation.js';
import { openUploadForm, closeUploadForm } from './modal.js';

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const setSubmitButtonDisabled = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }

  setSubmitButtonDisabled(true);

  sendData(new FormData(formElement))
    .then(() => {
      closeUploadForm();
      showSuccessMessage();
    })
    .finally(() => setSubmitButtonDisabled(false));
};

fileInputElement.addEventListener('change', openUploadForm);
cancelButtonElement.addEventListener('click', closeUploadForm);
formElement.addEventListener('submit', onFormSubmit);
