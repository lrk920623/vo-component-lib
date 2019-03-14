// 导入组件，组件必须声明 name
import Modal from './Modal.vue'

// 为组件提供 install 安装方法，供按需引入
Modal.install = function(Vue) {
  Vue.component(Modal.name, Modal)
}

// 默认导出组件
export default Modal
