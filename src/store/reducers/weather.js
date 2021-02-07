import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  location: null,
  weather: {},
  error: null,
}

const fetchWeatherStart = (state, action) => {
  return updateObject(state, {error: null, loading: true})
}

const fetchWeatherSucces = (state, action) => {
  return updateObject(state, {
    weather: action.weather,
    loading: false
  })
}

const fetchWeatherFail = (state, action) => {
  return updateObject(state, {error: action.error, loading: false})
}

const locateUserStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}

const locateUserSuccess = (state, action) => {
  return updateObject(state, {location: action.location})
}

const locateUserFail = (state, action) => {
  return updateObject(state, {error: action.error, location: action.location})
}

// const setLocation = (state, action) => {
//   return updateObject(state, {location: action.location})
// }

const searchCityStart = (state, action) => {
  return updateObject(state, {error: null, loading: true})
}

const searchCitySuccess = (state, action) => {
  return updateObject(state, {location: action.location})
}

const searchCityFail = (state, action) => {
  return updateObject(state, {error: action.error, loading: false})
}

const reducer =(state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_WEATHER_START: return fetchWeatherStart(state, action)
    case actionTypes.FETCH_WEATHER_SUCCESS: return fetchWeatherSucces(state, action)
    case actionTypes.FETCH_WEATHER_FAIL: return fetchWeatherFail(state, action)
    case actionTypes.LOCATE_USER_START: return locateUserStart(state, action)
    case actionTypes.LOCATE_USER_SUCCESS: return locateUserSuccess(state, action)
    case actionTypes.LOCATE_USER_FAIL: return locateUserFail(state, action)
    // case actionTypes.SET_LOCATION: return setLocation(state, action)
    default:
      return state
  }
}

export default reducer