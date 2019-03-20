// 导入组件，组件必须声明 name
import CategoryModal from './CategoryModal.vue'

// 为组件提供 install 安装方法，供按需引入
CategoryModal.install = function(Vue) {
  Vue.component(CategoryModal.name, CategoryModal)
}

// 默认导出组件
export default CategoryModal
