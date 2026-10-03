import { LanguageType } from '../types';

export interface BibleTrack {
  id: string;
  trackNumber: number;
  title: string;
  reference: string;
  volumeId: number;
  duration?: string;
  audioUrl?: string;
}

export interface BibleVolume {
  id: number;
  title: string;
  subtitle: string;
  introduction: string;
  color: string;
  tracks: BibleTrack[];
}

export const BIBLE_SERIES_META = {
  mainTitle: "A BÍBLIA",
  subtitle: "As Mais Belas Passagens de Jesus",
  description: "Uma coleção em áudio com as passagens mais marcantes da vida, dos ensinamentos, dos milagres, das parábolas, da morte e da ressurreição de Jesus Cristo."
};

export function getLocalizedBibleMeta(lang: LanguageType = 'pt') {
  if (lang === 'en') {
    return {
      mainTitle: "THE BIBLE",
      subtitle: "The Most Beautiful Passages of Jesus",
      description: "An audio collection featuring the pivotal passages of the life, teachings, miracles, parables, death, and resurrection of Jesus Christ."
    };
  }
  if (lang === 'es') {
    return {
      mainTitle: "LA BIBLIA",
      subtitle: "Las Más Bellas Pasajes de Jesús",
      description: "Una colección en audio con los pasajes más destacados de la vida, enseñanzas, milagros, parábolas, muerte y resurrección de Jesucristo."
    };
  }
  return BIBLE_SERIES_META;
}

