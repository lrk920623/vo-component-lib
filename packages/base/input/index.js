// 导入组件，组件必须声明 name
import VoInput from './Input.vue'

// 为组件提供 install 安装方法，供按需引入
VoInput.install = function(Vue) {
  Vue.component(VoInput.name, VoInput)
}

// 默认导出组件
export default VoInput
