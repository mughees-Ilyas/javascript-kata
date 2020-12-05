// react library imports
import { combineReducers } from 'redux';
import advisorsReducer from './author/reducers/author.reducer'

const rootReducer = combineReducers(
  {
    advisorsReducer
  }
);

export default rootReducer;
