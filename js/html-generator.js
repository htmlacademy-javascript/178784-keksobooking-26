import { Constants } from './constants.js';

function createHostingPopup(popupTemplate, hosting) {
  const template = popupTemplate.cloneNode(true);
  template.querySelector(Constants.POPUP_AVATAR_SELECTOR).src = hosting.author.avatar;
  addTextOrRemoveEmpty(template, Constants.POPUP_TITLE_SELECTOR, hosting.offer.title);
  addTextOrRemoveEmpty(template, Constants.POPUP_ADDRESS_SELECTOR, hosting.offer.address);
  addTextOrRemoveEmpty(template, Constants.POPUP_PRICE_SELECTOR, hosting.offer.price ? `${hosting.offer.price} ₽/ночь` : null);
  addTextOrRemoveEmpty(template, Constants.POPUP_TYPE_SELECTOR, hosting.offer.type ? Constants.OFFER_TYPE_LABELS[hosting.offer.type] : null);
  addTextOrRemoveEmpty(template, Constants.POPUP_CAPACITY_SELECTOR, hosting.offer.rooms && (hosting.offer.guests || hosting.offer.guests === 0)
    ? `${Constants.ROOMS_LABELS[hosting.offer.rooms]} ${Constants.CAPACITY_LABELS[hosting.offer.guests]}`
    : null);
  addTextOrRemoveEmpty(template, Constants.POPUP_TIME_SELECTOR, hosting.offer.checkin && hosting.offer.checkout
    ? `Заезд после ${hosting.offer.checkin}, выезд до ${hosting.offer.checkout}`
    : null);
  addTextOrRemoveEmpty(template, Constants.POPUP_DESCTIPTION_SELECTOR, hosting.offer.description);

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
  const photos = template.querySelector(Constants.POPUP_PHOTOS_SELECTOR);
  const photo = photos.querySelector(Constants.POPUP_PHOTO_ITEM_SELECTOR);
  if (hosting.offer.photos) {
    hosting.offer.photos.forEach((url) => {
      const photoClone = photo.cloneNode();
      photoClone.src = url;
      photos.append(photoClone);
    });
  }
  photo.remove();
}

function fillFeatures(template, hosting) {
  const expectedClasses = hosting.offer.features
    ? hosting.offer.features.map((f) => `${Constants.POPUP_FEATURE_CLASS}--${f}`)
    : [];
  template.querySelector(Constants.POPUP_FEATURES_SELECTOR)
    .querySelectorAll(Constants.POPUP_FEATURE_ITEM_SELECTOR)
    .forEach((featureElement) => {
      if (!expectedClasses.some((expectedClass) => featureElement.classList.contains(expectedClass))) {
        featureElement.remove();
      }
    });
}

export { createHostingPopup };
