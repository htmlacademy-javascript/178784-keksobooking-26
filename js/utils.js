import { constants } from './constants.js';

function getRandomInteger(min, max) {
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max, decimalPlaces) {
  if (min < 0) {
    throw new Error('Aргумент min должен быть неотрицательным');
  }
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }

  const random = (Math.random() * (max - min + 1) + min);
  const fixed = random.toFixed(decimalPlaces);
  return +fixed;
}

function getRandomArray(sourceItems) {
  const length = getRandomInteger(1, sourceItems.length);
  const result = [];
  for(let i = 0; i < length; i++) {
    result.push(sourceItems[getRandomInteger(0, sourceItems.length - 1)]);
  }
  return [...new Set(result)];
}

function enableElement(element) {
  element.removeAttribute('disabled');
}

function disableElement(element) {
  element.setAttribute('disabled', true);
}

function enableElements(elements) {
  elements.forEach((element) => element.removeAttribute('disabled'));
}

function disableElements(elements) {
  elements.forEach((element) => element.setAttribute('disabled', true));
}

const alertElement = document.querySelector('.alert');

function showErrorAlert(message) {
  if (!alertElement.classList.contains('alert--error')) {
    alertElement.classList.add('alert--error');
  }
  if (alertElement.classList.contains(constants.HIDDEN_CLASS)) {
    alertElement.textContent = message;
    alertElement.classList.remove(constants.HIDDEN_CLASS);
    setTimeout(() => {
      alertElement.classList.add(constants.HIDDEN_CLASS);
    }, 4000);
  }
}

export { getRandomInteger, getRandomFloat, getRandomArray,
  enableElement, disableElement, enableElements, disableElements,
  showErrorAlert };
