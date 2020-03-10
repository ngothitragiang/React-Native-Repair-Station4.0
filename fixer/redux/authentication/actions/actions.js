import * as typesAction from './typesAction';
export const login = data => {
  return {
    type: typesAction.LOGIN,
    data,
  };
};

export const loginSuccess = data => {
  return {
    type: typesAction.LOGIN_SUCCESS,
    data,
  };
};

export const loginFailed = error => {
  return {
    type: typesAction.LOGIN_SUCCESS,
    error,
  };
};

export const logOut = () => {
  return {
    type: typesAction.LOGOUT,
  };
};
export const logOutSuccess = () => {
  return {
    type: typesAction.LOGOUT_SUCCESS,
  };
};
export const logOutFailed = () => {
  return {
    type: typesAction.LOGOUT_FAILED,
  };
};
//register
export const register = data => {
  return {
    type: typesAction.REGISTER,
    data,
  };
};
export const registerSuccess = () => {
  return {
    type: typesAction.REGISTER_SUCCESS,
  };
};
export const registerFailed = () => {
  return {
    type: typesAction.REGISTER_FAILED,
  };
};

//GET DATA STATION INFORMATION

export const getStation = () => {
  return {
    type: typesAction.GET_STATION,
  };
};
export const getStationSuccess = data => {
  return {
    type: typesAction.GET_STATION_SUCCESS,
    data,
  };
};

export const getStationFailed = error => {
  return {
    type: typesAction.GET_STATION_FAILED,
    error,
  };
};

//CHANGE POWER

export const changePower = (stationKey, status) => {
  return {
    type: typesAction.CHANGE_POWER,
    stationKey,
    status,
  };
};
