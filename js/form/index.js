import { sendData } from '../api.js';
import { showSuccessMessage, showErrorMessage } from '../messages.js';
import { validateForm } from './validation.js';
import { openUploadForm, closeUploadForm } from './modal.js';
import { showPreview } from './preview.js';

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }

  toggleSubmitButton(true);

  try {
    await sendData(new FormData(formElement));
    closeUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

const onFileInputChange = () => {
  showPreview(fileInputElement.files[0]);
  openUploadForm();
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

fileInputElement.addEventListener('change', onFileInputChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormSubmit);
