import { getRandomInteger, getRandomFloat, getRandomArray } from './utils.js';

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Big roomLocated in the city center, great view from the window, cozy rooms, delicious food',
  'There is a cafe and a restaurant, the restaurant has good cuisine and a normal average check',
  'Water, tea, coffee and a welcome fruit platter - pleasantly surprised by the quality'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MAX_PRICE = 100000;

function createMocks(length) {
  return Array.from({ length: length }, () => createMock());
}

function createMock() {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location
  };
}

function createAuthor() {
  return `img/avatars/user${zeroPad(getRandomInteger(1, 10), 2)}.png`;
}

function zeroPad(num, places) {
  return String(num).padStart(places, '0');
}

function createOffer(location) {
  return {
    title: `title${getRandomInteger(1, 10)}`,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(1, MAX_PRICE),
    type: OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
    rooms: getRandomInteger(1, MAX_PRICE),
    guests: getRandomInteger(1, MAX_PRICE),
    checkin: TIMES[getRandomInteger(0, TIMES.length - 1)],
    checkout: TIMES[getRandomInteger(0, TIMES.length - 1)],
    features: getRandomArray(FEATURES),
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    photos: getRandomArray(PHOTOS),
  };
}

function createLocation() {
  return {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  };
}

export { createMocks };