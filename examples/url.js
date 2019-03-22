let urls = {}

const master = {
  base: '/api/master-data/',
  list: {
    getOperation: 'get-store-operation',
    getDistrict: 'get-mt-store-district',
    getProduct: 'get-product-list-with-page',
    getStoreGroup: 'get-storegroup',
    getStore: 'get-mt-store-by-condition',
    getBrand: 'get-brand-list-with-page',
    getSupplier: 'get-supplier',
    getClass: 'get-class-list',
    getClassLevel: 'get-sub-class-level-list',
    getCategory: 'get-category-list',
    getCategoryLevel: 'get-sub-category-level-list'
  }
}

function addBase(url) {
  for (let key in url) {
    let v = url[key]
    join(v.base ? v.list : v, v.base || '')
  }

  function join(list, base) {
    for (let k in list) {
      urls[k] = base + list[k]
    }
  }
}

addBase({
  master
})

export { urls }
