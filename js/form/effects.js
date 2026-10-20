const DEFAULT_EFFECT = 'none';

const DEFAULT_SLIDER_OPTIONS = {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

const effectNameToSettings = {
  none: { filter: null },
  chrome: { filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', unit: '%', min: 0, max: 100, step: 1 },
  phobos: { filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1 },
  heat: { filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1 },
};

const previewImageElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

let currentEffect = effectNameToSettings[DEFAULT_EFFECT];

noUiSlider.create(sliderElement, DEFAULT_SLIDER_OPTIONS);

const applyEffectLevel = () => {
  if (!currentEffect.filter) {
    return;
  }

  const value = Number(sliderElement.noUiSlider.get());

  effectLevelValueElement.value = value;
  previewImageElement.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
};

const setEffect = (effectName) => {
  currentEffect = effectNameToSettings[effectName];

  if (!currentEffect.filter) {
    effectLevelContainerElement.classList.add('hidden');
    previewImageElement.style.filter = '';
    effectLevelValueElement.value = '';
    return;
  }

  effectLevelContainerElement.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: { min: currentEffect.min, max: currentEffect.max },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  applyEffectLevel();
};

const onEffectsListChange = (evt) => {
  setEffect(evt.target.value);
};

const onSliderUpdate = () => {
  applyEffectLevel();
};

const resetEffects = () => setEffect(DEFAULT_EFFECT);

sliderElement.noUiSlider.on('update', onSliderUpdate);
effectsListElement.addEventListener('change', onEffectsListChange);

resetEffects();

export { resetEffects };
