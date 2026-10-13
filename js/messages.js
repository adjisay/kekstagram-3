const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const showDataError = () => {
  const dataErrorElement = dataErrorTemplateElement.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export { showDataError };
