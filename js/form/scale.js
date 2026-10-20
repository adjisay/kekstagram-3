const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

const setScale = (value) => {
  currentScale = value;
  scaleValueElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / SCALE_MAX})`;
};

const onSmallerButtonClick = () => {
  setScale(Math.max(currentScale - SCALE_STEP, SCALE_MIN));
};

const onBiggerButtonClick = () => {
  setScale(Math.min(currentScale + SCALE_STEP, SCALE_MAX));
};

const resetScale = () => setScale(SCALE_DEFAULT);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
