export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  const memory = (navigator as any).deviceMemory ?? 4;
  const ua = navigator.userAgent.toLowerCase();
  const isIOSLowPower = /iphone|ipad/.test(ua) && (navigator as any).hardwareConcurrency <= 2;
  return memory < 4 || isIOSLowPower;
}
