const form = document.querySelector('.img-upload__form'); //Форма загрузки нового изображения
const overlay = document.querySelector('.img-upload__overlay');//Окно формы редактирования нового изображения
const body = document.querySelector('body'); //body
const cancelButton = document.querySelector('#upload-cancel'); //Кнопка закрытия окна формы редактирования нового изображеня
const fileField = document.querySelector('#upload-file'); //Инпут для загрузки нового изображения
const hashtagField = document.querySelector('.text__hashtags'); //Поле для ввода нового хештега
const commentField = document.querySelector('.text__description'); //Поле для ввода нового комментария

//Константы для валидации
const MAX_HASHTAG_COUNT = 5; //Максимальное количество хештегов
const MIN_HASHTAG_LENGTH = 2; //Минимальная длина хештега
const MAX_HASHTAG_LENGTH = 20; //Максимальная длина хештега
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g; //Регулярное выражение

//Валидация по библиотеке Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

//Функция открытия окна редактирования нового изображения
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

//Функция закрытия окна для редактирования нового изображения
const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

//Функция, возвращающая true или false, если поля ввода хештегов и комментариев в фокусе
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

//Функция, которая указывает действия при нажатие на Esc
function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

//Функция, которую передаем в обработчик события для закрытия окна формы загрузки нового изображения
const onCancelButtonClick = () => {
  hideModal();
};

//Функция, которую передаем в обработчик события для открытия окна формы загрузки нового изображения
const onFileInputChange = () => {
  showModal();
};

//Стрелочная функция, которая принимает параметром строку, и проверяет первый символ на "#", возвращая true или false
const startsWithHash = (string) => string[0] === '#';

//Стрелочная функция, которая проверяет длину введеной строки
const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

//Функция, которая проверяет строку после символа "#" на разрешенные символы
const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

//Функция, которая проверяет на соответствие критериям введенный хештег
const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

//Функция, которая сверяет количество введенных хештегов с количеством в критериях
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

//Функция, которая возвращает true или false, сравнивая ???
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Функция, которая принимает значение
const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
