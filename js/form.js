import { constants } from './constants.js';
import { enableElement, disableElement, enableElements, disableElements } from './utils.js';

const priceSliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const hostingTypeElement = document.querySelector('.ad-form').querySelector('#type');
const form = document.querySelector('.ad-form');

function initForm() {
  initCapacity();
  initTimeInOutAccording();
  initPriceSlider();
}

const roomsCountElement = form.querySelector('#room_number');
function initCapacity() {
  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);
  roomsCountElement.addEventListener('change', (evt) => {
    updateEnableCapacitiesByRoomCounts(evt.target.value);
  });

}

function resetForm() {
  form.reset();
  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);
  initPriceByHosting();
}

function initPriceSlider() {
  const priceValue = initPriceByHosting();
  noUiSlider.create(priceSliderElement, {
    start: priceValue,
    step: 100,
    connect: 'lower',
    range: {
      'min': priceValue,
      'max': constants.MAX_PRICE
    },
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  priceSliderElement.noUiSlider.on('change', () => {
    priceElement.value = priceSliderElement.noUiSlider.get();
  });

  priceElement.addEventListener('change', () => {
    priceSliderElement.noUiSlider.set(priceElement.value);
  });

  hostingTypeElement.addEventListener('change', () => {
    onHostingTypeChanged();
  });
}

function initPriceByHosting() {
  const priceValue = constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  priceElement.value = priceValue;
  return priceValue;
}

function onHostingTypeChanged() {
  const newMinPrice = constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  const updateSliderOptions = {
    range: {
      'min': newMinPrice,
      'max': constants.MAX_PRICE
    }
  };
  const needUpdateValue = priceElement.value < newMinPrice;
  if (needUpdateValue) {
    updateSliderOptions.start = newMinPrice;
    priceElement.value = newMinPrice;
  }

  priceSliderElement.noUiSlider.updateOptions(updateSliderOptions);
}

function toggleActive(isActive) {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const filtersForm = document.querySelector('.map__filters');
  const filtersFormSelectors = document.querySelectorAll('select');
  const filtersFormFieldsets = document.querySelectorAll('fieldset');

  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    filtersForm.classList.remove('map__filters--disabled');
    enableElement(priceSliderElement);
    enableElements(adFormFieldsets);
    enableElements(filtersFormSelectors);
    enableElements(filtersFormFieldsets);

  } else {
    adForm.classList.add('ad-form--disabled');
    filtersForm.classList.add('map__filters--disabled');
    disableElement(priceSliderElement);
    disableElements(adFormFieldsets);
    disableElements(filtersFormSelectors);
    disableElements(filtersFormFieldsets);
  }
}

const capacitySelect = form.querySelector('#capacity');
function updateEnableCapacitiesByRoomCounts(roomsCount) {
  let selectedDisabledOption = null;
  let firstEnebleOption = null;
  capacitySelect.querySelectorAll('option').forEach((option) => {
    option.disabled = !constants.CAPACITIES_BY_ROOMS.get(roomsCount).has(option.value);
    if (!selectedDisabledOption && option.selected && option.disabled) {
      selectedDisabledOption = option;
    }
    if (!firstEnebleOption && !option.disabled) {
      firstEnebleOption = option;
    }
  });

  if (selectedDisabledOption && firstEnebleOption) {
    selectedDisabledOption.selected = false;
    firstEnebleOption.selected = true;
  }
}

const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');
function initTimeInOutAccording() {
  form.querySelector('.ad-form__element--time').addEventListener('change', (evt) => {
    if (evt.target.id === timeInElement.id) {
      timeOutElement.value = evt.target.value;
    } else if (evt.target.id === timeOutElement.id) {
      timeInElement.value = evt.target.value;
    }
  });
}


export { toggleActive, initForm, resetForm };
