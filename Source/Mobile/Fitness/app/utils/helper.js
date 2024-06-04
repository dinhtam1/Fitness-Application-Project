export const convertToString = value => {
  let result = value.split('_').join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const getRandomElements = (arr, n) => {
  console.log('arr:', arr);
  const result = [];
  const chosenIndices = [];
  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!chosenIndices.includes(randomIndex)) {
      result.push(arr[randomIndex]);
      chosenIndices.push(randomIndex);
    }
  }
  return result;
};

export const getTimeToString = minutes => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  return `${formattedHours}:${formattedMinutes}`;
};
