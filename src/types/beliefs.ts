export type BeliefPhrase = {
  id: string;
  text: string;
  backgroundStopIndex: number;
};

export type BeliefBackgroundStop = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
