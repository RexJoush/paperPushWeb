import request from '@/utils/request'
import { baseUrl } from '@/api/url'

// 获取所有字数统计
export function initMyGraph() {
  return request({
    url: baseUrl + '/statistics/initMyGraph',
    method: 'get'
  })
}

// 更新 ddl
export function updateDeadline(deadline) {
  return request({
    url: baseUrl + '/statistics/updateDeadline',
    method: 'get',
    params: {
      deadline: deadline
    }
  })
}

// 更新目标字数
export function updateTarget(target) {
  return request({
    url: baseUrl + '/statistics/updateTarget',
    method: 'get',
    params: {
      target: target
    }
  })
}
