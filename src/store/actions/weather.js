import * as actionTypes from './actionTypes';

export const fetchWeather = (url, location) => {
  return {
    type: actionTypes.FETCH_WEATHER,
    url: url,
    location: location
  }
}

export const fetchWeatherStart = () => {
  return {
    type: actionTypes.FETCH_WEATHER_START
  }
}

export const fetchWeatherSuccess = (weather) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    weather: weather
  }
}

export const fetchWeatherFail = (error) => {
  return {
    type: actionTypes.FETCH_WEATHER_FAIL,
    error: error
  }
}

export const locateUser = () => {
  return {
    type: actionTypes.LOCATE_USER
  }
};

export const locateUserStart = () => {
  return {
    type: actionTypes.LOCATE_USER_START,
  }
}

export const locateUserSuccess = (location) => {
  return {
    type: actionTypes.LOCATE_USER_SUCCESS,
    location: location
  }
};

export const locateUserFail = (error, location) => {
  return {
    type: actionTypes.LOCATE_USER_FAIL,
    error: error,
    location: location
  }
}

// export const setLocation = (location) => {
//   return {
//     type: actionTypes.SET_LOCATION,
//     location: location
//   }
// }

export const searchCity = (url, location) => {
  return {
    type: actionTypes.SEARCH_CITY,
    url: url,
    location: location
  }
}

export const searchCityStart = () => {
  return {
    type: actionTypes.SEARCH_CITY_START
  }
}

export const searchCitySuccess = (location) => {
  return {
    type: actionTypes.SEARCH_CITY_SUCCESS,
    location: location
  }
}

export const searchCityFail = (error) => {
  return {
    type: actionTypes.SEARCH_CITY_FAIL,
    error: error
  }
};