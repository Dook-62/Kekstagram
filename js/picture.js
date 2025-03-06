import { showBigPicture } from './big-picture.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPicture = (data) => {
  const { comments, description, likes, url } = data;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); //Создаем "черный ящик" в DOM
  pictures.forEach((picture) => { //метод forEach применяет функцию к каждому объекту в массиве
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement); //Добавляем во фрагмент объект, заполненный данными
  });

  container.append(fragment); //Добавляем наш "черный ящик" в контейнер
};

export { renderPictures };
