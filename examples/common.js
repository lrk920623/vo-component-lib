import { notification } from 'ant-design-vue'
import { urls } from './url'
import { types } from './constant'
import axios from 'axios'
import {
  forIn
} from 'lodash'

export function notify(title, content) {
  notification.open({
    message: title,
    description: content
  })
}

export function getUrlByType(type) {
  switch (type) {
    case types.brand.sign:
      return urls.getBrand

    case types.category.sign:
      return {
        tree: urls.getCategory,
        list: urls.getCategoryLevel
      }

    case types.product.sign:
      return urls.getProduct

    case types.store.sign:
      return {
        store: urls.getStore,
        operation: urls.getOperation,
        district: urls.getDistrict
      }

    case types.class.sign:
      return {
        tree: urls.getClass,
        list: urls.getClassLevel
      }

    case types.district.sign:
      return urls.getDistrict

    case types.group.sign:
      return urls.getStoreGroup

    case types.operation.sign:
      return urls.getOperation

    case types.supplier.sign:
      return urls.getSupplier
  }
}

export function buildPromise(url) {
  function fetch(url) {
    return payload => {
      return axios.post(url, payload).then(({ data }) => {
        return data
      })
    }
  }

  if (url instanceof Object) {
    forIn(url, (val, key) => {
      url[key] = fetch(val)
    })
    return url
  } else {
    return fetch(url)
  }
}
