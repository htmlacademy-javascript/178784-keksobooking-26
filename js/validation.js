import { Constants } from './constants.js';

const form = document.querySelector(Constants.FORM_SELECTOR);
const capacitySelect = form.querySelector(Constants.CAPACITY_SELECTOR);
const roomsCountElement = form.querySelector(Constants.ROOM_NUMBER_SELECTOR);
const pristine = new Pristine(form, {
  classTo: Constants.FORM_ELEMENT_CLASS,
  errorTextParent: Constants.FORM_ELEMENT_CLASS,
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: Constants.TEXT_ERROR_CLASS
});

function initFormValidation() {
  initPriceValidation();
  initCapacityValidation();
  return pristine;
}

function validateForm() {
  return pristine.validate();
}

function initPriceValidation() {
  const priceElement = form.querySelector(Constants.PRICE_SELECTOR);
  const typeElement = form.querySelector(Constants.HOSTING_TYPE_SELECTOR);

  pristine.addValidator(priceElement, (value) => {
    if (value < Constants.MIN_PRICES_BY_TYPE.get(typeElement.value)) {
      return false;
    }
    return true;
  }, () => `Прайс должен быть выше ${Constants.MIN_PRICES_BY_TYPE.get(typeElement.value)}`);
}

function initCapacityValidation() {
  pristine.addValidator(capacitySelect, (value) => {
    if (Constants.CAPACITIES_BY_ROOMS.get(roomsCountElement.value).has(value)) {
      return true;
    }
    return false;
  }, 'Недоступное для выбора значение');
}

export { initFormValidation, validateForm };


