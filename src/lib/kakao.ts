// Kakao JS SDK - 100% Identical Architecture to Proven Wedding Invitation
// Key: b284a968f36e582c3034ecfe545e179b

export const KAKAO_APP_KEY = 'b284a968f36e582c3034ecfe545e179b';
const BASE_PRODUCTION_DOMAIN = 'https://bdsm.zozero94.com';

let kakaoSdkLoaded = false;
let kakaoSdkLoading = false;
let kakaoSdkCallbacks: Array<() => void> = [];

export function loadKakaoSDK(callback: () => void) {
  if (typeof window === 'undefined') return;

  // @ts-expect-error Kakao SDK
  if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()) {
    callback();
    return;
  }

  // @ts-expect-error Kakao SDK
  if (window.Kakao && window.Kakao.init) {
    try {
      // @ts-expect-error Kakao SDK
      if (!window.Kakao.isInitialized()) {
        // @ts-expect-error Kakao SDK
        window.Kakao.init(KAKAO_APP_KEY);
      }
      callback();
      return;
    } catch {
      // ignore
    }
  }

  if (kakaoSdkLoaded) {
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
    try {
      // @ts-expect-error Kakao SDK
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // @ts-expect-error Kakao SDK
        window.Kakao.init(KAKAO_APP_KEY);
      }
    } catch (e) {
      console.error('Kakao init error on load', e);
    }
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
  if (!kakao) return false;

  try {
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_APP_KEY);
    }
  } catch {
    return false;
  }

  const validImageUrl = imageUrl || `${BASE_PRODUCTION_DOMAIN}/app-icon.png`;
  const validTargetUrl = targetUrl || BASE_PRODUCTION_DOMAIN;

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
    console.error('Kakao Share failed:', e);
    return false;
  }
}
