import request from '@/utils/request'
import { baseUrl } from '@/api/url'

// 获取所有字数列表
export function listRecord(pageNo, pageSize) {
  return request({
    url: baseUrl + '/record/list',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}

// 添加记录
export function addRecord(words) {
  return request({
    url: baseUrl + '/record/add',
    method: 'get',
    params: {
      words: words
    }
  })
}

// 更新记录
export function editRecord(id, words) {
  return request({
    url: baseUrl + '/record/edit',
    method: 'get',
    params: {
      id: id,
      words: words
    }
  })
}

// 删除记录
export function delRecord(id) {
  return request({
    url: baseUrl + '/record/del',
    method: 'get',
    params: {
      id: id
    }
  })
}
