import {generateHostingDomElements} from './html-generator.js';


const hostingsElements = generateHostingDomElements(5);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.append(hostingsElements[0]);
