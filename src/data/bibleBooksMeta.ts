export interface BookMeta {
  fcbhId: string;
  namePT: string;
  nameEN: string;
  nameES?: string;
  testament: 'Antigo' | 'Novo';
  numChapters: number;
}

export function getLocalizedBookName(b: BookMeta, lang: string): string {
  if (lang === 'en') return b.nameEN;
  if (lang === 'es') return b.nameES || b.namePT;
  return b.namePT;
}

export const ALL_BIBLE_BOOKS: BookMeta[] = [
  // Antigo Testamento
  { fcbhId: "B01", namePT: "Gênesis", nameEN: "Genesis", testament: "Antigo", numChapters: 50 },
  { fcbhId: "B02", namePT: "Êxodo", nameEN: "Exodus", testament: "Antigo", numChapters: 40 },
  { fcbhId: "B03", namePT: "Levítico", nameEN: "Leviticus", testament: "Antigo", numChapters: 27 },
  { fcbhId: "B04", namePT: "Números", nameEN: "Numbers", testament: "Antigo", numChapters: 36 },
  { fcbhId: "B05", namePT: "Deuteronômio", nameEN: "Deuteronomy", testament: "Antigo", numChapters: 34 },
  { fcbhId: "B06", namePT: "Josué", nameEN: "Joshua", testament: "Antigo", numChapters: 24 },
  { fcbhId: "B07", namePT: "Juízes", nameEN: "Judges", testament: "Antigo", numChapters: 21 },
  { fcbhId: "B08", namePT: "Rute", nameEN: "Ruth", testament: "Antigo", numChapters: 4 },
  { fcbhId: "B09", namePT: "1 Samuel", nameEN: "1Samuel", testament: "Antigo", numChapters: 31 },
  { fcbhId: "B10", namePT: "2 Samuel", nameEN: "2Samuel", testament: "Antigo", numChapters: 24 },
  { fcbhId: "B11", namePT: "1 Reis", nameEN: "1Kings", testament: "Antigo", numChapters: 22 },
  { fcbhId: "B12", namePT: "2 Reis", nameEN: "2Kings", testament: "Antigo", numChapters: 25 },
  { fcbhId: "B13", namePT: "1 Crônicas", nameEN: "1Chronicles", testament: "Antigo", numChapters: 29 },
  { fcbhId: "B14", namePT: "2 Crônicas", nameEN: "2Chronicles", testament: "Antigo", numChapters: 36 },
  { fcbhId: "B15", namePT: "Esdras", nameEN: "Ezra", testament: "Antigo", numChapters: 10 },
  { fcbhId: "B16", namePT: "Neemias", nameEN: "Nehemiah", testament: "Antigo", numChapters: 13 },
  { fcbhId: "B17", namePT: "Ester", nameEN: "Esther", testament: "Antigo", numChapters: 10 },
  { fcbhId: "B18", namePT: "Jó", nameEN: "Job", testament: "Antigo", numChapters: 42 },
  { fcbhId: "B19", namePT: "Salmos", nameEN: "Psalms", testament: "Antigo", numChapters: 150 },
  { fcbhId: "B20", namePT: "Provérbios", nameEN: "Proverbs", testament: "Antigo", numChapters: 31 },
  { fcbhId: "B21", namePT: "Eclesiastes", nameEN: "Ecclesiastes", testament: "Antigo", numChapters: 12 },
  { fcbhId: "B22", namePT: "Cânticos", nameEN: "SongofSolomon", testament: "Antigo", numChapters: 8 },
  { fcbhId: "B23", namePT: "Isaías", nameEN: "Isaiah", testament: "Antigo", numChapters: 66 },
  { fcbhId: "B24", namePT: "Jeremias", nameEN: "Jeremiah", testament: "Antigo", numChapters: 52 },
  { fcbhId: "B25", namePT: "Lamentações", nameEN: "Lamentations", testament: "Antigo", numChapters: 5 },
  { fcbhId: "B26", namePT: "Ezequiel", nameEN: "Ezekiel", testament: "Antigo", numChapters: 48 },
  { fcbhId: "B27", namePT: "Daniel", nameEN: "Daniel", testament: "Antigo", numChapters: 12 },
  { fcbhId: "B28", namePT: "Oseias", nameEN: "Hosea", testament: "Antigo", numChapters: 14 },
  { fcbhId: "B29", namePT: "Joel", nameEN: "Joel", testament: "Antigo", numChapters: 3 },
  { fcbhId: "B30", namePT: "Amós", nameEN: "Amos", testament: "Antigo", numChapters: 9 },
  { fcbhId: "B31", namePT: "Obadias", nameEN: "Obadiah", testament: "Antigo", numChapters: 1 },
  { fcbhId: "B32", namePT: "Jonas", nameEN: "Jonah", testament: "Antigo", numChapters: 4 },
  { fcbhId: "B33", namePT: "Miqueias", nameEN: "Micah", testament: "Antigo", numChapters: 7 },
  { fcbhId: "B34", namePT: "Naum", nameEN: "Nahum", testament: "Antigo", numChapters: 3 },
  { fcbhId: "B35", namePT: "Habacuque", nameEN: "Habakkuk", testament: "Antigo", numChapters: 3 },
  { fcbhId: "B36", namePT: "Sofonias", nameEN: "Zephaniah", testament: "Antigo", numChapters: 3 },
  { fcbhId: "B37", namePT: "Ageu", nameEN: "Haggai", testament: "Antigo", numChapters: 2 },
  { fcbhId: "B38", namePT: "Zacarias", nameEN: "Zechariah", testament: "Antigo", numChapters: 14 },
  { fcbhId: "B39", namePT: "Malaquias", nameEN: "Malachi", testament: "Antigo", numChapters: 4 },

  // Novo Testamento
  { fcbhId: "B40", namePT: "Mateus", nameEN: "Matthew", testament: "Novo", numChapters: 28 },
  { fcbhId: "B41", namePT: "Marcos", nameEN: "Mark", testament: "Novo", numChapters: 16 },
  { fcbhId: "B42", namePT: "Lucas", nameEN: "Luke", testament: "Novo", numChapters: 24 },
  { fcbhId: "B43", namePT: "João", nameEN: "John", testament: "Novo", numChapters: 21 },
  { fcbhId: "B44", namePT: "Atos", nameEN: "Acts", testament: "Novo", numChapters: 28 },
  { fcbhId: "B45", namePT: "Romanos", nameEN: "Romans", testament: "Novo", numChapters: 16 },
  { fcbhId: "B46", namePT: "1 Coríntios", nameEN: "1Corinthians", testament: "Novo", numChapters: 16 },
  { fcbhId: "B47", namePT: "2 Coríntios", nameEN: "2Corinthians", testament: "Novo", numChapters: 13 },
  { fcbhId: "B48", namePT: "Gálatas", nameEN: "Galatians", testament: "Novo", numChapters: 6 },
  { fcbhId: "B49", namePT: "Efésios", nameEN: "Ephesians", testament: "Novo", numChapters: 6 },
  { fcbhId: "B50", namePT: "Filipenses", nameEN: "Philippians", testament: "Novo", numChapters: 4 },
  { fcbhId: "B51", namePT: "Colossenses", nameEN: "Colossians", testament: "Novo", numChapters: 4 },
  { fcbhId: "B52", namePT: "1 Tessalonicenses", nameEN: "1Thessalonians", testament: "Novo", numChapters: 5 },
  { fcbhId: "B53", namePT: "2 Tessalonicenses", nameEN: "2Thessalonians", testament: "Novo", numChapters: 3 },
  { fcbhId: "B54", namePT: "1 Timóteo", nameEN: "1Timothy", testament: "Novo", numChapters: 6 },
  { fcbhId: "B55", namePT: "2 Timóteo", nameEN: "2Timothy", testament: "Novo", numChapters: 4 },
  { fcbhId: "B56", namePT: "Tito", nameEN: "Titus", testament: "Novo", numChapters: 3 },
  { fcbhId: "B57", namePT: "Filemon", nameEN: "Philemon", testament: "Novo", numChapters: 1 },
  { fcbhId: "B58", namePT: "Hebreus", nameEN: "Hebrews", testament: "Novo", numChapters: 13 },
  { fcbhId: "B59", namePT: "Tiago", nameEN: "James", testament: "Novo", numChapters: 5 },
  { fcbhId: "B60", namePT: "1 Pedro", nameEN: "1Peter", testament: "Novo", numChapters: 5 },
  { fcbhId: "B61", namePT: "2 Pedro", nameEN: "2Peter", testament: "Novo", numChapters: 3 },
  { fcbhId: "B62", namePT: "1 João", nameEN: "1John", testament: "Novo", numChapters: 5 },
  { fcbhId: "B63", namePT: "2 João", nameEN: "2John", testament: "Novo", numChapters: 1 },
  { fcbhId: "B64", namePT: "3 João", nameEN: "3John", testament: "Novo", numChapters: 1 },
  { fcbhId: "B65", namePT: "Judas", nameEN: "Jude", testament: "Novo", numChapters: 1 },
  { fcbhId: "B66", namePT: "Apocalipse", nameEN: "Revelation", testament: "Novo", numChapters: 22 }
];
