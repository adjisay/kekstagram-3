import { createPhotos } from './photo.js';
import { renderPictures } from './picture-render.js';
import { openBigPicture } from './big-picture-render.js';

const photos = createPhotos();

renderPictures(photos, openBigPicture);
