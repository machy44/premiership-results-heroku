import * as types from '../actions/actionTypes';
import { ILoadDataSuccess } from '../actions/dataActions';
import initialState from './initialState';

export default function dataReducer(state = initialState.data, action: ILoadDataSuccess) {
  switch(action.type) {
    case types.LOAD_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
