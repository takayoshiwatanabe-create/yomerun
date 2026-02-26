export type Language = "ja" | "en" | "zh" | "ko" | "es" | "fr" | "de" | "pt" | "ar" | "hi";

export const translations: Record<Language, Record<string, string>> = {
  ja: {
    "common.appName": "ヨメルン",
    "home.welcomeTitle": "ヨメルンへようこそ！",
    "home.welcomeSubtitle": "音読を通して、子どもの表現力を育みます。",
  },
  en: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "Welcome to Yomerun!",
    "home.welcomeSubtitle": "Fostering children's expressive power through reading aloud.",
  },
  zh: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "欢迎来到Yomerun！",
    "home.welcomeSubtitle": "通过朗读培养孩子的表达能力。",
  },
  ko: {
    "common.appName": "요메룬",
    "home.welcomeTitle": "요메룬에 오신 것을 환영합니다!",
    "home.welcomeSubtitle": "소리 내어 읽기를 통해 아이들의 표현력을 키웁니다.",
  },
  es: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "¡Bienvenido a Yomerun!",
    "home.welcomeSubtitle": "Fomentando la capacidad de expresión de los niños a través de la lectura en voz alta.",
  },
  fr: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "Bienvenue sur Yomerun !",
    "home.welcomeSubtitle": "Développer la capacité d'expression des enfants par la lecture à voix haute.",
  },
  de: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "Willkommen bei Yomerun!",
    "home.welcomeSubtitle": "Förderung der Ausdrucksfähigkeit von Kindern durch lautes Lesen.",
  },
  pt: {
    "common.appName": "Yomerun",
    "home.welcomeTitle": "Bem-vindo ao Yomerun!",
    "home.welcomeSubtitle": "Promovendo a capacidade expressiva das crianças através da leitura em voz alta.",
  },
  ar: {
    "common.appName": "يوميرون",
    "home.welcomeTitle": "أهلاً بك في يوميرون!",
    "home.welcomeSubtitle": "ننمي قدرة الأطفال التعبيرية من خلال القراءة بصوت عالٍ.",
  },
  hi: {
    "common.appName": "योमेरुन",
    "home.welcomeTitle": "योमेरुन में आपका स्वागत है!",
    "home.welcomeSubtitle": "जोर से पढ़कर बच्चों की अभिव्यंजक शक्ति को बढ़ावा देना।",
  },
};
