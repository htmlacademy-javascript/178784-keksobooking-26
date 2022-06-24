import { getRandomInteger, getRandomFloat, getRandomArray } from './utils.js';
import { CONSTANTS } from './constants.js';


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
    price: getRandomInteger(1, CONSTANTS.MAX_PRICE),
    type: CONSTANTS.OFFER_TYPES[getRandomInteger(0, CONSTANTS.OFFER_TYPES.length - 1)],
    rooms: getRandomInteger(1, 6),
    guests: getRandomInteger(1, 4),
    checkin: CONSTANTS.TIMES[getRandomInteger(0, CONSTANTS.TIMES.length - 1)],
    checkout: CONSTANTS.TIMES[getRandomInteger(0, CONSTANTS.TIMES.length - 1)],
    features: getRandomArray(CONSTANTS.FEATURES),
    description: CONSTANTS.DESCRIPTIONS[getRandomInteger(0, CONSTANTS.DESCRIPTIONS.length - 1)],
    photos: getRandomArray(CONSTANTS.PHOTOS),
  };
}

function createLocation() {
  return {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  };
}

export { createHostings as createMocks };
