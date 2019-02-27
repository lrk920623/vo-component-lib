import Vue from "vue";

// 导入组件，组件必须声明 name
import VoInput from "./Input.vue";
import { Input } from "ant-design-vue";

// 为组件提供 install 安装方法，供按需引入
VoInput.install = function(Vue) {
  Vue.component(VoInput.name, VoInput);
};

Vue.use(Input);

// 默认导出组件
export default VoInput;
