import { LanguageType } from '../types';

export interface PastorMessageContent {
  btnText: string;
  title: string;
  subtitle: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
  p10: string;
  amen: string;
  closeBtn: string;
  ctaBtn: string;
}

export const PASTOR_MESSAGE_TRANSLATIONS: Record<LanguageType, PastorMessageContent> = {
  pt: {
    btnText: "Conheça a missão",
    title: "Missão Moçambique",
    subtitle: "App Oficial • First Baptist Orlando",
    p1: "Olá, amigos! Temos uma novidade muito especial que queremos compartilhar com vocês: o App Missão Moçambique!",
    p2: "Uma nova forma de estarmos mais perto dos pastores, das igrejas e das comunidades em Moçambique, compartilhando notícias, testemunhos, pedidos de oração e oportunidades de cooperação.",
    p3: "E temos também um conteúdo muito especial no aplicativo: “As Mais Belas Passagens de Jesus”.",
    p4: "Uma produção em áudio, em Português de Portugal, com quatro volumes que apresentam momentos marcantes da vida de Jesus: O Seu nascimento e ministério, os milagres de Jesus, as parábolas, a crucificação e a ressurreição.",
    p5: "Queremos que a Palavra de Deus chegue a mais pessoas, às famílias, os jovens e às crianças, levando a mensagem de Jesus a diferentes comunidades.",
    p6: "Este aplicativo é também um convite para estarmos unidos nesta missão: orando, servindo e encontrando novas formas de apoiar os nossos irmãos em Moçambique.",
    p7: "Convidamos vocês a conhecerem o App Missão Moçambique e a fazerem parte desta caminhada.",
    p8: "Juntos, conectamos vidas, compartilhamos esperança e levamos a Palavra de Deus mais longe.",
    p9: "Que Deus abençoe Moçambique e toda esta missão.",
    p10: "",
    amen: "Amém!",
    closeBtn: "Fechar",
    ctaBtn: "Passagens de Jesus"
  },
  pt_PT: {
    btnText: "Conheça a missão",
    title: "Missão Moçambique",
    subtitle: "App Oficial • First Baptist Orlando",
    p1: "Olá, amigos! Temos uma novidade muito especial que queremos compartilhar com vocês: o App Missão Moçambique!",
    p2: "Uma nova forma de estarmos mais perto dos pastores, das igrejas e das comunidades em Moçambique, compartilhando notícias, testemunhos, pedidos de oração e oportunidades de cooperação.",
    p3: "E temos também um conteúdo muito especial no aplicativo: “As Mais Belas Passagens de Jesus”.",
    p4: "Uma produção em áudio, em Português de Portugal, com quatro volumes que apresentam momentos marcantes da vida de Jesus: O Seu nascimento e ministério, os milagres de Jesus, as parábolas, a crucificação e a ressurreição.",
    p5: "Queremos que a Palavra de Deus chegue a mais pessoas, às famílias, os jovens e às crianças, levando a mensagem de Jesus a diferentes comunidades.",
    p6: "Este aplicativo é também um convite para estarmos unidos nesta missão: orando, servindo e encontrando novas formas de apoiar os nossos irmãos em Moçambique.",
    p7: "Convidamos vocês a conhecerem o App Missão Moçambique e a fazerem parte desta caminhada.",
    p8: "Juntos, conectamos vidas, compartilhamos esperança e levamos a Palavra de Deus mais longe.",
    p9: "Que Deus abençoe Moçambique e toda esta missão.",
    p10: "",
    amen: "Ámen!",
    closeBtn: "Fechar",
    ctaBtn: "Passagens de Jesus"
  },
  en: {
    btnText: "Discover the Mission",
    title: "Mozambique Mission",
    subtitle: "Official App • First Baptist Orlando",
    p1: "Hello friends! We have very special news to share with you: the Mozambique Mission App!",
    p2: "A new way to be closer to pastors, churches, and communities in Mozambique, sharing news, testimonies, prayer requests, and opportunities for cooperation.",
    p3: "And we also have very special content in the app: “The Most Beautiful Passages of Jesus”.",
    p4: "An audio production in European Portuguese, featuring four volumes presenting milestone moments of Jesus' life: His birth and ministry, miracles, parables, crucifixion, and resurrection.",
    p5: "We want God's Word to reach more people, families, youth, and children, bringing the message of Jesus to different communities.",
    p6: "This app is also an invitation to be united in this mission: praying, serving, and finding new ways to support our brothers and sisters in Mozambique.",
    p7: "We invite you to get to know the Mozambique Mission App and be part of this journey.",
    p8: "Together, we connect lives, share hope, and take God's Word further.",
    p9: "May God bless Mozambique and this entire mission.",
    p10: "",
    amen: "Amen!",
    closeBtn: "Close",
    ctaBtn: "Passages of Jesus"
  },
  es: {
    btnText: "Conoce la misión",
    title: "Misión Mozambique",
    subtitle: "App Oficial • First Baptist Orlando",
    p1: "¡Hola amigos! Tenemos una noticia muy especial que compartir con ustedes: ¡la App Misión Mozambique!",
    p2: "Una nueva forma de estar más cerca de los pastores, iglesias y comunidades en Mozambique, compartiendo noticias, testimonios, peticiones de oración y oportunidades de cooperación.",
    p3: "Y también tenemos un contenido muy especial en la aplicación: “Los Pasajes Más Hermosos de Jesús”.",
    p4: "Una producción en audio, en portugués de Portugal, con cuatro volúmenes que presentan momentos destacados de la vida de Jesús: Su nacimiento y ministerio, milagros, parábolas, crucifixión y resurrección.",
    p5: "Queremos que la Palabra de Deus llegue a más personas, familias, jóvenes y niños, llevando el mensaje de Jesús a diferentes comunidades.",
    p6: "Esta aplicación es también una invitación a estar unidos en esta misión: orando, sirviendo y encontrando nuevas formas de apoyar a nuestros hermanos en Mozambique.",
    p7: "Les invitamos a conocer la App Misión Mozambique y a ser parte de este camino.",
    p8: "Juntos, conectamos vidas, compartimos esperanza y llevamos la Palabra de Dios más lejos.",
    p9: "Que Dios bendiga a Mozambique y a toda esta misión.",
    p10: "",
    amen: "¡Amén!",
    closeBtn: "Cerrar",
    ctaBtn: "Pasajes de Jesús"
  }
};

export const getPastorMessageContent = (lang: LanguageType): PastorMessageContent => {
  return PASTOR_MESSAGE_TRANSLATIONS[lang] || PASTOR_MESSAGE_TRANSLATIONS.pt;
};
