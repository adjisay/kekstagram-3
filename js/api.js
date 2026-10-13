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

const request = async (route, errorText, options = {}) => {
  const response = await fetch(`${BASE_URL}${route}`, options);

  if (!response.ok) {
    throw new Error(errorText);
  }

  return response;
};

const getData = async () => {
  const response = await request(Route.GET_DATA, ErrorText.GET_DATA);

  return response.json();
};

const sendData = (body) =>
  request(Route.SEND_DATA, ErrorText.SEND_DATA, { method: Method.POST, body });

export { getData, sendData };
