import * as typesAction from './actions/typesAction';

const init = {
  data: [],
  onLogin: false,
  stationInformation: {},
};

const AuthenticationReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.LOGIN:
      return {...state};
    case typesAction.LOGIN_SUCCESS:
      return {...state};
    case typesAction.LOGIN_FAILED:
      return {...state};
    case typesAction.REGISTER_SUCCESS:
      return {...state};
    case typesAction.REGISTER_FAILED:
      return {...state};
    case typesAction.GET_STATION_SUCCESS:
      return {...state, stationInformation: action.data[0]};
    default:
      return {...state};
  }
};
export default AuthenticationReducers;
