import { Constants } from './constants.js';
const flitersForm = document.querySelector(Constants.MAP_FILTERS_SELECTOR);

class BaseSelectFilter {
  constructor(filterName, getPropFunc, filterFunc) {
    this.filterName = filterName;
    this.getPropFunc = getPropFunc;
    this.filterFunc = filterFunc;
  }

  apply(hosting, filtersFormData) {
    const propValue = this.getPropFunc(hosting);
    const filterValue = filtersFormData.get(this.filterName);
    return filterValue === Constants.SELECT_FILTER_ANY_VALUE || this.filterFunc(propValue, filterValue);
  }
}

class EqualPropertyFilter extends BaseSelectFilter {
  constructor(filterName, getPropFunc) {
    super(filterName, getPropFunc, (propValue, filterValue) => {
      if (isNaN(propValue)) {
        return propValue === filterValue;
      }
      return propValue === +filterValue;
    });
  }
}

class PriceHostingFilter extends BaseSelectFilter {
  constructor() {
    super(Constants.HOUSING_PRICE_FILTER_NAME, (hosting) => hosting.offer.price);
    this.filterFunc = (propValue, filterValue) =>  {
      switch (filterValue) {
        case Constants.HOUSING_PRICE_FILTER_LOW_VALUE:
          return propValue < Constants.LOW_PRICE_LIMIT;
        case Constants.HOUSING_PRICE_FILTER_MIDDLE_VALUE:
          return propValue >= Constants.LOW_PRICE_LIMIT && propValue < Constants.MIDDLE_PRICE_LIMIT;
        case Constants.HOUSING_PRICE_FILTER_HIGH_VALUE:
          return propValue >= Constants.MIDDLE_PRICE_LIMIT;
        default:
          return true;
      }
    };
  }
}

class FeaturesFilter {
  apply(hosting, filterFormData) {
    const features = hosting.offer.features ? hosting.offer.features : [];
    const filterValues = filterFormData.getAll(Constants.FEATURES_FILTER_NAME).values();
    for(const filterValue of filterValues) {
      if (!features.includes(filterValue)) {
        return false;
      }
    }
    return true;
  }
}

const housingTypeFilter = new EqualPropertyFilter(Constants.HOUSING_TYPE_FILTER_NAME, (hosting) => hosting.offer.type);
const housingRoomsFilter = new EqualPropertyFilter(Constants.HOUSING_ROOM_FILTER_NAME, (hosting) => +hosting.offer.rooms);
const housingGuestsFilter = new EqualPropertyFilter(Constants.HOUSING_GUESTS_FILTER_NAME, (hosting) => +hosting.offer.guests);
const housingPriceFilter = new PriceHostingFilter();
const featuresFilter = new FeaturesFilter();

const hostingFilters = [housingTypeFilter, housingPriceFilter, housingRoomsFilter, housingGuestsFilter, featuresFilter];

function filterHostings(hostings) {
  const filtersFormData = new FormData(flitersForm);
  const filteredHostings = [];

  let index = 0;
  while(filteredHostings.length < Constants.MAX_HOSTINGS_LENGTH && index < hostings.length) {
    const hosting = hostings[index];
    if (hostingFilters.every((filter) => filter.apply(hosting, filtersFormData))) {
      filteredHostings.push(hosting);
    }
    index++;
  }

  return filteredHostings;
}

function resetFilters() {
  flitersForm.reset();
}

export { filterHostings, resetFilters };
