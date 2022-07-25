import { Constants } from './constants.js';


function enableElement(element) {
  element.removeAttribute(Constants.DISABLED_ATTRIBUTE);
}

function disableElement(element) {
  element.setAttribute(Constants.DISABLED_ATTRIBUT, true);
}

function enableElements(elements) {
  elements.forEach((element) => element.removeAttribute(Constants.DISABLED_ATTRIBUT));
}

function disableElements(elements) {
  elements.forEach((element) => element.setAttribute(Constants.DISABLED_ATTRIBUT, true));
}

const alertElement = document.querySelector(Constants.ALERT_SELECTOR);

function showErrorAlert(message) {
  if (!alertElement.classList.contains(Constants.ALERT_ERROR_CLASS)) {
    alertElement.classList.add(Constants.ALERT_ERROR_CLASS);
  }
  if (alertElement.classList.contains(Constants.HIDDEN_CLASS)) {
    alertElement.textContent = message;
    alertElement.classList.remove(Constants.HIDDEN_CLASS);
    setTimeout(() => {
      alertElement.classList.add(Constants.HIDDEN_CLASS);
    }, 4000);
  }
}

function debounceAsync(callbackAsync, timeoutDelay = 500) {
  let timerId;
  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(async () => await callbackAsync.apply(this, rest), timeoutDelay);
  };
}

function isEscapePressed(evt) {
  return evt.key === Constants.ESCAPE_KEY;
}

export { enableElement, disableElement, enableElements, disableElements,
  showErrorAlert, debounceAsync, isEscapePressed };