export const BIBLE_VOLUMES: BibleVolume[] = [
  {
    id: 1,
    title: "VOLUME 1",
    subtitle: "O Nascimento e o Ministério de Jesus",
    introduction: "Neste primeiro volume, somos convidados a acompanhar os acontecimentos que marcaram a chegada de Jesus ao mundo, desde o Seu nascimento até o início do Seu ministério. Conheça as primeiras palavras, ensinamentos e momentos que revelam a mensagem de amor, fé e esperança trazida por Cristo.",
    color: "#0e5c3e",
    tracks: [
      { id: "track-1", trackNumber: 1, title: "O Nascimento de Jesus", reference: "Lucas 2:1–7", volumeId: 1, duration: "3:40" },
      { id: "track-2", trackNumber: 2, title: "Os Pastores e os Anjos", reference: "Lucas 2:8–20", volumeId: 1, duration: "4:15" },
      { id: "track-3", trackNumber: 3, title: "A Visita dos Magos • A Fuga para o Egito", reference: "Mateus 2:1–18", volumeId: 1, duration: "5:10" },
      { id: "track-4", trackNumber: 4, title: "O Batismo de Jesus • A Tentação de Jesus", reference: "Mateus 3:13–17 • Mateus 4:1–11", volumeId: 1, duration: "4:50" },
      { id: "track-5", trackNumber: 5, title: "A Escolha dos Doze Apóstolos", reference: "Lucas 6:12–19", volumeId: 1, duration: "3:30" },
      { id: "track-6", trackNumber: 6, title: "O Sermão da Montanha • As Bem-aventuranças • O Sal da Terra e a Luz do Mundo", reference: "Mateus 5:1–16", volumeId: 1, duration: "6:20" },
      { id: "track-7", trackNumber: 7, title: "Evitar Juramentos • Paciência e Generosidade • O Amor aos Inimigos", reference: "Mateus 5:33–48", volumeId: 1, duration: "5:05" },
      { id: "track-8", trackNumber: 8, title: "Jesus Ensina a Orar • A Oração do Pai-Nosso", reference: "Mateus 6:5–15", volumeId: 1, duration: "4:10" },
      { id: "track-9", trackNumber: 9, title: "Não Julgar os Outros • Deus Ouve as Orações", reference: "Mateus 7:1–12", volumeId: 1, duration: "3:55" },
      { id: "track-10", trackNumber: 10, title: "Deus Cuida dos Seus Filhos", reference: "Mateus 6:25–34", volumeId: 1, duration: "4:30" },
      { id: "track-11", trackNumber: 11, title: "A Casa Construída sobre a Rocha", reference: "Mateus 7:24–27", volumeId: 1, duration: "3:25" },
      { id: "track-12", trackNumber: 12, title: "As Crianças e o Reino de Deus", reference: "Mateus 19:13–15", volumeId: 1, duration: "3:00" }
    ]
  },
  {
    id: 2,
    title: "VOLUME 2",
    subtitle: "Os milagres de Jesus",
    introduction: "Neste volume, acompanhamos os sinais e milagres realizados por Jesus, manifestações do Seu amor, compaixão e poder. Cada passagem revela o cuidado de Deus com as pessoas, trazendo cura, restauração e esperança.",
    color: "#e3901b",
    tracks: [
      { id: "track-13", trackNumber: 13, title: "As Bodas de Caná • A Água Transformada em Vinho", reference: "João 2:1–11", volumeId: 2, duration: "4:20" },
      { id: "track-14", trackNumber: 14, title: "A Cura do Filho do Oficial do Rei • A Cura do Servo do Centurião", reference: "João 4:46–54 • Mateus 8:5–13", volumeId: 2, duration: "5:00" },
      { id: "track-15", trackNumber: 15, title: "A Pesca Maravilhosa • O Chamamento dos Primeiros Discípulos", reference: "Lucas 5:1–11", volumeId: 2, duration: "4:40" },
      { id: "track-16", trackNumber: 16, title: "A Cura do Paralítico • O Perdão dos Pecados", reference: "Marcos 2:1–12", volumeId: 2, duration: "4:15" },
      { id: "track-17", trackNumber: 17, title: "Jesus Acalma a Tempestade • A Libertação do Endemoninhado", reference: "Marcos 4:35–41 • Marcos 5:1–20", volumeId: 2, duration: "6:10" },
      { id: "track-18", trackNumber: 18, title: "A Cura da Mulher com Hemorragia • A Ressurreição da Filha de Jairo", reference: "Marcos 5:21–43", volumeId: 2, duration: "5:50" },
      { id: "track-19", trackNumber: 19, title: "A Multiplicação dos Pães e dos Peixes", reference: "Mateus 14:13–21", volumeId: 2, duration: "4:30" },
      { id: "track-20", trackNumber: 20, title: "Jesus Caminha sobre as Águas • Pedro Anda sobre as Águas", reference: "Mateus 14:22–33", volumeId: 2, duration: "5:15" },
      { id: "track-21", trackNumber: 21, title: "A Cura do Cego de Nascença", reference: "João 9:1–41", volumeId: 2, duration: "6:45" },
      { id: "track-22", trackNumber: 22, title: "A Cura dos Dez Leprosos", reference: "Lucas 17:11–19", volumeId: 2, duration: "3:50" },
      { id: "track-23", trackNumber: 23, title: "A Ressurreição de Lázaro", reference: "João 11:1–44", volumeId: 2, duration: "7:10" },
      { id: "track-24", trackNumber: 24, title: "Bartimeu Recupera a Visão", reference: "Marcos 10:46–52", volumeId: 2, duration: "3:35" }
    ]
  },
  {
    id: 3,
    title: "VOLUME 3",
    subtitle: "As Parábolas de Jesus",
    introduction: "Neste terceiro volume, encontramos algumas das histórias mais profundas ensinadas por Jesus. Por meio de parábolas, Cristo revelou verdades sobre o Reino de Deus, o perdão, a fé, o amor ao próximo e a transformação do coração humano.",
    color: "#64793b",
    tracks: [
      { id: "track-25", trackNumber: 25, title: "A Parábola do Semeador", reference: "Mateus 13:1–23", volumeId: 3, duration: "5:30" },
      { id: "track-26", trackNumber: 26, title: "A Parábola do Joio e do Trigo", reference: "Mateus 13:24–30 • Mateus 13:36–43", volumeId: 3, duration: "4:50" },
      { id: "track-27", trackNumber: 27, title: "A Parábola do Grão de Mostarda • A Parábola do Fermento", reference: "Mateus 13:31–35", volumeId: 3, duration: "3:40" },
      { id: "track-28", trackNumber: 28, title: "O Tesouro Escondido • A Pérola de Grande Valor", reference: "Mateus 13:44–46", volumeId: 3, duration: "3:15" },
      { id: "track-29", trackNumber: 29, title: "A Parábola da Rede", reference: "Mateus 13:47–50", volumeId: 3, duration: "3:10" },
      { id: "track-30", trackNumber: 30, title: "A Parábola do Bom Samaritano", reference: "Lucas 10:25–37", volumeId: 3, duration: "5:00" },
      { id: "track-31", trackNumber: 31, title: "A Parábola do Rico Insensato", reference: "Lucas 12:13–21", volumeId: 3, duration: "4:05" },
      { id: "track-32", trackNumber: 32, title: "A Ovelha Perdida • A Moeda Perdida", reference: "Lucas 15:1–10", volumeId: 3, duration: "4:20" },
      { id: "track-33", trackNumber: 33, title: "A Parábola do Filho Pródigo", reference: "Lucas 15:11–32", volumeId: 3, duration: "6:30" },
      { id: "track-34", trackNumber: 34, title: "A Parábola do Fariseu e do Publicano", reference: "Lucas 18:9–14", volumeId: 3, duration: "3:45" },
      { id: "track-35", trackNumber: 35, title: "A Parábola dos Trabalhadores da Vinha", reference: "Mateus 20:1–16", volumeId: 3, duration: "5:15" },
      { id: "track-36", trackNumber: 36, title: "As Dez Virgens • A Parábola dos Talentos", reference: "Mateus 25:1–30", volumeId: 3, duration: "6:50" }
    ]
  },
  {
    id: 4,
    title: "VOLUME 4",
    subtitle: "A Crucificação e a Ressurreição",
    introduction: "Neste último volume, acompanhamos os momentos mais importantes da missão de Jesus na Terra: a entrega, o sacrifício na cruz, a vitória sobre a morte e a esperança revelada através da Sua ressurreição. Uma mensagem eterna de amor, redenção e vida.",
    color: "#962125",
    tracks: [
      { id: "track-37", trackNumber: 37, title: "A Entrada Triunfal em Jerusalém", reference: "Mateus 21:1–11", volumeId: 4, duration: "4:30" },
      { id: "track-38", trackNumber: 38, title: "A Última Ceia • O Novo Mandamento", reference: "Lucas 22:7–38 • João 13:1–35", volumeId: 4, duration: "6:15" },
      { id: "track-39", trackNumber: 39, title: "Jesus no Getsémani • A Oração no Jardim", reference: "Mateus 26:36–46", volumeId: 4, duration: "4:45" },
      { id: "track-40", trackNumber: 40, title: "A Prisão de Jesus • Pedro Nega Jesus", reference: "Mateus 26:47–75", volumeId: 4, duration: "6:00" },
      { id: "track-41", trackNumber: 41, title: "Jesus perante Pilatos • A Condenação", reference: "Mateus 27:1–31", volumeId: 4, duration: "5:50" },
      { id: "track-42", trackNumber: 42, title: "O Caminho da Cruz • A Crucificação de Jesus", reference: "Mateus 27:32–56", volumeId: 4, duration: "6:40" },
      { id: "track-43", trackNumber: 43, title: "A Morte de Jesus • O Sepultamento", reference: "Mateus 27:57–66", volumeId: 4, duration: "5:10" },
      { id: "track-44", trackNumber: 44, title: "A Ressurreição de Jesus", reference: "Mateus 28:1–10", volumeId: 4, duration: "4:50" },
      { id: "track-45", trackNumber: 45, title: "Jesus Aparece aos Discípulos", reference: "João 20:19–23", volumeId: 4, duration: "3:55" },
      { id: "track-46", trackNumber: 46, title: "Tomé Vê e Crê", reference: "João 20:24–29", volumeId: 4, duration: "3:30" },
      { id: "track-47", trackNumber: 47, title: "A Grande Comissão", reference: "Mateus 28:16–20", volumeId: 4, duration: "3:15" },
      { id: "track-48", trackNumber: 48, title: "A Ascensão de Jesus", reference: "Atos 1:1–11", volumeId: 4, duration: "4:00" }
    ]
  }
];

