import { createHostings } from './data.js';
import { OFFER_TYPE_LABELS } from './constants.js';

function generateHostingDomElements(count) {
  const hostings = createHostings(count);

  const hostingTemplate = document.querySelector('#card').content
    .querySelector('.popup');

  return hostings.map((hosting) => {
    const template = hostingTemplate.cloneNode(true);
    addTextContent(template, '.popup__title', hosting.offer.title);
    addTextContent(template, '.popup__text--address', hosting.offer.address);
    addTextContent(template, '.popup__text--price', `${hosting.offer.price} ₽/ночь`);
    addTextContent(template, '.popup__type', OFFER_TYPE_LABELS[hosting.offer.type]);
    addTextContent(template, '.popup__text--capacity', `${hosting.offer.rooms} комнаты для ${hosting.offer.guests} гостей`);
    addTextContent(template, '.popup__text--time', `Заезд после ${hosting.offer.checkin}, выезд до ${hosting.offer.checkout}`);
    addTextContent(template, '.popup__avatar',  hosting.author.avatar);
    addTextContent(template, '.popup__description', hosting.offer.description);

    fillFeatures(template, hosting);
    fillPhotos(template, hosting);
    return template;
  });
}

function addTextContent(template, selector, textContent) {
  template.querySelector(selector).textContent = textContent;
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

export { generateHostingDomElements };
