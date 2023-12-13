export const getMediane = (array) =>
  array.length % 2 === 1
    ? array[Math.floor(array.length / 2)]
    : (array[Math.floor(array.length / 2)] +
        array[Math.floor(array.length / 2) - 1]) /
      2;
