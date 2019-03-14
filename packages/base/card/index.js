// 导入组件，组件必须声明 name
import VoCard from './Card.vue'

// 为组件提供 install 安装方法，供按需引入
VoCard.install = function(Vue) {
  Vue.component(VoCard.name, VoCard)
}

// 默认导出组件
export default VoCard
