// Public audio files, indexed by volume and the track number on the recording.
const PASSAGE_AUDIO_FILES: Record<number, Record<number, string>> = {
  1: {
    1: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK 1.mp3.mpeg",
    2: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  2.mp3.mpeg",
    3: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  3.mp3.mpeg",
    4: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  4.mp3.mpeg",
    5: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK   5.mp3.mpeg",
    6: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  6.mp3.mpeg",
    7: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  7.mp3.mpeg",
    8: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  8.mp3.mpeg",
    9: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK  9.mp3.mpeg",
    10: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK   - 10 .mp3.mpeg",
    11: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK   - 11.mp3.mpeg",
    12: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 1 - TRACK   - 12.mp3.mpeg",
  },
  2: {
    1: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK 1.mp3.mpeg",
    2: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  2.mp3.mpeg",
    3: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  3.mp3.mpeg",
    4: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  4.mp3.mpeg",
    5: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  5.mp3.mpeg",
    6: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  6.mp3.mpeg",
    7: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  7.mp3.mpeg",
    8: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  8.mp3.mpeg",
    9: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  9.mp3.mpeg",
    10: "AS MAIS BELAS PASSAGENS DE JESUS- VOL 2 -  TRACK  10.mp3.mpeg",
  },
  3: {
    1: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK 1.mp3.mpeg",
    2: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  2.mp3.mpeg",
    3: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  3.mp3.mpeg",
    4: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  4.mp3.mpeg",
    5: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  5.mp3.mpeg",
    6: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  6.mp3.mpeg",
    7: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  7.mp3.mpeg",
    8: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  8.mp3.mpeg",
    9: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  9.mp3.mpeg",
    10: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  10.mp3.mpeg",
    11: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  11.mp3.mpeg",
    12: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  12.mp3.mpeg",
    13: "BIBLIA - AS MAIS BELAS PASSAGENS - VOL 3 - TRACK  13.mp3.mpeg",
  },
  4: {
    1: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  1 .mp3.mpeg",
    2: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  2.mp3.mpeg",
    3: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  3.mp3.mpeg",
    4: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  4.mp3.mpeg",
    5: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  5.mp3.mpeg",
    6: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  6.mp3.mpeg",
    7: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  7.mp3.mpeg",
    8: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  8.mp3.mpeg",
    9: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  9.mp3.mpeg",
    10: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  10.mp3.mpeg",
    11: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  11.mp3.mpeg",
    12: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  12.mp3.mpeg",
    13: "AS MAIS BELAS PASSAGENS DE JESUS - VOL 4 - TRACK  13.mp3.mpeg",
  },
};

export function getPassageAudioUrl(volumeId: number, trackNumber: number): string | undefined {
  const filename = PASSAGE_AUDIO_FILES[volumeId]?.[trackNumber];
  return filename ? `${import.meta.env.BASE_URL}${encodeURIComponent(filename)}` : undefined;
}

export function getPassageAudioTrackNumbers(volumeId: number): number[] {
  return Object.keys(PASSAGE_AUDIO_FILES[volumeId] || {}).map(Number).sort((a, b) => a - b);
}
