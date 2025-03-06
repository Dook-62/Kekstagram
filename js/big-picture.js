const bigPicture = document.querySelector('.big-picture'); //элемент для полноэкранного отображения изображения
const commentCount = document.querySelector('.social__comment-count'); //Элемент счетчика комментариев
const commentList = document.querySelector('.social__comments'); //Блок, куда вставляются комментарии
const commentsLoader = document.querySelector('.comments-loader'); //Блок загрузки новых комментариев
const body = document.querySelector('body'); //Присвоили тег body
const cancelButton = document.querySelector('.big-picture__cancel'); //Кнопка закрытия режима полноэкранного просмотра

//Функции для создания комментария и наполнения его данными
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

//Функция для добавления комментариев в блок
const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);
};

//Функция, закрывающая полноэкранный режим
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

//Функция-обработчик, отлавливающая нажатие ESC
function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

//Функция-обработчик, для нажатия кнопки "закрыть"
const onCancelButtonClick = () => {
  hideBigPicture();
};

//Функция, отображающая детали изображения
const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

//Функция для показа полноэкранного режима
const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};

