function getRandomInteger(min, max) {
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }
  return Math.floor(Math.random()*(max-min)+min);
}

function getRandomFloat(min, max, decimalPlaces) {
  if (min < 0) {
    throw new Error('Aргумент min должен быть неотрицательным');
  }
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }

  const random = (Math.random()*(max-min)+min);
  const fixed = random.toFixed(decimalPlaces);
  return +fixed;
}
