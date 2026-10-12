const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  HASHTAG_COUNT: `Превышено количество хэштегов (максимум ${MAX_HASHTAG_COUNT})`,
  HASHTAG_DUPLICATE: 'Хэштеги повторяются',
  COMMENT_LENGTH: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
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

const validateHashtagFormat = (value) => getHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const validateHashtagCount = (value) => getHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInputElement, validateHashtagFormat, ErrorText.INVALID_HASHTAG, 3, true);
pristine.addValidator(hashtagInputElement, validateHashtagCount, ErrorText.HASHTAG_COUNT, 2, true);
pristine.addValidator(hashtagInputElement, validateHashtagUnique, ErrorText.HASHTAG_DUPLICATE, 1, true);
pristine.addValidator(commentInputElement, validateComment, ErrorText.COMMENT_LENGTH);

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

export { validateForm, resetValidation };
