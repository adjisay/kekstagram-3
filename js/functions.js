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

const isMeetingWithinWorkingHours = (startWork, endWork, startMeeting, duration) => {
  const [ startWorkHours, startWorkMinutes ] = startWork.split(':').map(Number);
  const [ endWorkHours, endWorkMinutes ] = endWork.split(':').map(Number);
  const [ startMeetingHours, startMeetingMinutes ] = startMeeting.split(':').map(Number);

  const startWorkTime = startWorkHours * 60 + startWorkMinutes;
  const endWorkTime = endWorkHours * 60 + endWorkMinutes;
  const startMeetingTime = startMeetingHours * 60 + startMeetingMinutes;
  const endMeetingTime = startMeetingTime + duration;

  return startMeetingTime >= startWorkTime && endMeetingTime <= endWorkTime;
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

isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900); // false
