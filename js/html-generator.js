import { createMocks as createHostings } from './data.js';
import { OFFER_TYPE_LABELS } from './constants.js';

function generateHostingDomElements(count) {
  const hostings = createHostings(count);

  const hostingTemplate = document.querySelector('#card').content
    .querySelector('.popup');

  return hostings.map((hosting) => {
    const template = hostingTemplate.cloneNode(true);
    template.querySelector('.popup__title').textContent = hosting.offer.title;
    template.querySelector('.popup__text--address').textContent = hosting.offer.address;
    template.querySelector('.popup__text--price').textContent = `${hosting.offer.price} ₽/ночь`;
    template.querySelector('.popup__type').textContent = OFFER_TYPE_LABELS[hosting.offer.type];
    template.querySelector('.popup__text--capacity').textContent = `${hosting.offer.rooms} комнаты для ${hosting.offer.guests} гостей`;
    template.querySelector('.popup__text--time').textContent = `Заезд после ${hosting.offer.checkin}, выезд до ${hosting.offer.checkout}`;
    template.querySelector('.popup__avatar').src = hosting.author.avatar;
    template.querySelector('.popup__description').textContent = hosting.offer.description;
    fillFeatures(template, hosting);
    fillPhotos(template, hosting);
    return template;
  });
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
