const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPicture = (photo, onPictureClick) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImageElement = pictureElement.querySelector('.picture__img');

  pictureImageElement.src = photo.url;
  pictureImageElement.alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', () => {
    onPictureClick(photo);
  });

  return pictureElement;
};

const renderPictures = (pictures, onPictureClick) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPicture(picture, onPictureClick));
  });

  picturesContainer.append(fragment);
};

export { renderPictures };
