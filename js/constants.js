const Constants = {
  LOW_PRICE_LIMIT: 10000,
  MIDDLE_PRICE_LIMIT: 50000,
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
  ]),
  HIDDEN_CLASS: 'visually-hidden',
  ERROR_MESSAGE_BLOCK_ID: 'error',
  SUCCESS_MESSAGE_BLOCK_ID: 'success',
  MAX_HOSTINGS_LENGTH: 10,
  FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
  DEFAULT_AVATAR_SRC: 'img/muffin-grey.svg',
  SELECT_FILTER_ANY_VALUE: 'any',
  HOUSING_PRICE_FILTER_NAME: 'housing-pricehousing-price',
  HOUSING_PRICE_FILTER_LOW_VALUE: 'low',
  HOUSING_PRICE_FILTER_MIDDLE_VALUE: 'middle',
  HOUSING_PRICE_FILTER_HIGH_VALUE: 'high',
  FEATURES_FILTER_NAME: 'features',
  HOUSING_TYPE_FILTER_NAME: 'housing-type',
  HOUSING_ROOM_FILTER_NAME: 'housing-rooms',
  HOUSING_GUESTS_FILTER_NAME: 'housing-guests',
  KEKSOBOOKING_ENDPOINT: 'https://26.javascript.pages.academy/keksobooking',
  FORM_SELECTOR: '.ad-form',
  CAPACITY_SELECTOR: '#capacity',
  ROOM_NUMBER_SELECTOR: '#room_number',
  PRICE_SELECTOR: '#price',
  HOSTING_TYPE_SELECTOR: '#type',
  ADDRESS_SELECTOR: '#address',
  CARD_TEMPLATE_SELECTOR: '#card',
  TEMPLATE_POPUP_SELECTOR: '.popup',
  FORM_RESET_SELECTOR: '.ad-form__reset',
  PRICE_SLIDER_SELECTOR: '.ad-form__slider',
  FIELDSETS_SELECTOR: 'fieldset',
  SELECTS_SELECTOR: 'select',
  TIMEIN_SELECTOR: '#timein',
  TIMEOUT_SELECTOR: '#timeout',
  OPTIONS_SELECTOR: 'option',
  TIME_FIELDSET_SELECTOR: '.ad-form__element--time',
  POPUP_AVATAR_SELECTOR: '.popup__avatar',
  POPUP_TITLE_SELECTOR: '.popup__title',
  POPUP_ADDRESS_SELECTOR: '.popup__text--address',
  POPUP_PRICE_SELECTOR: '.popup__text--price',
  POPUP_TYPE_SELECTOR: '.popup__type',
  POPUP_CAPACITY_SELECTOR: '.popup__text--capacity',
  POPUP_TIME_SELECTOR: '.popup__text--time',
  POPUP_DESCTIPTION_SELECTOR: '.popup__description',
  POPUP_PHOTOS_SELECTOR: '.popup__photos',
  POPUP_PHOTO_ITEM_SELECTOR: '.popup__photo',
  POPUP_FEATURES_SELECTOR: '.popup__features',
  POPUP_FEATURE_ITEM_SELECTOR: '.popup__feature',
  AVATAR_FILE_CHOOSER_SELECTOR: '.ad-form__field input[type=file]',
  HOSTING_FILE_CHOOSER_SELECTOR: '.ad-form__upload input[type=file]',
  AVATAR_PREVIEW_SELECTOR: '.ad-form-header__preview img',
  HOSTING_PREVIEW_SELECTOR: '.ad-form__photo img',
  ALERT_SELECTOR: '.alert',

  FORM_ELEMENT_CLASS: 'ad-form__element',
  TEXT_ERROR_CLASS: 'text-error',
  MAP_FILTERS_SELECTOR: '.map__filters',
  MAP_CANVAS_CLASS: 'map-canvas',
  FORM_DISABLED_CLASS: 'ad-form--disabled',
  MAP_FILTERS_DISABLED_CLASS: 'map__filters--disabled',
  POPUP_FEATURE_CLASS: 'popup__feature',
  PREVIEW_EMPTY_CLASS: 'preview--empty',
  DISABLED_ATTRIBUTE: 'disabled',
  ALERT_ERROR_CLASS: 'alert--error',

  MAP_LOAD_EVENT: 'load',
  MAP_MARKER_MOOVEND_EVENT: 'moveend',

  CHANGE_EVENT: 'change',
  SUMBIT_EVENT: 'submit',
  CLICK_EVENT: 'click',
  KEYDOWN_EVENT: 'keydown',
  MAP_FILTER_DEBOUNCE_DELAY_MS: 500,
  ESCAPE_KEY: 'Escape',
};

export { Constants };
