import {
  AUTHOR,
  AUTHOR_FAIL,
  AUTHOR_SUCCESS
} from '../actions/author.actions';

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHOR:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: null,
        error: null,
      };

    case AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.data
      };

    case AUTHOR_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: null,
        error: action.ex
      };

    default:
      return state
  }
}
