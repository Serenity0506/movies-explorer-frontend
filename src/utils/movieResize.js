export const movieResize = () => {
  const number = {
    initial: 12,
    add: 3,
  };
  if (window.innerWidth < 1100) {
    number.initial = 8;
    number.add = 2;
  }
  if (window.innerWidth < 690) {
    number.initial = 5;
    number.add = 1;
  }
  return number;
};