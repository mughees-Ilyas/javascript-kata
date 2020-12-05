import {
  ADVISOR,
  ADVISOR_FAIL,
  ADVISOR_SUCCESS
} from '../actions/author.actions';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { environment } from '../../../../environment'
const axios = require('axios');

function fetchData(payload) {
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

function* advisor(payload) {
  const { data, ex } = yield call(fetchData,payload);
  if (data)
    yield put({ type:ADVISOR_SUCCESS, data });
  else
    yield put({ type:ADVISOR_FAIL, ex });
}

function* watchInvite() {
  yield takeLatest(ADVISOR, advisor)
}

export default function* authorSaga() {
  yield all([
    watchInvite()
  ]);
}
