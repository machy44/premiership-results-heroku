export interface ISelected {
  value: string,
  label: string,
  id: number,
}

export interface IData {
  round: number;
  matches: object[],
}

export interface IStoreState {
  data: IData[];
  selected: ISelected;
}