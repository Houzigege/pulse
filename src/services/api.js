import { stringify } from 'qs';
import request from '@/util/request';

export async function queryRule(params) {
  return request(`/user/getImageCode?${stringify(params)}`);
}

export async function openchat(params) {
  return request('/openchat', {
    method: 'POST',
    type: 'cors',
    body: params,
  });
}

export async function sendmessage(params) {
  return request('/sendmessage', {
    method: 'POST',
    type: 'cors',
    body: params,
  });
}

export async function likemoment(params) {
  return request('/likemoment', {
    method: 'POST',
    type: 'cors',
    body: params,
  });
}

export async function sharemoment(params) {
  return request('/sharemoment', {
    method: 'POST',
    type: 'cors',
    body: params,
  });
}

export async function lifestyle(params) {
  return request('/lifestyle', {
    method: 'POST',
    type: 'cors',
    body: params,
  });
}
