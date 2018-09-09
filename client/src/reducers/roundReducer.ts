import * as types from '../actions/actionTypes';
import { ISelectedRoundSuccess } from '../actions/roundActions';
import initialState from './initialState';

export default function dataReducer(state = initialState.selected, action: ISelectedRoundSuccess) {
  switch(action.type) {
    case types.SELECTED_ROUND_SUCCESS:
      return action.selected;
    default:
      return state;
  }
}