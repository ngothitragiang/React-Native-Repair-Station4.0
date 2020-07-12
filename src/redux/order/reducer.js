import * as typesAction from './actions/typesAction';

const init = {
  dataOrder: [],
  loading: false,
};

const OrderReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_ORDER:
      return {...state, loading: true};
    case typesAction.GET_ALL_ORDER_SUCCESS:
      return {...state, dataOrder: action.data.sources, loading: false};
    case typesAction.ADD_SERVICE_TO_ORDER_SUCCESS:
      return {...state};

    case typesAction.CHANGE_STATUS:
      return {...state, loading: true};
    case typesAction.CHANGE_STATUS_SUCCESS:
      return {...state, dataOrder: action.data, loading: false};
    case typesAction.CHANGE_STATUS_FAILED:
      return {...state, loading: false};
    default:
      return {...state};
  }
};
export default OrderReducers;
