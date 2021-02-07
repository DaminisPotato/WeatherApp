import { call, put } from 'redux-saga/effects';
import { weatherAxios } from '../../axios';
import * as actions from '../actions/index';

export function* fetchWeatherSaga(action) {
  yield put(actions.fetchWeatherStart())
  const queryParams = '?lat=' + action.location.lat + '&lon=' + action.location.lon 
      + "&exclude=minutely,hourly,alerts&appid=e45ea3cc83e554595edc6c28ab17b4f5"
  try{
    const response = yield weatherAxios.get(action.url+ queryParams)
    yield console.log(response)
    yield put(actions.fetchWeatherSuccess(response.data))
  }catch(error) {
    yield console.log(error)
    yield put(actions.fetchWeatherFail(error.data))
  }
}

export function* locateUserSaga(action) {
  yield put(actions.locateUserStart());
  const getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        type:'success',
        location: {
          lat: position.coords.latitude.toFixed(2),
          lon: position.coords.longitude.toFixed(2)}  
      }),
      error => resolve({
        type:'error',
        meassage: error.message
      }))
  })
  const result = yield call(getUserLocation)
  yield console.log(result)
  if(result.type === 'success'){
    const cityInfo = yield weatherAxios.get(
      `weather?lat=${result.location.lat}&lon=${result.location.lon}&appid=e45ea3cc83e554595edc6c28ab17b4f5`)
    const location = {
      city: cityInfo.data.name,
      country: cityInfo.data.sys.country,
      ...result.location
    }
    yield put(actions.locateUserSuccess(location))
  }
  if(result.type === 'error'){
    const defaultLocation = {
      city: "Sydney",
      country: 'AU',
      lat:"-33.86",
      lon:"151.19"  
    }
    yield put(actions.locateUserFail(result.message, defaultLocation))
  }
}