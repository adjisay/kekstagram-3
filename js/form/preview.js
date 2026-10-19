const previewImageElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

const showPreview = (file) => {
  const imageUrl = URL.createObjectURL(file);

  previewImageElement.src = imageUrl;

  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = `url(${imageUrl})`;
  });
};

export { showPreview };
