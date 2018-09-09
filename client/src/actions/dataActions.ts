import { Dispatch } from 'redux';
import { IData } from '../types';
import * as types from './actionTypes';

export interface ILoadDataSuccess {
  type: types.LOAD_DATA_SUCCESS;
  payload: IData,
}

export const loadDataSuccess = (payload: IData) => ({
  type: types.LOAD_DATA_SUCCESS,
  // tslint:disable-next-line:object-literal-sort-keys
  payload
})


export const loadData = () => {
  return (dispatch: Dispatch<any>) => fetchData()
    .then(res => res.json())
    .then(data => {
      dispatch(loadDataSuccess(data))
    })
}

const URL = "api/results";

const fetchData = () => {
  return fetch(URL, { method: 'GET'})
}