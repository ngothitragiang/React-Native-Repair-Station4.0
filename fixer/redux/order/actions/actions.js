import * as typesAction from './typesAction';

export const getAllOrder = () => {
  return {
    type: typesAction.GET_ALL_ORDER,
  };
};
export const getAllOrderSuccess = data => {
  return {
    type: typesAction.GET_ALL_ORDER_SUCCESS,
    data,
  };
};

export const addServiceToOrder = (data, orderId) => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER,
    data,
    orderId,
  };
};

export const addServiceToOrderSuccess = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER_SUCCESS,
  };
};
export const addServiceToOrderFailed = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER_FAILED,
  };
};
