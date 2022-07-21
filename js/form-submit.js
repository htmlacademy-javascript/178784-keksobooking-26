import { constants } from './constants.js';
import { sendFormAsync } from './data.js';
import { showErrorAlert } from './utils.js';
import { validateForm } from './validation.js';

const form = document.querySelector('.ad-form');
const formResetButton = document.querySelector('.ad-form__reset');
const messageBlockById = new Map();

function initFormSubmit(onSuccess, onError) {
  setupMessageBlocks();
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData(form);
        await sendFormAsync(formData);
        showMessageBlockById(constants.SUCCESS_MESSAGE_BLOCK_ID);
        if (onSuccess) {
          onSuccess();
        }
      }
      catch(ex) {
        showMessageBlockById(constants.ERROR_MESSAGE_BLOCK_ID);
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
  addMessageBlockElement(constants.SUCCESS_MESSAGE_BLOCK_ID);
  addMessageBlockElement(constants.ERROR_MESSAGE_BLOCK_ID);
}

function initFormReset(onReset) {
  formResetButton.addEventListener('click', (evt) => {
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
  window.addEventListener('keydown', escListener);
  const anyClickListenter = getAnyClickListener();
  window.addEventListener('click', anyClickListenter);

  function getEscListener() {
    return (evt) => {
      if (evt.key === 'Escape') {
        hideMessageBlock(blockElement);
        removeListeners(escListener, anyClickListenter);
      }
    };
  }

  function getAnyClickListener() {
    return () => {
      hideMessageBlock(blockElement);
      removeListeners(escListener, anyClickListenter);
    };
  }
}

function removeListeners(escListener, anyClickListenter) {
  window.removeEventListener('keydown', escListener);
  window.removeEventListener('click', anyClickListenter);
}

function showMessageBlock(blockElement) {
  blockElement.classList.remove(constants.HIDDEN_CLASS);
}

function hideMessageBlock(blockElement) {
  blockElement.classList.add(constants.HIDDEN_CLASS);
}

export { initFormSubmit, initFormReset };
