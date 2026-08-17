// Kakao SDK Loader & Sharing Helper based on proven wedding-invitation architecture

const KAKAO_APP_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '91f0317e2a9d5d066924b829dc5e8318';

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
      console.error('Failed to init Kakao', e);
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
  if (!kakao) {
    console.error('Kakao SDK not found');
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

  // Ensure robust absolute HTTPS static image (Kakao scraper requires instant response)
  const finalImageUrl =
    imageUrl || 'https://bdsm-zero.vercel.app/app-icon.png';

  try {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: finalImageUrl,
        imageWidth: 800,
        imageHeight: 800,
        link: {
          mobileWebUrl: targetUrl,
          webUrl: targetUrl
        }
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: targetUrl,
            webUrl: targetUrl
          }
        }
      ]
    });
    return true;
  } catch (e) {
    console.error('Kakao Share.sendDefault failed:', e);
    return false;
  }
}
