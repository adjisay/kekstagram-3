const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const createPicture = (photo, onPictureClick) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = pictureElement.querySelector('.picture__img');

  pictureImageElement.src = photo.url;
  pictureImageElement.alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    onPictureClick(photo);
  });

  return pictureElement;
};

const clearPictures = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });
};

const renderPictures = (pictures, onPictureClick) => {
  clearPictures();

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPicture(picture, onPictureClick));
  });

  picturesContainerElement.append(fragment);
};

export { renderPictures };
