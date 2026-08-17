// Kakao JS SDK Official Default Feed Template Implementation
// Based on https://developers.kakao.com/docs/ko/message-template/default#feed-object

export const KAKAO_APP_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '25064adbf382bf6e0273e6da584c8017';
const BASE_PRODUCTION_DOMAIN = 'https://bdsm-zero.vercel.app';

let kakaoSdkLoaded = false;
let kakaoSdkLoading = false;
let kakaoSdkCallbacks: Array<() => void> = [];

export function isKakaoInitialized(): boolean {
  if (typeof window === 'undefined') return false;
  // @ts-expect-error Kakao SDK
  return !!(window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized());
}

export function initKakaoSync(): boolean {
  if (typeof window === 'undefined') return false;
  // @ts-expect-error Kakao SDK
  const kakao = window.Kakao;
  if (!kakao) return false;

  if (!kakao.isInitialized()) {
    try {
      kakao.init(KAKAO_APP_KEY);
    } catch (e) {
      console.error('Kakao init error', e);
      return false;
    }
  }
  return kakao.isInitialized();
}

export function loadKakaoSDK(callback: () => void) {
  if (typeof window === 'undefined') return;

  if (isKakaoInitialized()) {
    callback();
    return;
  }

  if (initKakaoSync()) {
    callback();
    return;
  }

  kakaoSdkCallbacks.push(callback);
  if (kakaoSdkLoading) return;
  kakaoSdkLoading = true;

  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    kakaoSdkLoaded = true;
    kakaoSdkLoading = false;
    initKakaoSync();
    kakaoSdkCallbacks.forEach((cb) => cb());
    kakaoSdkCallbacks = [];
  };
  script.onerror = () => {
    kakaoSdkLoading = false;
    kakaoSdkCallbacks.forEach((cb) => cb());
    kakaoSdkCallbacks = [];
  };
  document.head.appendChild(script);
}

export interface SendKakaoFeedParams {
  title: string;
  description: string;
  imageUrl?: string;
  targetUrl: string;
  buttonTitle: string;
}

export function shareKakaoFeed({
  title,
  description,
  imageUrl,
  targetUrl,
  buttonTitle
}: SendKakaoFeedParams): boolean {
  if (typeof window === 'undefined') return false;

  // @ts-expect-error Kakao SDK
  const kakao = window.Kakao;
  if (!kakao) {
    console.error('Kakao SDK not available on window');
    return false;
  }

  if (!kakao.isInitialized()) {
    try {
      kakao.init(KAKAO_APP_KEY);
    } catch (e) {
      console.error('Failed to initialize Kakao SDK', e);
      return false;
    }
  }

  const validTargetUrl = targetUrl || BASE_PRODUCTION_DOMAIN;
  const validImageUrl = imageUrl || `${BASE_PRODUCTION_DOMAIN}/app-icon.png`;

  try {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: validImageUrl,
        imageWidth: 800,
        imageHeight: 800,
        link: {
          mobileWebUrl: validTargetUrl,
          webUrl: validTargetUrl
        }
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: validTargetUrl,
            webUrl: validTargetUrl
          }
        }
      ]
    });
    return true;
  } catch (e) {
    console.error('Kakao Share.sendDefault error:', e);
    return false;
  }
}
