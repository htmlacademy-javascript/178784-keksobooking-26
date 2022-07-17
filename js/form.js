import { constants } from './constants.js';
import { setupFormValidation, validateForm } from './validation.js';
import { enableElement, disableElement, enableElements, disableElements } from './utils.js';

const priceSliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const hostingTypeElement = document.querySelector('.ad-form').querySelector('#type');
const form = document.querySelector('.ad-form');


function initForm() {
  initPriceSlider();
  setupFormValidation();
  initSubmit();
}

function initSubmit() {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      alert('форма валидна');
    }
    else {
      alert('форма не валидна');
    }
  });
}

function initPriceSlider() {
  const startMinPrice = constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  priceElement.value = startMinPrice;

  noUiSlider.create(priceSliderElement, {
    start: startMinPrice,
    step: 100,
    connect: 'lower',
    range: {
      'min': startMinPrice,
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

function onHostingTypeChanged() {
  const newMinPrice = constants.MIN_PRICES_BY_TYPE.get(hostingTypeElement.value);
  const updateSliderOptions = {
    range: {
      'min': newMinPrice,
      'max': constants.CONSTANTS.MAX_PRICE
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


export { toggleActive, initForm };
