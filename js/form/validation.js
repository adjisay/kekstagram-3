const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_SYMBOLS_PATTERN = /^#[a-zа-яё0-9]+$/i;

const ErrorText = {
  HASHTAG_START: 'Хэштег должен начинаться с символа #',
  HASHTAG_ONLY_HASH: 'Хэштег не может состоять только из символа #',
  HASHTAG_SYMBOLS: 'Хэштег может содержать только буквы и цифры, хэштеги разделяются пробелами',
  HASHTAG_LENGTH: `Максимальная длина хэштега — ${MAX_HASHTAG_LENGTH} символов, включая #`,
  HASHTAG_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  HASHTAG_DUPLICATE: 'Один и тот же хэштег нельзя использовать дважды',
  COMMENT_LENGTH: `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`,
};

const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtagCount = (value) => getHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagStart = (value) => getHashtags(value).every((tag) => tag.startsWith('#'));

const validateHashtagNotOnlyHash = (value) => getHashtags(value).every((tag) => tag !== '#');

const validateHashtagSymbols = (value) => getHashtags(value).every((tag) => HASHTAG_SYMBOLS_PATTERN.test(tag));

const validateHashtagLength = (value) => getHashtags(value).every((tag) => tag.length <= MAX_HASHTAG_LENGTH);

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInputElement, validateHashtagStart, ErrorText.HASHTAG_START, 6, true);
pristine.addValidator(hashtagInputElement, validateHashtagNotOnlyHash, ErrorText.HASHTAG_ONLY_HASH, 5, true);
pristine.addValidator(hashtagInputElement, validateHashtagSymbols, ErrorText.HASHTAG_SYMBOLS, 4, true);
pristine.addValidator(hashtagInputElement, validateHashtagLength, ErrorText.HASHTAG_LENGTH, 3, true);
pristine.addValidator(hashtagInputElement, validateHashtagCount, ErrorText.HASHTAG_COUNT, 2, true);
pristine.addValidator(hashtagInputElement, validateHashtagUnique, ErrorText.HASHTAG_DUPLICATE, 1, true);
pristine.addValidator(commentInputElement, validateComment, ErrorText.COMMENT_LENGTH);

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

export { validateForm, resetValidation };
