import { IData, ISelected } from '../types';

export const giveRoundsTillSelected = (data: IData[], selected: ISelected) => {
  const roundsTillSelected = data.filter((rounds: IData) => {
    return rounds.round === selected.id;
  })

  return roundsTillSelected[0];
}