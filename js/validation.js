import { constants } from './constants.js';

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-error'
});

function setupFormValidation() {
  setupPriceValidation();
  setupCapacityValidation();
  setupTimeInOutAccording();
}

function validateForm() {
  return pristine.validate();
}

function setupPriceValidation() {
  const priceElement = form.querySelector('#price');
  const typeElement = form.querySelector('#type');

  pristine.addValidator(priceElement, (value) => {
    if (value < constants.MIN_PRICES_BY_TYPE.get(typeElement.value)) {
      return false;
    }
    return true;
  }, () => `Прайс должен быть выше ${constants.MIN_PRICES_BY_TYPE.get(typeElement.value)}`);
}

const capacitySelect = form.querySelector('#capacity');

function setupCapacityValidation() {
  const roomsCountElement = form.querySelector('#room_number');
  pristine.addValidator(capacitySelect, (value) => {
    if (constants.CAPACITIES_BY_ROOMS.get(roomsCountElement.value).has(value)) {
      return true;
    }
    return false;
  }, 'Недоступное для выбора значение');

  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);

  roomsCountElement.addEventListener('change', (evt) => {
    updateEnableCapacitiesByRoomCounts(evt.target.value);
  });
}

const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');
function setupTimeInOutAccording() {
  form.querySelector('.ad-form__element--time').addEventListener('change', (evt) => {
    if (evt.target.id === timeInElement.id) {
      timeOutElement.value = evt.target.value;
    } else if (evt.target.id === timeOutElement.id) {
      timeInElement.value = evt.target.value;
    }
  });
}

function updateEnableCapacitiesByRoomCounts(roomsCount) {
  capacitySelect.querySelectorAll('option').forEach((option) => {
    option.disabled = !constants.CAPACITIES_BY_ROOMS.get(roomsCount).has(option.value);
  });
}

export { setupFormValidation, validateForm };


