import fetch from './fetch';

export function Login(data) {
  return fetch({
    url: '/user/login',
    method: 'get',
    data
  });
}

export function Logout() {
  return fetch({
    url: '/user/logout',
    method: 'get',
  });
}

export function test() {
  return fetch({
    url: '/data.json',
    method: 'get',
  });
}