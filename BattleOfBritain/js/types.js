// @flow

export type Location = {
  name: string,
  label: string,
  civilians: number,
  casualties: number,
};

export type Sortie = {
  planes: number,
  target: string,
};

export type State = {
  locations: {[name: string]: Location},
  ticker: Array<string>,
  planes: number,
  sorties: Array<Sortie>,
  enemy: {
    planes: number,
    missions: Array<Sortie>,
  },
  day: number,
};
