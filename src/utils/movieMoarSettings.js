import { RESIZE_SETTINGS } from './constants';

export const movieMoarSettings = () => {
  for (let setting of RESIZE_SETTINGS) {
    if (window.innerWidth > setting.width)
      return setting
  }
};