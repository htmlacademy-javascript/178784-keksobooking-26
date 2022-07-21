import { constants } from './constants.js';

function initImageLoaders() {
  initImageLoader('.ad-form__field input[type=file]', '.ad-form-header__preview');
  initImageLoader('.ad-form__upload input[type=file]', '.ad-form__photo');
}

function initImageLoader(fileChoserSelector, previewBlockSelector) {
  const fileChoser = document.querySelector(fileChoserSelector);
  const previewBlock = document.querySelector(previewBlockSelector);
  let preview = previewBlock.querySelector('img');

  if (!preview) {
    preview = document.createElement('img');
    preview.style.width = '100%';
    preview.style.height = '100%';
    previewBlock.append(preview);
  }

  fileChoser.addEventListener('change', () => {
    const file = fileChoser.files[0];
    const fileName = file.name.toLowerCase();
    const isValid = constants.FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
    if (isValid) {
      preview.src = URL.createObjectURL(file);
    }
  });
}

export { initImageLoaders };
