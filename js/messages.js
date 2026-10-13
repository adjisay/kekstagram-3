import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const showDataError = () => {
  const dataErrorElement = dataErrorTemplateElement.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const showMessage = (templateElement, buttonSelector) => {
  const messageElement = templateElement.cloneNode(true);

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown, true);
  }

  const onMessageClick = (evt) => {
    if (evt.target === messageElement || evt.target.matches(buttonSelector)) {
      closeMessage();
    }
  };

  messageElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
  document.body.append(messageElement);
};

const showSuccessMessage = () => showMessage(successTemplateElement, '.success__button');
const showErrorMessage = () => showMessage(errorTemplateElement, '.error__button');

export { showDataError, showSuccessMessage, showErrorMessage };
