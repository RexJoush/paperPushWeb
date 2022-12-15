import request from '@/utils/request'
import { baseUrl } from '@/api/url'

// 获取所有字数统计
export function initGraph() {
  return request({
    url: baseUrl + '/display/init',
    method: 'get'
  })
}
