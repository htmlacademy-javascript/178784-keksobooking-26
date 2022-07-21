
import { disableForm, initForm, resetForm } from './form.js';
import { initMap, resetMap } from './map.js';
import { initFormSubmit, initFormReset } from './form-submit.js';
import { initFormValidation } from './validation.js';
import { initImageLoaders } from './image-loader.js';

disableForm();

initMap();
initForm();
initFormValidation();
initFormSubmit(resetAll);
initFormReset(resetAll);
initImageLoaders();

function resetAll() {
  resetForm();
  resetMap();
}

