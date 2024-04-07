export enum Color {
  GREEN = "#BDFF00",
  RED = "#FA6400",
  TURQUOISE = "#15B8A6",
  YELLOW = "#FAC819",
  LIGHT_ORANGE = "#FDBA74",
  ORANGE = "#FA6400",
  PINK = "#FDA4AF",
  LIGHT_BLUE = "#7DD3FC",
  LIGHT_PURPLE = "#A5B4FB",
  DARK_GREY = "#333333",
  SECONDARY_TEXT = "#7E7E7E",
  PRIMARY_TEXT = "#FFFFFF",
  BACKGROUND = "#0A0A0A",
}

export const CHUNK_COLORS = [
  Color.RED,
  Color.YELLOW,
  Color.GREEN,
  Color.LIGHT_ORANGE,
  Color.TURQUOISE,
  Color.LIGHT_BLUE,
  Color.LIGHT_PURPLE,
  Color.PINK,
  Color.ORANGE,
];

export const SCORE_SCALE = 100;

export const TIME_OPTIONS = [
  { option: "30s", value: 30 },
  { option: "60s", value: 60 },
  { option: "2m", value: 120 },
];

export const LANGUAGE_OPTIONS = [
  { option: "en", value: "en" },
  { option: "es", value: "es" },
  { option: "fr", value: "fr" },
];

export const TAB_OPTIONS = [
  { option: "on", value: true },
  { option: "off", value: false },
];

export const ABOUT_SCROLLER_WORDS = [
  {
    fullWord: "fyoulikewordgameslinkywasmadeforyouandi",
    chunks: [
      {
        chunk: "fyoulike",
        color: Color.PRIMARY_TEXT,
      },
      {
        chunk: "word",
        color: Color.LIGHT_BLUE,
      },
      {
        chunk: "games",
        color: Color.PRIMARY_TEXT,
      },
      {
        chunk: "linky",
        color: Color.YELLOW,
      },
      {
        chunk: "wasmadefor",
        color: Color.PRIMARY_TEXT,
      },
      {
        chunk: "you",
        color: Color.ORANGE,
      },
      {
        chunk: "and",
        color: Color.PRIMARY_TEXT,
      },
      {
        chunk: "i",
        color: Color.LIGHT_PURPLE,
      },
    ],
  },
];
