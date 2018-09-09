import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import roundReducer from './roundReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  selected: roundReducer
});

export default rootReducer;