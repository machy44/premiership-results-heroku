import { ISelected } from '../types';
import * as types from './actionTypes';

export interface ISelectedRoundSuccess {
  type: types.SELECTED_ROUND_SUCCESS;
  selected: ISelected
}


export const selectedRoundSuccess = (selected: ISelected) => ({
  type: types.SELECTED_ROUND_SUCCESS,
  // tslint:disable-next-line:object-literal-sort-keys
  selected
})

export const selectRound = (selected: ISelected) => {
  return selectedRoundSuccess(selected)
}