// English translations for all volumes and tracks
const EN_VOLUMES: BibleVolume[] = [
  {
    id: 1,
    title: "VOLUME 1",
    subtitle: "The Birth and Ministry of Jesus",
    introduction: "In this first volume, we are invited to follow the events that marked the arrival of Jesus in the world, from His birth to the beginning of His earthly ministry. Discover the first words, teachings, and moments revealing the message of love, faith, and hope brought by Christ.",
    color: "#0e5c3e",
    tracks: [
      { id: "track-1", trackNumber: 1, title: "The Birth of Jesus", reference: "Luke 2:1–7", volumeId: 1, duration: "3:40" },
      { id: "track-2", trackNumber: 2, title: "The Shepherds and the Angels", reference: "Luke 2:8–20", volumeId: 1, duration: "4:15" },
      { id: "track-3", trackNumber: 3, title: "The Visit of the Magi • The Flight to Egypt", reference: "Matthew 2:1–18", volumeId: 1, duration: "5:10" },
      { id: "track-4", trackNumber: 4, title: "The Baptism of Jesus • The Temptation of Jesus", reference: "Matthew 3:13–17 • Matthew 4:1–11", volumeId: 1, duration: "4:50" },
      { id: "track-5", trackNumber: 5, title: "The Calling of the Twelve Apostles", reference: "Luke 6:12–19", volumeId: 1, duration: "3:30" },
      { id: "track-6", trackNumber: 6, title: "The Sermon on the Mount • The Beatitudes • Salt & Light", reference: "Matthew 5:1–16", volumeId: 1, duration: "6:20" },
      { id: "track-7", trackNumber: 7, title: "Oaths • Patience and Generosity • Love for Enemies", reference: "Matthew 5:33–48", volumeId: 1, duration: "5:05" },
      { id: "track-8", trackNumber: 8, title: "Jesus Teaches How to Pray • The Lord's Prayer", reference: "Matthew 6:5–15", volumeId: 1, duration: "4:10" },
      { id: "track-9", trackNumber: 9, title: "Do Not Judge • God Hears Our Prayers", reference: "Matthew 7:1–12", volumeId: 1, duration: "3:55" },
      { id: "track-10", trackNumber: 10, title: "God Cares for His Children", reference: "Matthew 6:25–34", volumeId: 1, duration: "4:30" },
      { id: "track-11", trackNumber: 11, title: "The House Built on the Rock", reference: "Matthew 7:24–27", volumeId: 1, duration: "3:25" },
      { id: "track-12", trackNumber: 12, title: "The Little Children and the Kingdom of God", reference: "Matthew 19:13–15", volumeId: 1, duration: "3:00" }
    ]
  },
  {
    id: 2,
    title: "VOLUME 2",
    subtitle: "The Miracles of Jesus",
    introduction: "In this volume, we accompany the signs and miracles performed by Jesus, manifestations of His love, compassion, and power. Each passage reveals God's deep care for people, bringing healing, restoration, and hope.",
    color: "#e3901b",
    tracks: [
      { id: "track-13", trackNumber: 13, title: "The Wedding at Cana • Water Turned into Wine", reference: "John 2:1–11", volumeId: 2, duration: "4:20" },
      { id: "track-14", trackNumber: 14, title: "Healing the Official's Son • The Centurion's Servant", reference: "John 4:46–54 • Matthew 8:5–13", volumeId: 2, duration: "5:00" },
      { id: "track-15", trackNumber: 15, title: "The Miraculous Catch • Calling the First Disciples", reference: "Luke 5:1–11", volumeId: 2, duration: "4:40" },
      { id: "track-16", trackNumber: 16, title: "Healing the Paralyzed Man • Forgiveness of Sins", reference: "Mark 2:1–12", volumeId: 2, duration: "4:15" },
      { id: "track-17", trackNumber: 17, title: "Jesus Calms the Storm • Deliverance of the Demoniac", reference: "Mark 4:35–41 • Mark 5:1–20", volumeId: 2, duration: "6:10" },
      { id: "track-18", trackNumber: 18, title: "Healing the Bleeding Woman • Jairus' Daughter Restored", reference: "Mark 5:21–43", volumeId: 2, duration: "5:50" },
      { id: "track-19", trackNumber: 19, title: "The Feeding of the 5,000 with Loaves and Fish", reference: "Matthew 14:13–21", volumeId: 2, duration: "4:30" },
      { id: "track-20", trackNumber: 20, title: "Jesus Walks on the Water • Peter Walks on Water", reference: "Matthew 14:22–33", volumeId: 2, duration: "5:15" },
      { id: "track-21", trackNumber: 21, title: "Healing of the Man Born Blind", reference: "John 9:1–41", volumeId: 2, duration: "6:45" },
      { id: "track-22", trackNumber: 22, title: "Cleansing of the Ten Lepers", reference: "Luke 17:11–19", volumeId: 2, duration: "3:50" },
      { id: "track-23", trackNumber: 23, title: "The Resurrection of Lazarus", reference: "John 11:1–44", volumeId: 2, duration: "7:10" },
      { id: "track-24", trackNumber: 24, title: "Blind Bartimaeus Receives His Sight", reference: "Mark 10:46–52", volumeId: 2, duration: "3:35" }
    ]
  },
  {
    id: 3,
    title: "VOLUME 3",
    subtitle: "The Parables of Jesus",
    introduction: "In this third volume, we encounter some of the deepest stories taught by Jesus. Through parables, Christ revealed eternal truths about the Kingdom of God, forgiveness, faith, love for one's neighbor, and the transformation of the human heart.",
    color: "#64793b",
    tracks: [
      { id: "track-25", trackNumber: 25, title: "The Parable of the Sower", reference: "Matthew 13:1–23", volumeId: 3, duration: "5:30" },
      { id: "track-26", trackNumber: 26, title: "The Parable of the Weeds and Wheat", reference: "Matthew 13:24–30 • Matthew 13:36–43", volumeId: 3, duration: "4:50" },
      { id: "track-27", trackNumber: 27, title: "The Parable of the Mustard Seed • The Leaven", reference: "Matthew 13:31–35", volumeId: 3, duration: "3:40" },
      { id: "track-28", trackNumber: 28, title: "The Hidden Treasure • The Pearl of Great Price", reference: "Matthew 13:44–46", volumeId: 3, duration: "3:15" },
      { id: "track-29", trackNumber: 29, title: "The Parable of the Net", reference: "Matthew 13:47–50", volumeId: 3, duration: "3:10" },
      { id: "track-30", trackNumber: 30, title: "The Parable of the Good Samaritan", reference: "Luke 10:25–37", volumeId: 3, duration: "5:00" },
      { id: "track-31", trackNumber: 31, title: "The Parable of the Rich Fool", reference: "Luke 12:13–21", volumeId: 3, duration: "4:05" },
      { id: "track-32", trackNumber: 32, title: "The Lost Sheep • The Lost Coin", reference: "Luke 15:1–10", volumeId: 3, duration: "4:20" },
      { id: "track-33", trackNumber: 33, title: "The Parable of the Prodigal Son", reference: "Luke 15:11–32", volumeId: 3, duration: "6:30" },
      { id: "track-34", trackNumber: 34, title: "The Pharisee and the Tax Collector", reference: "Luke 18:9–14", volumeId: 3, duration: "3:45" },
      { id: "track-35", trackNumber: 35, title: "The Workers in the Vineyard", reference: "Matthew 20:1–16", volumeId: 3, duration: "5:15" },
      { id: "track-36", trackNumber: 36, title: "The Ten Virgins • The Parable of the Talents", reference: "Matthew 25:1–30", volumeId: 3, duration: "6:50" }
    ]
  },
  {
    id: 4,
    title: "VOLUME 4",
    subtitle: "The Crucifixion and Resurrection",
    introduction: "In this final volume, we follow the most important moments of Jesus' mission on Earth: His surrender, the sacrifice on the cross, the victory over death, and the hope revealed through His resurrection. An eternal message of love, redemption, and life.",
    color: "#962125",
    tracks: [
      { id: "track-37", trackNumber: 37, title: "The Triumphal Entry into Jerusalem", reference: "Matthew 21:1–11", volumeId: 4, duration: "4:30" },
      { id: "track-38", trackNumber: 38, title: "The Last Supper • The New Commandment", reference: "Luke 22:7–38 • John 13:1–35", volumeId: 4, duration: "6:15" },
      { id: "track-39", trackNumber: 39, title: "Jesus in Gethsemane • The Garden Prayer", reference: "Matthew 26:36–46", volumeId: 4, duration: "4:45" },
      { id: "track-40", trackNumber: 40, title: "The Arrest of Jesus • Peter Denies Jesus", reference: "Matthew 26:47–75", volumeId: 4, duration: "6:00" },
      { id: "track-41", trackNumber: 41, title: "Jesus Before Pilate • The Condemnation", reference: "Matthew 27:1–31", volumeId: 4, duration: "5:50" },
      { id: "track-42", trackNumber: 42, title: "The Way of the Cross • The Crucifixion of Jesus", reference: "Matthew 27:32–56", volumeId: 4, duration: "6:40" },
      { id: "track-43", trackNumber: 43, title: "The Death of Jesus • The Burial", reference: "Matthew 27:57–66", volumeId: 4, duration: "5:10" },
      { id: "track-44", trackNumber: 44, title: "The Resurrection of Jesus", reference: "Matthew 28:1–10", volumeId: 4, duration: "4:50" },
      { id: "track-45", trackNumber: 45, title: "Jesus Appears to the Disciples", reference: "John 20:19–23", volumeId: 4, duration: "3:55" },
      { id: "track-46", trackNumber: 46, title: "Thomas Sees and Believes", reference: "John 20:24–29", volumeId: 4, duration: "3:30" },
      { id: "track-47", trackNumber: 47, title: "The Great Commission", reference: "Matthew 28:16–20", volumeId: 4, duration: "3:15" },
      { id: "track-48", trackNumber: 48, title: "The Ascension of Jesus", reference: "Acts 1:1–11", volumeId: 4, duration: "4:00" }
    ]
  }
];

