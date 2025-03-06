//Функция, возвращающая целое положительное число из указанного диапозона
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, проверяющая длину строки
const checkStringLength = (string, length) => string.length <= length;

//Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement };
