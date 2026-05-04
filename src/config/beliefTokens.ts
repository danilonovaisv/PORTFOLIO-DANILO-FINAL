export const beliefColors = {
  deepVoid: "#040013",
  bluePrimary: "#0048ff",
  purpleDetails: "#8705f2",
  pinkDetails: "#f501d3",
  blueAccent: "#4fe6ff",
  white: "#ffffff",
} as const;

export const beliefZIndex = {
  background: 0,
  overlay: 10,
  fixedHeader: 30,
  scrollText: 40,
  manifesto: 50,
  ghost: 70,
} as const;

export const beliefMotion = {
  ambientEase: [0.17, 0.55, 0.55, 1],
  ghostEase: [0.22, 1, 0.36, 1],
  softEase: [0.16, 1, 0.3, 1],
  microDuration: 0.16,
  revealDuration: 0.9,
  exitDuration: 0.5,
  ghostIntroDuration: 1.2,
  wordStagger: 0.08,
} as const;

export const beliefLayout = {
  sectionMinHeight: "620vh",
  phraseSectionHeight: "80vh",
  desktopPhraseMaxWidth: "38vw",
  desktopPhraseLeft: "clamp(1.5rem, 6vw, 6rem)",
  mobilePhraseBottom: "20vh",
} as const;
