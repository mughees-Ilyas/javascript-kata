
import { all } from 'redux-saga/effects'
import authorSaga from './author/sagas/author.saga.js'
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    authorSaga()
  ])
}
