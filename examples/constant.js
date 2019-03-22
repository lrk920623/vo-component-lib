export const StoreModuleName = {
  home: 'home',
  modal: 'modal',
  table: 'table'
}

export const style = {
  siderWidth: '230px',
  siderWidthShrink: '80px'
}

export function getRules(rule) {
  const rules = rule.map(s => {
    return {
      [s[0]]: true,
      message: s[1]
    }
  })

  return { rules }
}

export function buildValidator(validator) {
  _.forIn(validator, (val, key) => {
    val.code = key
    val.rule = [key, { ...getRules(val.rule) }]
  })

  return validator
}

export const types = {
  store: {
    id: 1,
    sign: 'store',
    title: '门店',
    code: 'storeCode',
    name: 'storeName'
  },
  category: {
    id: 2,
    sign: 'category',
    title: '类别',
    code: 'categoryCode',
    name: 'categoryName',
    level: { code: 'levelCode', name: 'levelName' }
  },
  operation: {
    id: 3,
    sign: 'operation',
    title: '业态',
    code: 'businessOperationCode',
    name: 'businessOperationName',
    noInput: true,
    noPage: true
  },
  class: {
    id: 4,
    sign: 'class',
    title: '品类组',
    code: 'classCode',
    name: 'className',
    level: { code: 'levelCode', name: 'levelName' }
  },
  district: {
    id: 5,
    sign: 'district',
    title: '地区',
    code: 'districtCode',
    name: 'districtName',
    noInput: true,
    noPage: true
  },
  brand: {
    id: 6,
    sign: 'brand',
    title: '品牌',
    code: 'brandId',
    name: 'brandName'
  },
  product: {
    id: 7,
    sign: 'product',
    title: '商品',
    code: 'productId',
    name: 'productName',
    showCode: 'productCode',
    span: 8
  },
  group: {
    id: 8,
    sign: 'group',
    title: '店群',
    code: 'groupId',
    name: 'groupName',
    noInput: true,
    noPage: true
  },
  supplier: {
    id: 9,
    sign: 'supplier',
    title: '供应商',
    code: 'supplierId',
    name: 'supName',
    showCode: 'supplierCode',
    span: 8
  },
  newProduct: {
    id: 10,
    sign: 'newProduct',
    title: '新品',
    code: 'productId',
    name: 'productName',
    showCode: 'productCode'
  }
}
