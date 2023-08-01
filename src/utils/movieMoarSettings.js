export const movieMoarSettings = () => {
  if (window.innerWidth > 1320)
    return {
      initial: 12,
      increase: 3
    }

  if (window.innerWidth > 768)
    return {
      initial: 8,
      increase: 2
    }

  return {
    initial: 5,
    increase: 2
  }
};