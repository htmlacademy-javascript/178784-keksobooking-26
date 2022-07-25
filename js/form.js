import { Constants } from './constants.js';
import { enableElement, disableElement, enableElements, disableElements } from './utils.js';

const priceSliderElement = document.querySelector(Constants.PRICE_SLIDER_SELECTOR);
const priceElement = document.querySelector(Constants.PRICE_SELECTOR);
const hostingTypeElement = document.querySelector(Constants.FORM_SELECTOR).querySelector(Constants.HOSTING_TYPE_SELECTOR);
const form = document.querySelector(Constants.FORM_SELECTOR);
const roomsCountElement = form.querySelector(Constants.ROOM_NUMBER_SELECTOR);
const adFormFieldsets = form.querySelectorAll(Constants.FIELDSETS_SELECTOR);
const filtersForm = document.querySelector(Constants.MAP_FILTERS_SELECTOR);
const filtersFormSelectors = document.querySelectorAll(Constants.SELECTS_SELECTOR);
const filtersFormFieldsets = document.querySelectorAll(Constants.FIELDSETS_SELECTOR);
const capacitySelect = form.querySelector(Constants.CAPACITY_SELECTOR);
const timeInElement = form.querySelector(Constants.TIMEIN_SELECTOR);
const timeOutElement = form.querySelector(Constants.TIMEOUT_SELECTOR);

function initForm() {
  initCapacity();
  initTimeInOutAccording();
  initPriceSlider();
}

function initCapacity() {
  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);
  roomsCountElement.addEventListener(Constants.CHANGE_EVENT, (evt) => {
    updateEnableCapacitiesByRoomCounts(evt.target.value);
  });
}

function resetForm() {
  form.reset();
  updateEnableCapacitiesByRoomCounts(roomsCountElement.value);
  initPriceByHosting();
  priceSliderElement.noUiSlider.reset();
}

function initPriceSlider() {
  const priceValue = initPriceByHosting();
  noUiSlider.create(priceSliderElement, {
    start: priceValue,
    step: 100,
    connect: 'lower',
    range: {
      'min': priceValue,
      'max': Constants.MAX_PRICE
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

  priceSliderElement.noUiSlider.on(Constants.CHANGE_EVENT, () => {
    priceElement.value = priceSliderElement.noUiSlider.get();
  });

  priceElement.addEventListener(Constants.CHANGE_EVENT, () => {
    priceSliderElement.noUiSlider.set(priceElement.value);
  });

  hostingTypeElement.addEventListener(Constants.CHANGE_EVENT, () => {
    onHostingTypeChanged();
  });
}

function initPriceByHosting() {
  const priceValue = Constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  priceElement.value = priceValue;
  return priceValue;
}

function onHostingTypeChanged() {
  const newMinPrice = Constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  const updateSliderOptions = {
    range: {
      'min': newMinPrice,
      'max': Constants.MAX_PRICE
    }
  };
  const needUpdateValue = priceElement.value < newMinPrice;
  if (needUpdateValue) {
    updateSliderOptions.start = newMinPrice;
    priceElement.value = newMinPrice;
  }

  priceSliderElement.noUiSlider.updateOptions(updateSliderOptions);
}

function enableForm() {
  form.classList.remove(Constants.FORM_DISABLED_CLASS);
  filtersForm.classList.remove(Constants.MAP_FILTERS_DISABLED_CLASS);
  enableElement(priceSliderElement);
  enableElements(adFormFieldsets);
  enableElements(filtersFormSelectors);
  enableElements(filtersFormFieldsets);
}

function disableForm() {
  form.classList.add(Constants.FORM_DISABLED_CLASS);
  filtersForm.classList.add(Constants.MAP_FILTERS_DISABLED_CLASS);
  disableElement(priceSliderElement);
  disableElements(adFormFieldsets);
  disableElements(filtersFormSelectors);
  disableElements(filtersFormFieldsets);
}

function updateEnableCapacitiesByRoomCounts(roomsCount) {
  let selectedDisabledOption = null;
  let firstEnebleOption = null;
  capacitySelect.querySelectorAll(Constants.OPTIONS_SELECTOR).forEach((option) => {
    option.disabled = !Constants.CAPACITIES_BY_ROOMS.get(roomsCount).has(option.value);
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

function initTimeInOutAccording() {
  form.querySelector(Constants.TIME_FIELDSET_SELECTOR).addEventListener(Constants.CHANGE_EVENT, (evt) => {
    if (evt.target.id === timeInElement.id) {
      timeOutElement.value = evt.target.value;
    } else if (evt.target.id === timeOutElement.id) {
      timeInElement.value = evt.target.value;
    }
  });
}

export { enableForm, disableForm, initForm, resetForm };
