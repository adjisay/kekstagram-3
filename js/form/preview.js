const IMAGE_MIME_PREFIX = 'image/';

const previewImageElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

const defaultPreviewSrc = previewImageElement.getAttribute('src');

let currentImageUrl = '';

const isImageFile = (file) => file.type.startsWith(IMAGE_MIME_PREFIX);

const showPreview = (file) => {
  currentImageUrl = URL.createObjectURL(file);

  previewImageElement.src = currentImageUrl;

  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = `url(${currentImageUrl})`;
  });
};

const resetPreview = () => {
  if (!currentImageUrl) {
    return;
  }

  URL.revokeObjectURL(currentImageUrl);
  currentImageUrl = '';

  previewImageElement.src = defaultPreviewSrc;

  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = '';
  });
};

export { isImageFile, showPreview, resetPreview };
