const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const createPicture = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureElementImage = pictureElement.querySelector('.picture__img');

  pictureElementImage.src = url;
  pictureElementImage.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPicture(picture));
  });

  picturesContainer.append(fragment);
};

export { renderPictures };
