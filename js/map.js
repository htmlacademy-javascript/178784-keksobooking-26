import { Constants } from './constants.js';
import { enableForm } from './form.js';
import { getHostingsAsnc } from './data.js';
import { createHostingPopup } from './html-generator.js';
import { showErrorAlert, debounceAsync } from './utils.js';
import { filterHostings } from './filter.js';

const addressElement = document.querySelector(Constants.ADDRESS_SELECTOR);
const popupTemplate = document.querySelector(Constants.CARD_TEMPLATE_SELECTOR).content
  .querySelector(Constants.TEMPLATE_POPUP_SELECTOR);
const flitersForm = document.querySelector(Constants.MAP_FILTERS_SELECTOR);

let map;
let mainPinMarker;
let markerGroup;

function initMap() {
  map = L.map(Constants.MAP_CANVAS_CLASS)
    .on(Constants.MAP_LOAD_EVENT, async () => {
      enableForm(true);
      setAddressCoords(Constants.TOKYO_CENTER);
      await addHostingPinsAsync();
      setupFilters();
    })
    .setView(Constants.TOKYO_CENTER, 10);

  markerGroup = L.layerGroup().addTo(map);
  addMainPin();

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function addMainPin() {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAncor: [26, 52]
  });

  mainPinMarker = L.marker(Constants.TOKYO_CENTER, {
    draggable: true,
    icon: mainPinIcon
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on(Constants.MAP_MARKER_MOOVEND_EVENT, (evt) => {
    setAddressCoords(evt.target.getLatLng());
  });
}

function setAddressCoords(coords) {
  addressElement.value = `${coords.lat.toFixed(Constants.COORDS_FRICTION_DIGITS)}, ${coords.lng.toFixed(Constants.COORDS_FRICTION_DIGITS)}`;
}

function setupFilters() {
  flitersForm.addEventListener(Constants.CHANGE_EVENT, debounceAsync(resetHostingPinsAsync, Constants.MAP_FILTER_DEBOUNCE_DELAY_MS));
}

async function resetHostingPinsAsync() {
  markerGroup.clearLayers();
  map.closePopup();
  await addHostingPinsAsync();
}

async function addHostingPinsAsync() {
  let hostings;
  try {
    hostings = await getHostingsAsnc();
  }
  catch(ex) {
    showErrorAlert('Не удалось получить данные, пожалуйста, повторите поптыку позже');
  }
  const filteredHostings = filterHostings(hostings);
  filteredHostings.forEach((hosting) => addHostingPin(hosting));
}

function addHostingPin(hosting) {
  if (hosting) {
    const hostingPinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAncor: [20, 40]
    });

    const hostingPinMarker = L.marker(hosting.location, {
      icon: hostingPinIcon
    });

    hostingPinMarker
      .addTo(markerGroup)
      .bindPopup(createHostingPopup(popupTemplate, hosting));
  }
}

function resetMap() {
  resetMainPin();
  map.closePopup();
  map.setView(Constants.TOKYO_CENTER, 10);
}

function resetMainPin() {
  mainPinMarker.setLatLng(Constants.TOKYO_CENTER);
  setAddressCoords(Constants.TOKYO_CENTER);
  resetHostingPinsAsync();
}

export { initMap, resetMap };

