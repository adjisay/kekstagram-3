const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedString;
};

const getDigits = (string) => {
  const digits = String(string).replace(/\D/g, '');

  return digits ? Number(digits) : NaN;
};

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true

getDigits('2023 год'); // 2023
getDigits('ECMAScript 2022'); // 2022
getDigits('1 кефир, 0.5 батона'); // 105
getDigits('агент 007'); // 7
getDigits('а я томат'); // NaN
