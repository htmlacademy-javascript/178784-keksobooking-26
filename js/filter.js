import { constants } from './constants.js';
const flitersForm = document.querySelector('.map__filters');

class BaseSelectFilter {
  constructor(filterName, getPropFunc, filterFunc) {
    this.filterName = filterName;
    this.getPropFunc = getPropFunc;
    this.filterFunc = filterFunc;
  }

  applyFilter(hosting, filtersFormData) {
    const propValue = this.getPropFunc(hosting);
    const filterValue = filtersFormData.get(this.filterName);
    return filterValue === 'any' || this.filterFunc(propValue, filterValue);
  }
}

class EqualPropertyFilter extends BaseSelectFilter {
  constructor(filterName, getPropFunc) {
    super(filterName, getPropFunc, (propValue, filterValue) => {
      if (isNaN(propValue)) {
        return propValue === filterValue;
      } else {
        return propValue === +filterValue;
      }
    });
  }
}

class PriceHostingFilter extends BaseSelectFilter {
  constructor() {
    super('housing-price', (hosting) => hosting.offer.price);
    this.filterFunc = (propValue, filterValue) =>  {
      switch (filterValue) {
        case 'low':
          return propValue < constants.LOW_PRICE_LIMIT;
        case 'middle':
          return propValue >= constants.LOW_PRICE_LIMIT && propValue < constants.MIDDLE_PRICE_LIMIT;
        case 'high':
          return propValue >= 50000;
        default:
          return true;
      }
    };
  }
}

class FeaturesFilter {
  applyFilter(hosting, filterFormData) {
    const features = hosting.offer.features ? hosting.offer.features : [];
    const filterValues = filterFormData.getAll('features').values();
    for(const filterValue of filterValues) {
      if (!features.includes(filterValue)) {
        return false;
      }
    }
    return true;
  }
}

const HOUSING_TYPE_FILTER = new EqualPropertyFilter('housing-type', (hosting) => hosting.offer.type);
const HOUSING_PRICE_FILTER = new PriceHostingFilter();
const HOUSING_ROOMS_FILTER = new EqualPropertyFilter('housing-rooms', (hosting) => +hosting.offer.rooms);
const HOUSING_GUESTS_FILTER = new EqualPropertyFilter('housing-guests', (hosting) => +hosting.offer.guests);
const FEATURES_FILTER = new FeaturesFilter('filter-wifi', 'filter-dishwasher', 'filter-parking',
  'filter-washer', 'filter-elevator', 'filter-conditioner');

const HOUSING_FILTERS = [HOUSING_TYPE_FILTER, HOUSING_PRICE_FILTER, HOUSING_ROOMS_FILTER, HOUSING_GUESTS_FILTER, FEATURES_FILTER];

function filterHostings(hostings) {
  const filtersFormData = new FormData(flitersForm);
  const filteredHostings = hostings
    .slice()
    .filter((hosting) => HOUSING_FILTERS.every((filter) => filter.applyFilter(hosting, filtersFormData)))
    .slice(0, constants.MAX_HOSTINGS_LENGTH);

  return filteredHostings;
}

function resetFilters() {
  flitersForm.reset();
}

export { filterHostings, resetFilters };
