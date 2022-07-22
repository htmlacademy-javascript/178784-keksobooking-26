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

const housingTypeFilter = new EqualPropertyFilter('housing-type', (hosting) => hosting.offer.type);
const housingPriceFilter = new PriceHostingFilter();
const housingRoomsFilter = new EqualPropertyFilter('housing-rooms', (hosting) => +hosting.offer.rooms);
const housingGuestsFilter = new EqualPropertyFilter('housing-guests', (hosting) => +hosting.offer.guests);
const featuresFilter = new FeaturesFilter('filter-wifi', 'filter-dishwasher', 'filter-parking',
  'filter-washer', 'filter-elevator', 'filter-conditioner');

const hostingFilters = [housingTypeFilter, housingPriceFilter, housingRoomsFilter, housingGuestsFilter, featuresFilter];

function filterHostings(hostings) {
  const filtersFormData = new FormData(flitersForm);
  const filteredHostings = [];

  let index = 0;
  while(filteredHostings.length < constants.MAX_HOSTINGS_LENGTH && index < hostings.length) {
    const hosting = hostings[index];
    if (hostingFilters.every((filter) => filter.applyFilter(hosting, filtersFormData))) {
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
