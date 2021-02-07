import { all, takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import { fetchWeatherSaga, locateUserSaga } from './weather'

export function* watchWeather() {
  yield all([
    takeEvery(actionTypes.FETCH_WEATHER, fetchWeatherSaga),
    takeEvery(actionTypes.LOCATE_USER, locateUserSaga)
  ])
}