import callApi from './apiCaller';

export const getAllService = data => {
  return callApi('api/account/login', 'POST', data);
};