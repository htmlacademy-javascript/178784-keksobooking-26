const constants = {
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
  TOKYO_CENTER: { lat: 35.7, lng: 139.425 },
  COORDS_FRICTION_DIGITS: 5,
  OFFER_TYPE_LABELS: {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  },
  ROOMS_LABELS: {
    '1': '1 команата',
    '2': '2 команаты',
    '3': '3 команты',
    '100': '100 комнат'
  },
  CAPACITY_LABELS: {
    '1': 'для 1 гостя',
    '2': 'для 2 гостей',
    '3': 'для 3 гостей',
    '0': 'не для гостей'
  },
  MIN_PRICES_BY_TYPE: new Map([
    ['bungalow', 0],
    ['flat', 1000],
    ['hotel', 3000],
    ['house', 5000],
    ['palace', 10000]
  ]),
  CAPACITIES_BY_ROOMS: new Map([
    ['1', new Set(['1'])],
    ['2', new Set(['1', '2'])],
    ['3', new Set(['1', '2', '3'])],
    ['100', new Set(['0'])]
  ])
};


export { constants };
