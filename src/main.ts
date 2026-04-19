import { createApp } from "vue";
import App from "./App.vue";
import "./styles/main.css";
import "@mdi/font/css/materialdesignicons.min.css";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .mount("#app");
