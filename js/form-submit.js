import { Constants } from './constants.js';
import { sendFormAsync } from './data.js';
import { showErrorAlert, isEscapePressed } from './utils.js';
import { validateForm } from './validation.js';

const form = document.querySelector(Constants.FORM_SELECTOR);
const formResetButton = document.querySelector(Constants.FORM_RESET_SELECTOR);
const messageBlockById = new Map();

function initFormSubmit(onSuccess, onError) {
  setupMessageBlocks();
  form.addEventListener(Constants.SUMBIT_EVENT, async (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData(form);
        await sendFormAsync(formData);
        showMessageBlockById(Constants.SUCCESS_MESSAGE_BLOCK_ID);
        if (onSuccess) {
          onSuccess();
        }
      }
      catch(ex) {
        showMessageBlockById(Constants.ERROR_MESSAGE_BLOCK_ID);
        if (onError) {
          onError(ex);
        }
      }
    }
    else {
      showErrorAlert('Заполните, пожалуйста, все обязательные поля');
    }
  });
}

function setupMessageBlocks() {
  addMessageBlockElement(Constants.SUCCESS_MESSAGE_BLOCK_ID);
  addMessageBlockElement(Constants.ERROR_MESSAGE_BLOCK_ID);
}

function initFormReset(onReset) {
  formResetButton.addEventListener(Constants.CLICK_EVENT, (evt) => {
    evt.preventDefault();
    onReset();
  });
}

function addMessageBlockElement(id) {
  const blockElement = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`)
    .cloneNode(true);

  messageBlockById.set(id, blockElement);
  hideMessageBlock(blockElement);
  document.body.append(blockElement);
}

function showMessageBlockById(id) {
  const blockElement = messageBlockById.get(id);
  showMessageBlock(blockElement);

  const escListener = getEscListener();
  window.addEventListener(Constants.KEYDOWN_EVENT, escListener);
  const anyClickListenter = getAnyClickListener();
  window.addEventListener(Constants.CLICK_EVENT, anyClickListenter);

  function getEscListener() {
    return (evt) => {
      if (isEscapePressed(evt)) {
        hideAndRemoveListeners(blockElement, escListener, anyClickListenter);
      }
    };
  }

  function getAnyClickListener() {
    return () => {
      hideAndRemoveListeners(blockElement, escListener, anyClickListenter);
    };
  }
}

function hideAndRemoveListeners(blockElement, escListener, anyClickListenter) {
  hideMessageBlock(blockElement);
  removeListeners(escListener, anyClickListenter);
}

function removeListeners(escListener, anyClickListenter) {
  window.removeEventListener('keydown', escListener);
  window.removeEventListener('click', anyClickListenter);
}

function showMessageBlock(blockElement) {
  blockElement.classList.remove(Constants.HIDDEN_CLASS);
}

function hideMessageBlock(blockElement) {
  blockElement.classList.add(Constants.HIDDEN_CLASS);
}

export { initFormSubmit, initFormReset };