// Spanish translations for all volumes and tracks
const ES_VOLUMES: BibleVolume[] = [
  {
    id: 1,
    title: "VOLUMEN 1",
    subtitle: "El Nacimiento y el Ministerio de Jesús",
    introduction: "En este primer volumen, somos invitados a acompañar los acontecimientos que marcaron la llegada de Jesús al mundo, desde Su nacimiento hasta el inicio de Su ministerio terrenal. Conozca las primeras palabras, enseñanzas y momentos que revelan el mensaje de amor, fe y esperanza traído por Cristo.",
    color: "#0e5c3e",
    tracks: [
      { id: "track-1", trackNumber: 1, title: "El Nacimiento de Jesús", reference: "Lucas 2:1–7", volumeId: 1, duration: "3:40" },
      { id: "track-2", trackNumber: 2, title: "Los Pastores y los Ángeles", reference: "Lucas 2:8–20", volumeId: 1, duration: "4:15" },
      { id: "track-3", trackNumber: 3, title: "La Visita de los Magos • La Huida a Egipto", reference: "Mateo 2:1–18", volumeId: 1, duration: "5:10" },
      { id: "track-4", trackNumber: 4, title: "El Bautismo de Jesús • La Tentación de Jesús", reference: "Mateo 3:13–17 • Mateo 4:1–11", volumeId: 1, duration: "4:50" },
      { id: "track-5", trackNumber: 5, title: "La Elección de los Doce Apóstoles", reference: "Lucas 6:12–19", volumeId: 1, duration: "3:30" },
      { id: "track-6", trackNumber: 6, title: "El Sermón del Monte • Las Bienaventuranzas • Sal y Luz", reference: "Mateo 5:1–16", volumeId: 1, duration: "6:20" },
      { id: "track-7", trackNumber: 7, title: "Evitar Juramentos • Paciencia y Generosidad • Amor a los Enemigos", reference: "Mateo 5:33–48", volumeId: 1, duration: "5:05" },
      { id: "track-8", trackNumber: 8, title: "Jesús Enseña a Orar • El Padre Nuestro", reference: "Mateo 6:5–15", volumeId: 1, duration: "4:10" },
      { id: "track-9", trackNumber: 9, title: "No Juzgar a los Demás • Dios Escucha las Oraciones", reference: "Mateo 7:1–12", volumeId: 1, duration: "3:55" },
      { id: "track-10", trackNumber: 10, title: "Dios Cuida de Sus Hijos", reference: "Mateo 6:25–34", volumeId: 1, duration: "4:30" },
      { id: "track-11", trackNumber: 11, title: "La Casa Edificada sobre la Roca", reference: "Mateo 7:24–27", volumeId: 1, duration: "3:25" },
      { id: "track-12", trackNumber: 12, title: "Los Niños y el Reino de Dios", reference: "Mateo 19:13–15", volumeId: 1, duration: "3:00" }
    ]
  },
  {
    id: 2,
    title: "VOLUMEN 2",
    subtitle: "Los milagros de Jesús",
    introduction: "En este volumen, acompañamos las señales y milagros realizados por Jesús, manifestaciones de Su amor, compasión y poder soberano. Cada pasaje revela el cuidado de Dios hacia las personas, trayendo sanidad, restauración y esperanza.",
    color: "#e3901b",
    tracks: [
      { id: "track-13", trackNumber: 13, title: "Las Bodas de Caná • El Agua Convertida en Vino", reference: "Juan 2:1–11", volumeId: 2, duration: "4:20" },
      { id: "track-14", trackNumber: 14, title: "La Sanidad del Hijo del Oficial • El Siervo del Centurión", reference: "Juan 4:46–54 • Mateo 8:5–13", volumeId: 2, duration: "5:00" },
      { id: "track-15", trackNumber: 15, title: "La Pesca Milagrosa • El Llamado de los Primeros Discípulos", reference: "Lucas 5:1–11", volumeId: 2, duration: "4:40" },
      { id: "track-16", trackNumber: 16, title: "La Sanidad del Paralítico • El Perdón de los Pecados", reference: "Marcos 2:1–12", volumeId: 2, duration: "4:15" },
      { id: "track-17", trackNumber: 17, title: "Jesús Calma la Tempestad • La Liberación del Endemoniado", reference: "Marcos 4:35–41 • Marcos 5:1–20", volumeId: 2, duration: "6:10" },
      { id: "track-18", trackNumber: 18, title: "La Mujer con Flujo de Sangre • La Hija de Jairo Resucitada", reference: "Marcos 5:21–43", volumeId: 2, duration: "5:50" },
      { id: "track-19", trackNumber: 19, title: "La Multiplicación de los Panes y los Peces", reference: "Mateo 14:13–21", volumeId: 2, duration: "4:30" },
      { id: "track-20", trackNumber: 20, title: "Jesús Camina sobre las Aguas • Pedro Camina sobre el Agua", reference: "Mateo 14:22–33", volumeId: 2, duration: "5:15" },
      { id: "track-21", trackNumber: 21, title: "La Sanidad del Ciego de Nacimiento", reference: "Juan 9:1–41", volumeId: 2, duration: "6:45" },
      { id: "track-22", trackNumber: 22, title: "La Sanidad de los Diez Leprosos", reference: "Lucas 17:11–19", volumeId: 2, duration: "3:50" },
      { id: "track-23", trackNumber: 23, title: "La Resurrección de Lázaro", reference: "Juan 11:1–44", volumeId: 2, duration: "7:10" },
      { id: "track-24", trackNumber: 24, title: "Bartimeo Recupera la Vista", reference: "Marcos 10:46–52", volumeId: 2, duration: "3:35" }
    ]
  },
  {
    id: 3,
    title: "VOLUMEN 3",
    subtitle: "Las Parábolas de Jesús",
    introduction: "En este tercer volumen, encontramos algunas de las historias más profundas enseñadas por Jesús. A través de parábolas, Cristo reveló verdades sobre el Reino de Dios, el perdón, la fe, el amor al prójimo y la transformación del corazón humano.",
    color: "#64793b",
    tracks: [
      { id: "track-25", trackNumber: 25, title: "La Parábola del Sembrador", reference: "Mateo 13:1–23", volumeId: 3, duration: "5:30" },
      { id: "track-26", trackNumber: 26, title: "La Parábola de la Cizaña y el Trigo", reference: "Mateo 13:24–30 • Mateo 13:36–43", volumeId: 3, duration: "4:50" },
      { id: "track-27", trackNumber: 27, title: "El Grano de Mostaza • La Parábola de la Levadura", reference: "Mateo 13:31–35", volumeId: 3, duration: "3:40" },
      { id: "track-28", trackNumber: 28, title: "El Tesoro Escondido • La Perla de Gran Valor", reference: "Mateo 13:44–46", volumeId: 3, duration: "3:15" },
      { id: "track-29", trackNumber: 29, title: "La Parábola de la Red", reference: "Mateo 13:47–50", volumeId: 3, duration: "3:10" },
      { id: "track-30", trackNumber: 30, title: "La Parábola del Buen Samaritano", reference: "Lucas 10:25–37", volumeId: 3, duration: "5:00" },
      { id: "track-31", trackNumber: 31, title: "La Parábola del Rico Insensato", reference: "Lucas 12:13–21", volumeId: 3, duration: "4:05" },
      { id: "track-32", trackNumber: 32, title: "La Oveja Perdida • La Moneda Perdida", reference: "Lucas 15:1–10", volumeId: 3, duration: "4:20" },
      { id: "track-33", trackNumber: 33, title: "La Parábola del Hijo Pródigo", reference: "Lucas 15:11–32", volumeId: 3, duration: "6:30" },
      { id: "track-34", trackNumber: 34, title: "El Fariseo y el Publicano", reference: "Lucas 18:9–14", volumeId: 3, duration: "3:45" },
      { id: "track-35", trackNumber: 35, title: "Los Obreros de la Viña", reference: "Mateo 20:1–16", volumeId: 3, duration: "5:15" },
      { id: "track-36", trackNumber: 36, title: "Las Diez Vírgenes • La Parábola de los Talentos", reference: "Mateo 25:1–30", volumeId: 3, duration: "6:50" }
    ]
  },
  {
    id: 4,
    title: "VOLUMEN 4",
    subtitle: "La Crucifixión y la Resurrección",
    introduction: "En este último volumen, acompañamos los momentos más cruciales de la misión de Jesús en la Tierra: Su entrega, el sacrificio en la cruz, la victoria sobre la muerte y la gloriosa esperanza revelada mediante Su resurrección. Un mensaje eterno de amor, redención y vida.",
    color: "#962125",
    tracks: [
      { id: "track-37", trackNumber: 37, title: "La Entrada Triunfal en Jerusalén", reference: "Mateo 21:1–11", volumeId: 4, duration: "4:30" },
      { id: "track-38", trackNumber: 38, title: "La Última Cena • El Mandamiento Nuevo", reference: "Lucas 22:7–38 • Juan 13:1–35", volumeId: 4, duration: "6:15" },
      { id: "track-39", trackNumber: 39, title: "Jesús en Getsemaní • La Oración en el Huerto", reference: "Mateo 26:36–46", volumeId: 4, duration: "4:45" },
      { id: "track-40", trackNumber: 40, title: "El Arresto de Jesús • Pedro Niega a Jesús", reference: "Mateo 26:47–75", volumeId: 4, duration: "6:00" },
      { id: "track-41", trackNumber: 41, title: "Jesús ante Pilato • La Condena", reference: "Mateo 27:1–31", volumeId: 4, duration: "5:50" },
      { id: "track-42", trackNumber: 42, title: "El Camino de la Cruz • La Crucifixión de Jesús", reference: "Mateo 27:32–56", volumeId: 4, duration: "6:40" },
      { id: "track-43", trackNumber: 43, title: "La Muerte de Jesús • La Sepultura", reference: "Mateo 27:57–66", volumeId: 4, duration: "5:10" },
      { id: "track-44", trackNumber: 44, title: "La Resurrección de Jesús", reference: "Mateo 28:1–10", volumeId: 4, duration: "4:50" },
      { id: "track-45", trackNumber: 45, title: "Jesús se Aparece a los Discípulos", reference: "Juan 20:19–23", volumeId: 4, duration: "3:55" },
      { id: "track-46", trackNumber: 46, title: "Tomás Ve y Cree", reference: "Juan 20:24–29", volumeId: 4, duration: "3:30" },
      { id: "track-47", trackNumber: 47, title: "La Gran Comisión", reference: "Mateo 28:16–20", volumeId: 4, duration: "3:15" },
      { id: "track-48", trackNumber: 48, title: "La Ascensión de Jesús", reference: "Hechos 1:1–11", volumeId: 4, duration: "4:00" }
    ]
  }
];

export function getLocalizedBibleVolumes(lang: LanguageType = 'pt'): BibleVolume[] {
  if (lang === 'en') {
    return EN_VOLUMES;
  }
  if (lang === 'es') {
    return ES_VOLUMES;
  }
  return BIBLE_VOLUMES;
}
