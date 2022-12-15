import request from '@/utils/request'
import { baseUrl } from '@/api/url'
export function login(data) {
  return request({
    url: baseUrl + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: baseUrl + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: baseUrl + '/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: baseUrl + '/user/register',
    method: 'post',
    data
  })
}
