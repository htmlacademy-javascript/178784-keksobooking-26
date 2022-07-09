import { CONSTANTS } from './constants.js';
import { toggleActive } from './form.js';
import { createHostings } from './data.js';
import { createHostingPopup } from './html-generator.js';

const addressElement = document.querySelector('#address');
const popupTemplate = document.querySelector('#card').content
  .querySelector('.popup');
const hostings = createHostings(10);
let map;
let markerGroup;

function initMap() {
  map = L.map('map-canvas')
    .on('load', () => {
      toggleActive(true);
      setCoords(addressElement, CONSTANTS.TOKYO_CENTER);
    })
    .setView(CONSTANTS.TOKYO_CENTER, 10);

  markerGroup = L.layerGroup().addTo(map);
  addMainPin();
  addHostingPins();

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

  const mainPinMarker = L.marker(CONSTANTS.TOKYO_CENTER, {
    draggable: true,
    icon: mainPinIcon
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    setCoords(addressElement, evt.target.getLatLng());
  });
}

function setCoords(inputElement, coords) {
  inputElement.value = `${coords.lat.toFixed(CONSTANTS.COORDS_FRICTION_DIGITS)}, ${coords.lng.toFixed(CONSTANTS.COORDS_FRICTION_DIGITS)}`;
}

function addHostingPins() {
  hostings.forEach((hosting) => addHostingPin(hosting));
}

function addHostingPin(hosting) {
  const hostingPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAncor: [20, 40]
  });

  const mainPinMarker = L.marker(hosting.location, {
    icon: hostingPinIcon
  });

  mainPinMarker
    .addTo(markerGroup)
    .bindPopup(createHostingPopup(popupTemplate, hosting));
}

export { initMap };

