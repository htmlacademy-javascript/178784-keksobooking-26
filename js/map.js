import { constants } from './constants.js';
import { toggleActive } from './form.js';
import { getHostingsAsnc } from './data.js';
import { createHostingPopup } from './html-generator.js';
import { showErrorAlert, debounceAsync } from './utils.js';
import { filterHostings } from './filter.js';

const addressElement = document.querySelector('#address');
const popupTemplate = document.querySelector('#card').content
  .querySelector('.popup');
const flitersForm = document.querySelector('.map__filters');

let map;
let mainPinMarker;
let markerGroup;

function initMap() {
  map = L.map('map-canvas')
    .on('load', async () => {
      toggleActive(true);
      setAddressCoords(constants.TOKYO_CENTER);
      try {
        await addHostingPinsAsync();
        setupFilters();
      }
      catch(ex) {
        showErrorAlert('Не удалось получить данные, пожалуйста, повторите поптыку позже');
      }
    })
    .setView(constants.TOKYO_CENTER, 10);

  markerGroup = L.layerGroup().addTo(map);
  addMainPin();

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function setupFilters() {
  flitersForm.addEventListener('change', debounceAsync(resetHostingPinsAsync, 500));
}

function addMainPin() {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAncor: [26, 52]
  });

  mainPinMarker = L.marker(constants.TOKYO_CENTER, {
    draggable: true,
    icon: mainPinIcon
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    setAddressCoords(evt.target.getLatLng());
  });
}

async function addHostingPinsAsync() {
  const hostings = await getHostingsAsnc();
  const filteredHostings = filterHostings(hostings);
  filteredHostings.forEach((hosting) => addHostingPin(hosting));
}

async function resetHostingPinsAsync() {
  markerGroup.clearLayers();
  map.closePopup();
  await addHostingPinsAsync();
}

function addHostingPin(hosting) {
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

function setAddressCoords(coords) {
  addressElement.value = `${coords.lat.toFixed(constants.COORDS_FRICTION_DIGITS)}, ${coords.lng.toFixed(constants.COORDS_FRICTION_DIGITS)}`;
}

function resetMap() {
  resetMainPin();
  map.closePopup();
}

function resetMainPin() {
  mainPinMarker.setLatLng(constants.TOKYO_CENTER);
  setAddressCoords(constants.TOKYO_CENTER);
}

export { initMap, resetMap };

