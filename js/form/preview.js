const IMAGE_MIME_PREFIX = 'image/';

const previewImageElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

const defaultPreviewSrc = previewImageElement.getAttribute('src');

let currentImageUrl = '';

const isImageFile = (file) => file.type.startsWith(IMAGE_MIME_PREFIX);

const setEffectPreviewsBackground = (value) => {
  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = value;
  });
};

const showPreview = (file) => {
  currentImageUrl = URL.createObjectURL(file);

  previewImageElement.src = currentImageUrl;

  setEffectPreviewsBackground(`url("${currentImageUrl}")`);
};

const resetPreview = () => {
  if (!currentImageUrl) {
    return;
  }

  URL.revokeObjectURL(currentImageUrl);
  currentImageUrl = '';

  previewImageElement.src = defaultPreviewSrc;

  setEffectPreviewsBackground('');
};

export { isImageFile, showPreview, resetPreview };
