export const isProd = process.env.NODE_ENV === 'production';
export const isBrowser = typeof window !== 'undefined';

export { default as RouteStatus } from './RouteStatus';
export { default as createMarkup } from './createMarkup';
export { default as isNumber } from './isNumber';
export { default as metrics } from './metrics';
export { default as createSession } from './createSession';
export { default as formatDate } from './formatDate';
export { default as exitFullscreen } from './exitFullscreen';
