/**
 * UTM Campaign Parameter Tracking Utility
 */

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const STORAGE_KEY = 'mediequip360_utm_params';

export function captureUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys: (keyof UTMParameters)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  const captured: UTMParameters = {};
  let hasUTMs = false;

  utmKeys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) {
      captured[key] = val;
      hasUTMs = true;
    }
  });

  if (hasUTMs) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch (e) {
      console.warn('Session storage unavailable for UTM params');
    }
    return captured;
  }

  return getStoredUTMParameters();
}

export function getStoredUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
}
