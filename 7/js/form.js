function toggleActive(isActive) {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const filtersForm = document.querySelector('.map__filters');
  const filtersFormSelectors = document.querySelectorAll('select');
  const filtersFormFieldsets = document.querySelectorAll('fieldset');

  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    filtersForm.classList.remove('map__filters--disabled');
    enableElements(adFormFieldsets);
    enableElements(filtersFormSelectors);
    enableElements(filtersFormFieldsets);

  } else {
    adForm.classList.add('ad-form--disabled');
    filtersForm.classList.add('map__filters--disabled');
    disableElements(adFormFieldsets);
    disableElements(filtersFormSelectors);
    disableElements(filtersFormFieldsets);
  }
}

function enableElements(elements) {
  elements.forEach((element) => element.removeAttribute('disabled'));
}

function disableElements(elements) {
  elements.forEach((element) =>element.setAttribute('disabled', true));
}

export { toggleActive };
