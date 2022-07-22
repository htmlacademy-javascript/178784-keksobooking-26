import { getRandomInteger, getRandomFloat, getRandomArray } from './utils.js';
import { constants } from './constants.js';

function createHostings(length) {
  return Array.from({ length: length }, () => createHosting());
}

function createHosting() {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location
  };
}

function createAuthor() {
  return {
    avatar: `img/avatars/user${zeroPad(getRandomInteger(1, 10), 2)}.png`
  };
}

function zeroPad(num, places) {
  return String(num).padStart(places, '0');
}

function createOffer(location) {
  return {
    title: `title${getRandomInteger(1, 10)}`,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(1, constants.MAX_PRICE),
    type: constants.OFFER_TYPES[getRandomInteger(0, constants.OFFER_TYPES.length - 1)],
    rooms: getRandomInteger(1, 6),
    guests: getRandomInteger(1, 4),
    checkin: constants.TIMES[getRandomInteger(0, constants.TIMES.length - 1)],
    checkout: constants.TIMES[getRandomInteger(0, constants.TIMES.length - 1)],
    features: getRandomArray(constants.FEATURES),
    description: constants.DESCRIPTIONS[getRandomInteger(0, constants.DESCRIPTIONS.length - 1)],
    photos: getRandomArray(constants.PHOTOS),
  };
}

function createLocation() {
  return {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  };
}

export { createHostings };
