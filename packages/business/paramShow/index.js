// 导入组件，组件必须声明 name
import ParamShow from './ParamShow.vue'

// 为组件提供 install 安装方法，供按需引入
ParamShow.install = function(Vue) {
  Vue.component(ParamShow.name, ParamShow)
}

// 默认导出组件
export default ParamShow
