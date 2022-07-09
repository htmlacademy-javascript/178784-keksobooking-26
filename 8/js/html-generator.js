import { OFFER_TYPE_LABELS, ROOMS_LABELS, CAPACITY_LABELS } from './constants.js';

function createHostingPopup(popupTemplate, hosting) {
  const template = popupTemplate.cloneNode(true);
  template.querySelector('.popup__avatar').src = hosting.author.avatar;
  addTextOrRemoveEmpty(template, '.popup__title', hosting.offer.title);
  addTextOrRemoveEmpty(template, '.popup__text--address', hosting.offer.address);
  addTextOrRemoveEmpty(template, '.popup__text--price', hosting.offer.price ? `${hosting.offer.price} ₽/ночь` : null);
  addTextOrRemoveEmpty(template, '.popup__type', hosting.offer.type ? OFFER_TYPE_LABELS[hosting.offer.type] : null);
  addTextOrRemoveEmpty(template, '.popup__text--capacity', hosting.offer.rooms && hosting.offer.capacity
    ? `${ROOMS_LABELS[hosting.offer.rooms]} ${CAPACITY_LABELS[hosting.offer.capacity]}`
    : null);
  addTextOrRemoveEmpty(template, '.popup__text--time', hosting.offer.checkin && hosting.offer.checkout
    ? `Заезд после ${hosting.offer.checkin}, выезд до ${hosting.offer.checkout}`
    : null);
  addTextOrRemoveEmpty(template, '.popup__description', hosting.offer.description);

  fillFeatures(template, hosting);
  fillPhotos(template, hosting);
  return template;
}

function addTextOrRemoveEmpty(template, selector, textContent) {
  const targetElement = template.querySelector(selector);
  if (textContent) {
    targetElement.textContent = textContent;
  } else {
    targetElement.remove();
  }
}

function fillPhotos(template, hosting) {
  const photos = template.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  hosting.offer.photos.forEach((url) => {
    const photoClone = photo.cloneNode();
    photoClone.src = url;
    photos.append(photoClone);
  });
  photo.remove();
}

function fillFeatures(template, hosting) {
  const expectedClasses = hosting.offer.features.map((f) => `popup__feature--${f}`);
  template.querySelector('.popup__features')
    .querySelectorAll('.popup__feature')
    .forEach((featureElement) => {
      if (!expectedClasses.some((expectedClass) => featureElement.classList.contains(expectedClass))) {
        featureElement.remove();
      }
    });
}

export { createHostingPopup };
