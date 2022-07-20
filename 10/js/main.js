
import { toggleActive, initForm, resetForm } from './form.js';
import { initMap, resetMap } from './map.js';
import { setResetFrom, setSubmitForm } from './form-submit.js';
import { setupFormValidation } from './validation.js';

toggleActive(false);
initForm();
setupFormValidation();
initMap();
setSubmitForm(successSubmit);
setResetFrom(reset);

function successSubmit() {
  reset();
}

function reset() {
  resetForm();
  resetMap();
}

