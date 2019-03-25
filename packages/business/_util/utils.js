import { Modal } from 'ant-design-vue'
import {
  remove,
  union,
  debounce
} from 'lodash'

export function _debounce(getList, delay) {
  return debounce(getList, delay || 500)
}

export function invalid(value) {
  const pattern = /^[\d,]*$/g
  const result = pattern.test(value)

  return result ? '' : '只能输入数字、逗号(半角)，不能含空格'
}

/**
 * 检测编码tab下的搜索内容 只能输入数字、逗号
 */
export function isInvalid(value, getList) {
  if (self.level !== 0) return false

  const pattern = /^[\d,]*$/g
  const result = pattern.test(value)
  self.errorInfo = result ? '' : '只能输入数字、逗号(半角)，不能含空格'

  if (self.errorInfo) {
    self.initList = []
    self.total = 0
    return true
  } else {
    return false
  }
}

/**
 * 构建模态框数据的接口请求参数
 */
export function buildParam(moduleId, search, pageNo, key) {
  key = key || {}

  let param = {}
  let condition = { moduleId }

  if (search || search === 0) {
    condition.key = search
    condition.keyType = /,/g.test(search) ? 1 : 0 // 搜索模式 包含逗号代表批量搜索
  }

  if (!key.hidePager) {
    param.page = {
      pageNo: pageNo || 1, //起始页 （默认为1）
      pageSize: key.per || 100 //分页大小 （默认为100）
    }
  }

  param.condition = condition

  return param
}

/**
 * 检查选择的指标是否超出限制
 * @param ready 当前操作的选中的指标
 * @param selected 已经选好的指标
 * @param maxCount 最大数量 (null 表示不限制个数)
 * @returns {boolean}
 */
export function control(ready, selected, maxCount) {
  if (!isLimit(maxCount)) return false

  const result = ready + selected > maxCount
  if (result)
    Modal.error({ title: '警告', content: `最多只能选择${maxCount}项` })

  return result
}

export function isLimit(type) {
  return type !== 'unLimit'
}

export function reverseValid(list, select, maxCount) {
  const unSel = list.filter(s => !s.selected)
  const outLength = list.length - unSel.length
  return control(unSel.length, select.length - outLength, maxCount)
}

export function allValid(list, select, maxCount) {
  const unSel = list.filter(s => !s.selected)
  return control(unSel.length, select.length, maxCount)
}

/**
 * 全选
 * @param list 当前显示的列表
 * @param selected 当前已选中的值
 * @param type 当前的业务类型
 * @param level 层级
 * @returns {*}
 */
export function allChoose(list, selected, type, level) {

  const filter = list.filter(c => !c.selected).map(s => {
    const sel = {
      [type.code]: String(s[type.code]),
      [type.name]: s[type.name]
    }

    if (type.showCode) sel.showCode = s[type.showCode]
    if (s.level) sel.level = s.level
    return sel
  })

  //编码Tab，当选的层级和之前选中的层级不一样时，清除之前的层级
  if (type.level && level === 0 && selected.length && filter.length) {
    if (selected[0].level !== filter[0].level) selected = []
  }

  list.forEach(c => (c.selected = true))

  return union(selected, filter)
}

/**
 * 反选
 * @param list 当前显示的列表
 * @param selected 当前已选中的值
 * @param type 当前的业务类型
 * @param level 层级
 * @returns {*}
 */
export function reverseChoose(list, selected, type, level) {
  list.forEach(c => (c.selected = !c.selected))

  const filter = list.filter(c => c.selected).map(s => {
    const sel = {
      [type.code]: String(s[type.code]),
      [type.name]: s[type.name]
    }

    if (type.showCode) sel.showCode = s[type.showCode]
    if (s.level) sel.level = s.level
    return sel
  })

  //编码Tab，当选的层级和之前选中的层级不一样时，清除之前的层级
  if (type.level && level === 0 && selected.length && filter.length) {
    if (selected[0].level !== filter[0].level) selected = []
  }

  selected = union(selected, filter)

  remove(selected, s => {
    return list
      .filter(c => !c.selected)
      .map(c => String(c[type.code]))
      .includes(s[type.code])
  })

  return selected
}
