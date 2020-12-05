// react library imports
import { combineReducers } from 'redux';
import authorsReducer from './author/reducers/author.reducer'

const rootReducer = combineReducers(
  {
    authorsReducer
  }
);

export default rootReducer;
