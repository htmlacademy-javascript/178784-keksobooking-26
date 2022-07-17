async function getHostingsAsnc() {
  const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

async function sendFormAsync(formData) {
  const response = await fetch('https://26.javascript.pages.academy/keksobooking1', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
}

export { getHostingsAsnc, sendFormAsync };
