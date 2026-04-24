import type { Quality } from '@streetfit/lib';
export const chooseQuality = (): Quality => {
  if (typeof window === 'undefined') return 'medium';
  const webgl = !!document.createElement('canvas').getContext('webgl2');
  return webgl ? 'medium' : 'low';
};
