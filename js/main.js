import { createPhotos } from './photo.js';
import { renderPictures } from './picture.js';

const photos = createPhotos();

renderPictures(photos);

window.console.log(photos);
