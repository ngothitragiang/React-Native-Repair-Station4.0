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
      return {...state, dataOrder: action.data, loading: false};
    case typesAction.ADD_SERVICE_TO_ORDER_SUCCESS:
      return {...state};

    default:
      return {...state};
  }
};
export default OrderReducers;
