import TDesign from "tdesign-vue-next";
// 引入组件库全局样式资源
import "tdesign-vue-next/es/style/index.css";
import { createApp } from "vue";
import App from "./app.vue";

const app = createApp(App);
app.use(TDesign);

app.mount("#app");
