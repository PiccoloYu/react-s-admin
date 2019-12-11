import fetch from './fetch';

export function Login(data) {
  return fetch({
    url: '/user/login',
    method: 'get',
    data
  });
}


export function test() {
  return fetch({
    url: '/data.json',
    method: 'get',
  });
}