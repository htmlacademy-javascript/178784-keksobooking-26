const CONSTANTS = {
  OFFER_TYPES: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTIONS: ['Большой номер. Расположен в центре города, отличный вид из окна, уютные номера, вкусная еда.',
    'Есть кафе и ресторан, в ресторане хорошая кухня и нормальный средний чек.',
    'Вода, чай, кофе и приветственное блюдо с фруктами - качество приятно удивило.'],
  PHOTOS: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
  MAX_PRICE: 100000,
};

const OFFER_TYPE_LABELS = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const MIN_PRICES_BY_TYPE = new Map([
  ['bungalow', 0],
  ['flat', 1000],
  ['hotel', 3000],
  ['house', 5000],
  ['palace', 10000]
]);

const CAPACITIES_BY_ROOMS = new Map([
  ['1', new Set(['1'])],
  ['2', new Set(['1', '2'])],
  ['3', new Set(['1', '2', '3'])],
  ['100', new Set(['0'])]
]);

export { CONSTANTS, OFFER_TYPE_LABELS, MIN_PRICES_BY_TYPE, CAPACITIES_BY_ROOMS };
