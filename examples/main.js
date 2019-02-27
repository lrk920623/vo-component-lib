import Vue from "vue";
import App from "./App.vue";
import { Input } from "ant-design-vue";
import "ant-design-vue/lib/input/style";

Vue.config.productionTip = false;

Vue.use(Input);

new Vue({
  render: h => h(App)
}).$mount("#app");
