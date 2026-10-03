import { JesusPassage, NewsItem, MissionProject, PrayerRequest, LanguageType } from '../types';
import childrenGroup2 from '../assets/images/children_group_2_1784054774596.jpg';
import childrenCloseUp from '../assets/images/children_close_up_1784054763230.jpg';

export const SYSTEM_ADMIN_EMAIL = "brenofelipe.pimentel@gmail.com";

export const JESUS_PASSAGES: JesusPassage[] = [
  {
    id: "ep1",
    episode: 1,
    title: "O Nascimento e o Ministério de Jesus",
    description: "Acompanhe as passagens que marcam o começo da vida e do ministério de Jesus.",
    bibleText: "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade. João escreveu sobre ele e clamou: 'Este é aquele de quem eu disse: O que vem depois de mim é antes de mim, porque já era primeiro do que eu'. (João 1:14-15)",
    audioUrls: {
      pt: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      pt_PT: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      en: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    duration: "4:12",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "ep2",
    episode: 2,
    title: "Os Milagres de Jesus",
    description: "Descubra os milagres que revelam o poder, a compaixão e o amor de Jesus.",
    bibleText: "E Jesus, saindo, viu uma grande multidão, e possuído de íntima compaixão para com ela, curou os seus enfermos. E, ao anoitecer, aproximaram-se dele os seus discípulos, dizendo: O lugar é deserto, e a hora é já avançada; despede a multidão, para que vão pelas aldeias, e comprem comida para si. Jesus, porém, lhes disse: Não é mister que vão; dai-lhes vós de comer. (Mateus 14:14-16)",
    audioUrls: {
      pt: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      pt_PT: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      en: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    duration: "6:45",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "ep3",
    episode: 3,
    title: "As Parábolas de Jesus",
    description: "Histórias simples que ensinam verdades profundas para a vida de todos nós.",
    bibleText: "Outra parábola lhes propôs, dizendo: O reino dos céus é semelhante ao grão de mostarda que um homem pegou e semeou no seu campo; O qual é realmente a menor de todas as sementes; mas, crescendo, é a maior das plantas, e faz-se uma árvore, de sorte que vêm as aves do céu, e se anidam nos seus ramos. (Mateus 13:31-32)",
    audioUrls: {
      pt: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      pt_PT: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      en: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    duration: "5:20",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "ep4",
    episode: 4,
    title: "A Crucificação e a Ressurreição",
    description: "Acompanhe os últimos dias de Jesus, sua morte, ressurreição e a vitória que transforma vidas.",
    bibleText: "Mas o anjo, respondendo, disse às mulheres: Não tenhais medo; pois eu sei que buscais a Jesus, que foi crucificado. Ele não está aqui, porque já ressuscitou, como havia dito. Vinde e vede o lugar onde o Senhor jazia. E ide depressa, e dizei aos seus discípulos que já ressuscitou dos mortos. (Mateus 28:5-7)",
    audioUrls: {
      pt: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      pt_PT: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      en: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    },
    duration: "8:15",
    image: "https://images.unsplash.com/photo-1544860707-c3fe04945412?w=800&auto=format&fit=crop&q=80"
  }
];

export function getLocalizedJesusPassages(lang: LanguageType = 'pt'): JesusPassage[] {
  if (lang === 'en') {
    return [
      {
        id: "ep1",
        episode: 1,
        title: "The Birth and Ministry of Jesus",
        description: "Follow the sacred passages that mark the beginning of Jesus' life and earthly ministry.",
        bibleText: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth. (John 1:14)",
        audioUrls: JESUS_PASSAGES[0].audioUrls,
        duration: JESUS_PASSAGES[0].duration,
        image: JESUS_PASSAGES[0].image
      },
      {
        id: "ep2",
        episode: 2,
        title: "The Miracles of Jesus",
        description: "Discover the miracles that reveal the divine power, compassion, and endless love of Jesus.",
        bibleText: "When Jesus landed and saw a large crowd, he had compassion on them and healed their sick... Jesus replied, 'They do not need to go away. You give them something to eat.' (Matthew 14:14-16)",
        audioUrls: JESUS_PASSAGES[1].audioUrls,
        duration: JESUS_PASSAGES[1].duration,
        image: JESUS_PASSAGES[1].image
      },
      {
        id: "ep3",
        episode: 3,
        title: "The Parables of Jesus",
        description: "Simple stories that teach profound eternal truths for every human heart.",
        bibleText: "He told them another parable: 'The kingdom of heaven is like a mustard seed, which a man took and planted in his field. Though it is the smallest of all seeds, yet when it grows, it is the largest of garden plants.' (Matthew 13:31-32)",
        audioUrls: JESUS_PASSAGES[2].audioUrls,
        duration: JESUS_PASSAGES[2].duration,
        image: JESUS_PASSAGES[2].image
      },
      {
        id: "ep4",
        episode: 4,
        title: "The Crucifixion and Resurrection",
        description: "Witness the decisive moments of Jesus' mission on earth, His sacrifice, and the glorious resurrection.",
        bibleText: "The angel said to the women, 'Do not be afraid, for I know that you are looking for Jesus, who was crucified. He is not here; he has risen, just as he said.' (Matthew 28:5-6)",
        audioUrls: JESUS_PASSAGES[3].audioUrls,
        duration: JESUS_PASSAGES[3].duration,
        image: JESUS_PASSAGES[3].image
      }
    ];
  }
  if (lang === 'es') {
    return [
      {
        id: "ep1",
        episode: 1,
        title: "El Nacimiento y Ministerio de Jesús",
        description: "Siga los pasajes sagrados que marcan el comienzo de la vida y el ministerio terrenal de Jesús.",
        bibleText: "Y el Verbo se hizo carne, y habitó entre nosotros, y vimos su gloria, gloria como del unigénito del Padre, lleno de gracia y de verdad. (Juan 1:14)",
        audioUrls: JESUS_PASSAGES[0].audioUrls,
        duration: JESUS_PASSAGES[0].duration,
        image: JESUS_PASSAGES[0].image
      },
      {
        id: "ep2",
        episode: 2,
        title: "Los Milagros de Jesús",
        description: "Descubra los milagros que revelan el poder supremo, la compasión y el amor de Jesús.",
        bibleText: "Y saliendo Jesús, vio una gran multitud, y tuvo compasión de ellos, y sanó a los que de ellos estaban enfermos... Jesús les dijo: No tienen necesidad de irse; dadles vosotros de comer. (Mateo 14:14-16)",
        audioUrls: JESUS_PASSAGES[1].audioUrls,
        duration: JESUS_PASSAGES[1].duration,
        image: JESUS_PASSAGES[1].image
      },
      {
        id: "ep3",
        episode: 3,
        title: "Las Parábolas de Jesús",
        description: "Historias sencillas que enseñan verdades profundas para la vida de todos nosotros.",
        bibleText: "Otra parábola les refirió, diciendo: El reino de los cielos es semejante al grano de mostaza, que un hombre tomó y sembró en su campo; el cual a la verdad es la más pequeña de todas las semillas; pero cuando ha crecido, es la mayor de las hortalizas. (Mateo 13:31-32)",
        audioUrls: JESUS_PASSAGES[2].audioUrls,
        duration: JESUS_PASSAGES[2].duration,
        image: JESUS_PASSAGES[2].image
      },
      {
        id: "ep4",
        episode: 4,
        title: "La Crucifixión y Resurrección",
        description: "Acompañe los momentos decisivos de la misión de Jesús, su muerte redentora y la gloriosa resurrección.",
        bibleText: "Mas el ángel, respondiendo, dijo a las mujeres: No temáis vosotras; porque yo sé que buscáis a Jesús, el que fue crucificado. No está aquí, pues ha resucitado, como dijo. (Mateo 28:5-6)",
        audioUrls: JESUS_PASSAGES[3].audioUrls,
        duration: JESUS_PASSAGES[3].duration,
        image: JESUS_PASSAGES[3].image
      }
    ];
  }
  return JESUS_PASSAGES;
}

export const BIBLE_BOOKS = [
  {
    name: "Mateus",
    testament: "Novo Testamento",
    chapters: [
      {
        number: 1,
        verses: [
          "1 Livro da geração de Jesus Cristo, filho de Davi, filho de Abraão.",
          "2 Abraão gerou a Isaque; e Isaque gerou a Jacó; e Jacó gerou a Judá e a seus irmãos;",
          "18 Ora, o nascimento de Jesus Cristo foi assim: Estando Maria, sua mãe, desposada com José, antes que se ajuntassem, achou-se ter concebido do Espírito Santo.",
          "19 Então José, seu marido, como era justo, e não a queria infamar, intentou deixá-la secretamente.",
          "20 E, projetando ele isto, eis que em sonho lhe apareceu um anjo do Senhor, dizendo: José, filho de Davi, não temas receber a Maria, tua mulher, porque o que nela está gerado é do Espírito Santo;",
          "21 E dará à luz um filho e chamarás o seu nome JESUS; porque ele salvará o seu povo dos seus pecados.",
          "22 Tudo isto aconteceu para que se cumprisse o que foi dito da parte do Senhor, pelo profeta, que diz;",
          "23 Eis que a virgem conceberá, e dará à luz um filho, e chamá-lo-ão pelo nome de EMANUEL, que traduzido é: Deus conosco.",
          "24 E José, despertando do sono, fez como o anjo do Senhor lhe ordenara, e recebeu a sua mulher;",
          "25 E não a conheceu até que deu à luz seu filho, o primogênito; e pôs-lhe por nome JESUS."
        ]
      }
    ]
  },
  {
    name: "João",
    testament: "Novo Testamento",
    chapters: [
      {
        number: 1,
        verses: [
          "1 No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
          "2 Ele estava no princípio com Deus.",
          "3 Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.",
          "4 Nele estava a vida, e a vida era a luz dos homens.",
          "5 E a luz resplandece nas trevas, e as trevas não a compreenderam.",
          "14 E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade."
        ]
      },
      {
        number: 3,
        verses: [
          "16 Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
          "17 Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele."
        ]
      }
    ]
  },
  {
    name: "Salmos",
    testament: "Antigo Testamento",
    chapters: [
      {
        number: 23,
        verses: [
          "1 O Senhor é o meu pastor, nada me faltará.",
          "2 Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
          "3 Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.",
          "4 Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam."
        ]
      },
      {
        number: 121,
        verses: [
          "1 Elevo os meus olhos para os montes; de onde me vem o socorro?",
          "2 O meu socorro vem do Senhor, que fez os céus e a terra.",
          "3 Não deixará vacilar o teu pé; aquele que te guarda não tosquenejará."
        ]
      }
    ]
  },
  {
    name: "Romanos",
    testament: "Novo Testamento",
    chapters: [
      {
        number: 8,
        verses: [
          "1 Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.",
          "28 E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
          "31 Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?"
        ]
      }
    ]
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news1",
    title: "Equipe realiza ação social em Nampula",
    summary: "Atendimento médico básico, distribuição de poços de água e ensino bíblico beneficiou mais de 500 famílias locais.",
    content: "No dia 12 de maio de 2025, os voluntários e parceiros do projeto Missão Moçambique iniciaram uma das maiores operações humanitárias do semestre em Nampula. Foi inaugurado um poço artesiano de água potável comunitária que agora serve a mais de 120 crianças e suas respectivas famílias, além de triagens preventivas de saúde. Paralelamente, materiais didáticos impressos foram distribuídos nas reuniões ao ar livre sobre as passagens de Jesus.",
    date: "12 de maio de 2025",
    image: childrenGroup2,
    author: "Claudio Rios"
  },
  {
    id: "news2",
    title: "Capacitação profissional avança em Beira",
    summary: "Sucesso no encerramento da primeira turma de corte e costura para mães de família.",
    content: "O projeto de sustentabilidade e empreendedorismo social formou 25 alunas em sua primeira turma oficial de corte e costura no novo centro de treinamento missionário em Beira. A First Baptist Orlando apoiou a doação de máquinas de costura mecânicas para que as novas artesãs possam confeccionar e comercializar vestimentas e acessórios, fomentando a renda familiar e gerando autonomia integral às famílias amparadas.",
    date: "04 de junho de 2026",
    image: childrenCloseUp,
    author: "Lucas Araujo"
  }
];

export const MISSION_PROJECTS: MissionProject[] = [
  {
    id: "proj1",
    title: "Poços de Água Potável",
    description: "Construção de poços profundos em aldeias isoladas para erradicar doenças de veiculação hídrica.",
    impact: "Mais de 10 poços ativos beneficiando 3.000 pessoas.",
    status: "Em Andamento"
  },
  {
    id: "proj2",
    title: "Escola Comunitária Farol",
    description: "Apoio pedagógico, alimentação diária e alfabetização bíblica em regiões com alta taxa de evasão escolar.",
    impact: "180 crianças cadastradas e recebendo duas refeições ricas em nutrientes diariamente.",
    status: "Em Andamento"
  },
  {
    id: "proj3",
    title: "Microcrédito de Talentos",
    description: "Capacitação profissionalizante e pequenos incentivos em recursos para pequenos negócios de costura e agricultura familiar.",
    impact: "40 famílias agora autossustentáveis na comercialização de alimentos e tecidos.",
    status: "Concluído"
  }
];

export const DEFAULT_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: "pr1",
    author: "Ir. Maria de Nampula",
    requestText: "Peço de coração que orem pela saúde das nossas crianças de Moçambique que enfrentam resfriados devido à mudança de estação. Que o Senhor dê forças aos cuidadores.",
    category: "Saúde",
    createdAt: "2026-06-10T12:00:00Z",
    likes: 24,
    likedByCurrentUser: false
  },
  {
    id: "pr2",
    author: "Pr. António S.",
    requestText: "Pela viagem da nova equipa de voluntários da First Orlando que virá apoiar as ações no Ministério de Língua Portuguesa em breve. Que a estrada seja segura.",
    category: "Missões",
    createdAt: "2026-06-09T08:30:00Z",
    likes: 38,
    likedByCurrentUser: true
  },
  {
    id: "pr3",
    author: "Ana Cláudia Mendes",
    requestText: "Agradecimento a Deus pelo novo poço inaugurado semana passada. Água limpa para todos os nossos irmãos!",
    category: "Agradecimento",
    createdAt: "2026-06-08T15:45:00Z",
    likes: 15,
    likedByCurrentUser: false
  }
];

export function getLocalizedPrayerRequests(lang: LanguageType = 'pt'): PrayerRequest[] {
  if (lang === 'en') {
    return [
      {
        id: "pr1",
        author: "Sister Mary (Nampula)",
        requestText: "I ask from the bottom of my heart that you pray for the health of our children in Mozambique facing seasonal colds. May the Lord grant strength to the caregivers.",
        category: "Saúde",
        createdAt: "2026-06-10T12:00:00Z",
        likes: 24,
        likedByCurrentUser: false
      },
      {
        id: "pr2",
        author: "Pastor Anthony S.",
        requestText: "For the safe travel of the new First Orlando volunteer team coming to support the Portuguese Ministry initiatives soon. May their journey be blessed and safe.",
        category: "Missões",
        createdAt: "2026-06-09T08:30:00Z",
        likes: 38,
        likedByCurrentUser: true
      },
      {
        id: "pr3",
        author: "Anna Claudia Mendes",
        requestText: "Praise and thanksgiving to God for the new water well dedicated last week. Clean fresh water for all our brothers and sisters!",
        category: "Agradecimento",
        createdAt: "2026-06-08T15:45:00Z",
        likes: 15,
        likedByCurrentUser: false
      }
    ];
  }
  if (lang === 'es') {
    return [
      {
        id: "pr1",
        author: "Hna. María (Nampula)",
        requestText: "Pido de corazón que oren por la salud de nuestros niños de Mozambique que enfrentan resfriados por el cambio de estación. Que el Señor dé fuerzas a los cuidadores.",
        category: "Saúde",
        createdAt: "2026-06-10T12:00:00Z",
        likes: 24,
        likedByCurrentUser: false
      },
      {
        id: "pr2",
        author: "Pastor Antonio S.",
        requestText: "Por el viaje del nuevo equipo de voluntarios de First Orlando que vendrá a apoyar las labores del Ministerio en Portugués en breve. Que el camino sea seguro.",
        category: "Missões",
        createdAt: "2026-06-09T08:30:00Z",
        likes: 38,
        likedByCurrentUser: true
      },
      {
        id: "pr3",
        author: "Ana Claudia Mendes",
        requestText: "Agradecimiento a Dios por el nuevo pozo inaugurado la semana pasada. ¡Agua limpia para todos nuestros hermanos!",
        category: "Agradecimento",
        createdAt: "2026-06-08T15:45:00Z",
        likes: 15,
        likedByCurrentUser: false
      }
    ];
  }
  return DEFAULT_PRAYER_REQUESTS;
}

export const DAILY_VERSES = [
  {
    text: "\"Ide por todo o mundo, pregai o evangelho a toda criatura.\"",
    reference: "Marcos 16:15",
    theme: "Missão Global"
  },
  {
    text: "\"O Senhor é o meu pastor, nada me faltará.\"",
    reference: "Salmos 23:1",
    theme: "Provisão e Proteção"
  },
  {
    text: "\"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\"",
    reference: "João 3:16",
    theme: "Amor Eterno"
  },
  {
    text: "\"Como, pois, invocarão aquele em quem não creram? E como crerão naquele de quem não ouviram? E como ouvirão, se não houver quem pregue?\"",
    reference: "Romanos 10:14",
    theme: "Chamado Missionário"
  },
  {
    text: "\"E a vida eterna é esta: que te conheçam, a ti só, por único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.\"",
    reference: "João 17:3",
    theme: "Vida Eterna"
  },
  {
    text: "\"A colheita é grande, mas os trabalhadores são poucos. Peçam, pois, ao Senhor da colheita que envie trabalhadores para a sua colheita.\"",
    reference: "Mateus 9:37-38",
    theme: "Trabalhadores na Colheita"
  },
  {
    text: "\"Mas receberão poder quando o Espírito Santo descer sobre vocês, e serão minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria, e até os confins da terra.\"",
    reference: "Atos 1:8",
    theme: "Testemunhas do Evangelho"
  },
  {
    text: "\"Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo.\"",
    reference: "Mateus 28:19",
    theme: "A Grande Comissão"
  },
  {
    text: "\"O que de graça recebestes, de graça dai.\"",
    reference: "Mateus 10:8",
    theme: "Generosidade e Graça"
  },
  {
    text: "\"Os que semeiam com lágrimas com júbilo ceifarão.\"",
    reference: "Salmos 126:5",
    theme: "Esperança e Perseverança"
  }
];

const LOCALIZED_DAILY_VERSES: Record<LanguageType, Array<{ text: string; reference: string; theme: string }>> = {
  pt: [
    { text: "\"Ide por todo o mundo, pregai o evangelho a toda criatura.\"", reference: "Marcos 16:15", theme: "Missão Global" },
    { text: "\"O Senhor é o meu pastor, nada me faltará.\"", reference: "Salmos 23:1", theme: "Provisão e Proteção" },
    { text: "\"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\"", reference: "João 3:16", theme: "Amor Eterno" },
    { text: "\"Como, pois, invocarão aquele em quem não creram? E como crerão naquele de quem não ouviram? E como ouvirão, se não houver quem pregue?\"", reference: "Romanos 10:14", theme: "Chamado Missionário" },
    { text: "\"E a vida eterna é esta: que te conheçam, a ti só, por único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.\"", reference: "João 17:3", theme: "Vida Eterna" },
    { text: "\"A colheita é grande, mas os trabalhadores são poucos. Peçam, pois, ao Senhor da colheita que envie trabalhadores para a sua colheita.\"", reference: "Mateus 9:37-38", theme: "Trabalhadores na Colheita" },
    { text: "\"Mas receberão poder quando o Espírito Santo descer sobre vocês, e serão minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria, e até os confins da terra.\"", reference: "Atos 1:8", theme: "Testemunhas do Evangelho" },
    { text: "\"Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo.\"", reference: "Mateus 28:19", theme: "A Grande Comissão" },
    { text: "\"O que de graça recebestes, de graça dai.\"", reference: "Mateus 10:8", theme: "Generosidade e Graça" },
    { text: "\"Os que semeiam com lágrimas com júbilo ceifarão.\"", reference: "Salmos 126:5", theme: "Esperança e Perseverança" }
  ],
  pt_PT: [
    { text: "\"Ide por todo o mundo e pregai o evangelho a toda a criatura.\"", reference: "Marcos 16:15", theme: "Missão Global" },
    { text: "\"O Senhor é o meu pastor, nada me faltará.\"", reference: "Salmos 23:1", theme: "Provisão e Proteção" },
    { text: "\"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigénito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\"", reference: "João 3:16", theme: "Amor Eterno" },
    { text: "\"Como, pois, invocarão aquele em quem não creram? E como crerão naquele de quem não ouviram? E como ouvirão, se não houver quem pregue?\"", reference: "Romanos 10:14", theme: "Vocação Missionária" },
    { text: "\"E a vida eterna é esta: que te conheçam, a ti só, por único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.\"", reference: "João 17:3", theme: "Vida Eterna" },
    { text: "\"A seara é grande, mas os trabalhadores são poucos. Rogai, pois, ao Senhor da seara que mande trabalhadores para a sua seara.\"", reference: "Mateus 9:37-38", theme: "Trabalhadores na Seara" },
    { text: "\"Mas recebereis poder ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra.\"", reference: "Atos 1:8", theme: "Testemunhas do Evangelho" },
    { text: "\"Portanto ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.\"", reference: "Mateus 28:19", theme: "A Grande Comissão" },
    { text: "\"De graça recebestes, de graça dai.\"", reference: "Mateus 10:8", theme: "Generosidade e Graça" },
    { text: "\"Os que semeiam em lágrimas ceifarão com alegria.\"", reference: "Salmos 126:5", theme: "Esperança e Perseverança" }
  ],
  en: [
    { text: "\"Go into all the world and preach the gospel to all creation.\"", reference: "Mark 16:15", theme: "Global Mission" },
    { text: "\"The Lord is my shepherd; I shall not want.\"", reference: "Psalms 23:1", theme: "Provision & Protection" },
    { text: "\"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.\"", reference: "John 3:16", theme: "Eternal Love" },
    { text: "\"How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them?\"", reference: "Romans 10:14", theme: "Missionary Calling" },
    { text: "\"Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.\"", reference: "John 17:3", theme: "Eternal Life" },
    { text: "\"The harvest is plentiful but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.\"", reference: "Matthew 9:37-38", theme: "Harvest Workers" },
    { text: "\"But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\"", reference: "Acts 1:8", theme: "Gospel Witnesses" },
    { text: "\"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.\"", reference: "Matthew 28:19", theme: "The Great Commission" },
    { text: "\"Freely you have received; freely give.\"", reference: "Matthew 10:8", theme: "Generosity & Grace" },
    { text: "\"Those who sow with tears will reap with songs of joy.\"", reference: "Psalms 126:5", theme: "Hope & Endurance" }
  ],
  es: [
    { text: "\"Id por todo el mundo y predicad el evangelio a toda criatura.\"", reference: "Marcos 16:15", theme: "Misión Global" },
    { text: "\"El Señor es mi pastor; nada me faltará.\"", reference: "Salmos 23:1", theme: "Provisión y Protección" },
    { text: "\"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.\"", reference: "Juan 3:16", theme: "Amor Eterno" },
    { text: "\"¿Cómo, pues, invocarán a aquel en el cual no han creído? ¿Y cómo creerán en aquel de quien no han oído? ¿Y cómo oirán sin haber quien les predique?\"", reference: "Romanos 10:14", theme: "Llamado Misionero" },
    { text: "\"Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien has enviado.\"", reference: "Juan 17:3", theme: "Vida Eterna" },
    { text: "\"A la verdad la mies es mucha, mas los obreros pocos. Rogad, pues, al Señor de la mies, que envíe obreros a su mies.\"", reference: "Mateo 9:37-38", theme: "Obreros de la Mies" },
    { text: "\"Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.\"", reference: "Hechos 1:8", theme: "Testigos del Evangelio" },
    { text: "\"Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.\"", reference: "Mateo 28:19", theme: "La Gran Comisión" },
    { text: "\"De gracia recibisteis, dad de gracia.\"", reference: "Mateo 10:8", theme: "Generosidad y Gracia" },
    { text: "\"Los que sembraron con lágrimas, con regocijo segarán.\"", reference: "Salmos 126:5", theme: "Esperanza y Perseverancia" }
  ]
};

export function getLocalizedDailyVerse(index: number, lang: LanguageType) {
  const list = LOCALIZED_DAILY_VERSES[lang] || LOCALIZED_DAILY_VERSES.pt;
  const safeIndex = Math.abs(index) % list.length;
  const item = list[safeIndex];
  return {
    text: item.text,
    ref: item.reference,
    reference: item.reference,
    theme: item.theme
  };
}
