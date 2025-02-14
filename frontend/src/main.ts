import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

import ArcoVue from "@arco-design/web-vue";
import { createPinia } from "pinia";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import "@/access";

const app = createApp(App);

const pinia = createPinia();

createApp(App)
  .use(ArcoVue)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
