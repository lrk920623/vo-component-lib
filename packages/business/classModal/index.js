// 导入组件，组件必须声明 name
import ClassModal from './ClassModal.vue'

// 为组件提供 install 安装方法，供按需引入
ClassModal.install = function(Vue) {
  Vue.component(ClassModal.name, ClassModal)
}

// 默认导出组件
export default ClassModal
