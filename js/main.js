import { getData } from './api.js';
import { renderPictures } from './picture-render.js';
import { openBigPicture } from './big-picture-render.js';
import { showDataError } from './messages.js';
import './form/index.js';

const init = async () => {
  try {
    const photos = await getData();
    renderPictures(photos, openBigPicture);
  } catch {
    showDataError();
  }
};

init();
