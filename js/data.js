import { Constants } from './constants.js';

async function getHostingsAsnc() {
  const response = await fetch(`${Constants.KEKSOBOOKING_ENDPOINT}/data`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

async function sendFormAsync(formData) {
  const response = await fetch(Constants.KEKSOBOOKING_ENDPOINT, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
}

export { getHostingsAsnc, sendFormAsync };
