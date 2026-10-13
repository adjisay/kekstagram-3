const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму',
};

const request = (route, errorText, options = {}) =>
  fetch(`${BASE_URL}${route}`, options).then((response) => {
    if (!response.ok) {
      throw new Error(errorText);
    }

    return response;
  });

const getData = () =>
  request(Route.GET_DATA, ErrorText.GET_DATA).then((response) => response.json());

const sendData = (body) =>
  request(Route.SEND_DATA, ErrorText.SEND_DATA, { method: Method.POST, body });

export { getData, sendData };
