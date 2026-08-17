// Kakao JS SDK Official Default Feed Template Implementation
// Based on https://developers.kakao.com/docs/ko/message-template/default#feed-object

const KAKAO_APP_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '91f0317e2a9d5d066924b829dc5e8318';

const BASE_PRODUCTION_DOMAIN = 'https://bdsm-zero.vercel.app';

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
    } catch (e) {
      console.error('Failed to init Kakao SDK', e);
    }
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
      console.error('Kakao init error on script load', e);
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
    // Official Kakao Feed Template (JavaScript SDK)
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
