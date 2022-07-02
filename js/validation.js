import { MIN_PRICES_BY_TYPE, CAPACITIES_BY_ROOMS } from './constants.js';

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

function setupFormValidation() {
  setupPriceValidation();
  setupCapacityValidation();

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
}

function setupPriceValidation() {
  const priceElement = form.querySelector('#price');
  const typeElement = form.querySelector('#type');

  pristine.addValidator(priceElement, (value) => {
    if (value < MIN_PRICES_BY_TYPE.get(typeElement.value)) {
      return false;
    }
    return true;
  }, () => `Прайс должен быть выше ${MIN_PRICES_BY_TYPE.get(typeElement.value)}`);
}

const capacitySelect = form.querySelector('#capacity');

function setupCapacityValidation() {
  const roomsCountElement = form.querySelector('#room_number');
  pristine.addValidator(capacitySelect, (value) => {
    if (CAPACITIES_BY_ROOMS.get(roomsCountElement.value).has(value)) {
      return true;
    }
    return false;
  }, 'Недоступное для выбора значение');

  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);

  roomsCountElement.addEventListener('change', (evt) => {
    updateEnableCapacitiesByRoomCounts(evt.target.value);
  });
}

function updateEnableCapacitiesByRoomCounts(roomsCount) {
  capacitySelect.querySelectorAll('option').forEach((option) => {
    option.disabled = !CAPACITIES_BY_ROOMS.get(roomsCount).has(option.value);
  });
}

export { setupFormValidation };


