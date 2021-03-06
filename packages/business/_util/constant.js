export const classTypes = [
  { id: 2, name: '部门', code: 'classSectionCode', length: 2 },
  { id: 3, name: '部组', code: 'classSubSectionCode', length: 3 },
  { id: 4, name: '品类组', code: 'classCode', length: 5 }
]

export const categoryTypes = [
  { id: 1, name: '部门', active: true, len: 1 },
  { id: 2, name: '大分类', active: false, len: 3 },
  { id: 3, name: '中分类', active: false, len: 4 },
  { id: 4, name: '小分类', active: false, len: 5 },
  { id: 5, name: '子类', active: false, len: 6 }
]

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
