import * as typesAction from './typesAction';
// REGISTER STATION
export const registerStation = (station, componentId) => {
  return {
    type: typesAction.REGISTER_STATION,
    station,
    componentId,
  };
};
export const registerStationSuccess = () => {
  return {
    type: typesAction.REGISTER_STATION_SUCCESS,
  };
};
export const registerStationFailed = error => {
  return {
    type: typesAction.REGISTER_STATION_FAILED,
    error,
  };
};

//GET STATION BY ID
export const getStationById = stationId => {
  return {
    type: typesAction.GET_STATION_BY_ID,
    stationId,
  };
};
export const getStationByIdSuccess = data => {
  return {
    type: typesAction.GET_STATION_BY_ID_SUCCESS,
    data,
  };
};
export const getStationByIdFailed = () => {
  return {
    type: typesAction.GET_STATION_BY_ID_FAILED,
  };
};

//CHANGE POWER

export const changePower = (stationId, isOn) => {
  return {
    type: typesAction.CHANGE_POWER,
    stationId,
    isOn,
  };
};

export const changePowerSuccess = changePower => {
  return {
    type: typesAction.CHANGE_POWER_SUCCESS,
    changePower,
  };
};

export const changePowerFailed = () => {
  return {
    type: typesAction.CHANGE_POWER_FAILED,
  };
};
