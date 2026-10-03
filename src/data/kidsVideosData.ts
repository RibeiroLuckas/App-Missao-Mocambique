export interface KidsVideo {
  id: string;
  title: string;
  channel?: string;
  duration?: string;
  summary: string;
  youtubeId?: string;
  playlistId?: string;
  url: string;
  thumbnail: string;
  isPlaylist?: boolean;
}

export const KIDS_VIDEOS: KidsVideo[] = [
  {
    id: 'kv-1',
    title: 'Histórias Bíblicas Infantis em Música | Turminha do Criador',
    channel: 'Turminha do Criador',
    duration: 'Playlist',
    summary: 'Coletânea especial com histórias bíblicas cantadas e animadas para crianças.',
    playlistId: 'PLpIxMnAwBb37iQkBRD9d9AXFvV8W6hLKc',
    url: 'https://youtube.com/playlist?list=PLpIxMnAwBb37iQkBRD9d9AXFvV8W6hLKc',
    thumbnail: 'https://i.ytimg.com/vi/jDlYZzuJvE0/hqdefault.jpg',
    isPlaylist: true
  },
  {
    id: 'kv-2',
    title: 'A Arca de Noé | Os Heróis da Fé',
    channel: 'Os Heróis da Fé',
    duration: 'Vídeo',
    summary: 'História Bíblica infantil sobre a obediência e a fé de Noé ao construir a grande arca.',
    youtubeId: '32mjYH1zBYs',
    url: 'https://youtube.com/watch?v=32mjYH1zBYs',
    thumbnail: 'https://i.ytimg.com/vi/32mjYH1zBYs/hqdefault.jpg'
  },
  {
    id: 'kv-3',
    title: 'A Parábola do Filho Pródigo | Clubinho da Bíblia',
    channel: 'Clubinho da Bíblia',
    duration: 'Vídeo',
    summary: 'Uma linda história sobre amor, acolhimento, perdão e o coração generoso do Pai celestial.',
    youtubeId: 'dY_FfPd-7BQ',
    url: 'https://youtu.be/dY_FfPd-7BQ',
    thumbnail: 'https://i.ytimg.com/vi/dY_FfPd-7BQ/hqdefault.jpg'
  },
  {
    id: 'kv-4',
    title: 'A Criação do Mundo em 7 Dias | História Bíblica Infantil',
    channel: 'História Bíblica Infantil',
    duration: 'Vídeo',
    summary: 'História Bíblica animada para crianças mostrando como Deus criou o mundo com amor e perfeição.',
    youtubeId: 'RMlFYkOK5S8',
    url: 'https://youtu.be/RMlFYkOK5S8',
    thumbnail: 'https://i.ytimg.com/vi/RMlFYkOK5S8/hqdefault.jpg'
  },
  {
    id: 'kv-5',
    title: 'Daniel na Cova dos Leões | Os Heróis da Fé',
    channel: 'Os Heróis da Fé',
    duration: 'Vídeo',
    summary: 'A emocionante história bíblica infantil sobre a coragem e a oração de Daniel protegido pelos anjos.',
    youtubeId: '1CQ9kgYWtu8',
    url: 'https://youtu.be/1CQ9kgYWtu8',
    thumbnail: 'https://i.ytimg.com/vi/1CQ9kgYWtu8/hqdefault.jpg'
  },
  {
    id: 'kv-6',
    title: 'Maratona de Desenhos Bíblicos: 40 Histórias da Bíblia',
    channel: 'NT Kids',
    duration: '164 min',
    summary: '164 minutos de desenhos animados com 40 histórias inesquecíveis da Palavra de Deus para crianças.',
    youtubeId: 'K7jk6oXktfI',
    url: 'https://youtu.be/K7jk6oXktfI',
    thumbnail: 'https://i.ytimg.com/vi/K7jk6oXktfI/hqdefault.jpg'
  },
  {
    id: 'kv-7',
    title: 'Pedro, Tiago, João no Barquinho | 3 Palavrinhas',
    channel: '3Palavrinhas',
    duration: 'Vídeo',
    summary: 'Um dos louvores infantis mais amados pelas crianças para cantar, louvar e dançar em família.',
    youtubeId: 'Tdwy3BZe61s',
    url: 'https://youtu.be/Tdwy3BZe61s',
    thumbnail: 'https://i.ytimg.com/vi/Tdwy3BZe61s/hqdefault.jpg'
  },
  {
    id: 'kv-8',
    title: 'Gospel Infantil | As Melhores Músicas Gospel para Filhos',
    channel: 'Filtr Kids Brasil',
    duration: 'Playlist',
    summary: 'Seleção completa com as melhores músicas cristãs e louvores infantis para abençoar os lares.',
    playlistId: 'PLd6Dzpb_R5XpnTxew1oROPk76NENXq7jl',
    url: 'https://youtube.com/playlist?list=PLd6Dzpb_R5XpnTxew1oROPk76NENXq7jl',
    thumbnail: 'https://i.ytimg.com/vi/0PanAuOBpDU/hqdefault.jpg',
    isPlaylist: true
  },
  {
    id: 'kv-9',
    title: 'Fazendinha de Jesus | 1 Hora de Música Infantil Gospel',
    channel: 'Gabi Gospel Kids',
    duration: '1 hora',
    summary: 'Histórias Bíblicas cantadas e coletânea animada com 1 hora de louvor e diversão infantil.',
    youtubeId: 'AjMpsR-uaSA',
    url: 'https://youtube.com/watch?v=AjMpsR-uaSA',
    thumbnail: 'https://i.ytimg.com/vi/AjMpsR-uaSA/hqdefault.jpg'
  },
  {
    id: 'kv-10',
    title: 'Coletânea de 3 Horas com 3 Palavrinhas | Louvor e Diversão',
    channel: '3Palavrinhas',
    duration: '3 horas',
    summary: 'Coletânea especial de 3 horas com o 3 Palavrinhas para momentos de louvor, aprendizado e alegria.',
    youtubeId: 'cgwexMtr8_g',
    url: 'https://youtube.com/live/cgwexMtr8_g',
    thumbnail: 'https://i.ytimg.com/vi/cgwexMtr8_g/hqdefault.jpg'
  }
];
