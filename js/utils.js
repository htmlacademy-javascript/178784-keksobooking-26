function getRandomInteger(min, max) {
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max, decimalPlaces) {
  if (min < 0) {
    throw new Error('Aргумент min должен быть неотрицательным');
  }
  if (min >= max) {
    throw new Error('Aргумент min должен быть больше max');
  }

  const random = (Math.random() * (max - min + 1) + min);
  const fixed = random.toFixed(decimalPlaces);
  return +fixed;
}

function getRandomArray(sourceItems) {
  const length = getRandomInteger(1, sourceItems.length);
  const result = [];
  for(let i = 0; i < length; i++) {
    result.push(sourceItems[getRandomInteger(0, sourceItems - 1)]);
  }
  return [...new Set(result)];
}

export { getRandomInteger, getRandomFloat, getRandomArray };
