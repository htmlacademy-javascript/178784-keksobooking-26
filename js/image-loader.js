import { Constants } from './Constants.js';
import { showErrorAlert } from './utils.js';

let avatarPreviewElement;
let hostingPreviewElement;

function initImageLoaders() {
  avatarPreviewElement = initImageLoader(Constants.AVATAR_FILE_CHOOSER_SELECTOR, Constants.AVATAR_PREVIEW_SELECTOR);
  hostingPreviewElement = initImageLoader(Constants.HOSTING_FILE_CHOOSER_SELECTOR, Constants.HOSTING_PREVIEW_SELECTOR, true);
}

function initImageLoader(fileChoserSelector, previewSelector, idDefaultEmpty) {
  const fileChoser = document.querySelector(fileChoserSelector);
  const previewElement = document.querySelector(previewSelector);

  fileChoser.addEventListener(Constants.CHANGE_EVENT, () => {
    const file = fileChoser.files[0];
    const fileName = file.name.toLowerCase();
    const isValid = Constants.FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
    if (isValid) {
      previewElement.src = URL.createObjectURL(file);
      if (idDefaultEmpty) {
        previewElement.classList.remove(Constants.PREVIEW_EMPTY_CLASS);
      }
    }
    else {
      showErrorAlert(`Можно загружать только изображения: ${Constants.FILE_TYPES.join(', ')}`);
    }
  });
  return previewElement;
}

function resetImages() {
  resetAvatarImage();
  resetHostingImage();
}

function resetAvatarImage() {
  avatarPreviewElement.src = Constants.DEFAULT_AVATAR_SRC;
}

function resetHostingImage() {
  hostingPreviewElement.src = '';
  hostingPreviewElement.classList.add(Constants.PREVIEW_EMPTY_CLASS);
}


export { initImageLoaders, resetImages };
