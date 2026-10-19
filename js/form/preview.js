const previewImageElement = document.querySelector('.img-upload__preview img');

const showPreview = (file) => {
  previewImageElement.src = URL.createObjectURL(file);
};

export { showPreview };
