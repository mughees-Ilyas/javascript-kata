import {
  AUTHOR,
  AUTHOR_FAIL,
  AUTHOR_SUCCESS
} from '../actions/author.actions';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { environment } from '../../../../environment'

function fetchData() {
  let url = environment.API_URL + 'allData';
  return  fetch(url)
    .then(res => {
      return res.json();
    } )
    .then(data => ({ data }) )
    .catch(ex => {
      console.log('parsing failed', ex);
      return ({ ex });
    });
}

function* author() {
  const { data, ex } = yield call(fetchData);
  if (data)
    yield put({ type:AUTHOR_SUCCESS, data });
  else
    yield put({ type:AUTHOR_FAIL, ex });
}

function* watchInvite() {
  yield takeLatest(AUTHOR, author)
}

export default function* authorSaga() {
  yield all([
    watchInvite()
  ]);
}
