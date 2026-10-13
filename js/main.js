import { getData } from './api.js';
import { renderPictures } from './picture-render.js';
import { openBigPicture } from './big-picture-render.js';
import { showDataError } from './messages.js';
import './form/index.js';

getData()
  .then((photos) => {
    renderPictures(photos, openBigPicture);
  })
  .catch(showDataError);
