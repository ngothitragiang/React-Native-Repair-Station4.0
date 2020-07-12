import callApi from './apiCaller';
export const getAllOrderApi = (serviceId, token) => {
  return callApi('api/orders/stations/' + serviceId, 'GET', null, token);
};
export const updateStatusApi = (orderId, status, token) => {
  return callApi('api/orders/' + orderId, 'PUT', status, token);
};
