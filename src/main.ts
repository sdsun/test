import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus";
import { useI18n } from "@/plugins/i18n";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import { injectResponsiveStorage } from "@/utils/responsive";
import {
  renderWithQiankun,
  qiankunWindow
} from "vite-plugin-qiankun/dist/helper";
// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标-框架公共图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";
import * as directives from "@/directives";
// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
import { useUserStore } from "@/store/modules/useUserStore";
// 微前端QIANKUN配置
let instance: any = null;
function render(props: any = {}) {
  const { container } = props;
  instance = createApp(App);

  // 自定义指令
  Object.keys(directives).forEach(key => {
    instance.directive(key, (directives as { [key: string]: Directive })[key]);
  });

  instance.component("IconifyIconOffline", IconifyIconOffline);
  instance.component("IconifyIconOnline", IconifyIconOnline);
  instance.component("FontIcon", FontIcon);
  instance.component("Auth", Auth);

  getServerConfig(instance).then(async config => {
    instance.use(router);
    await router.isReady();
    injectResponsiveStorage(instance, config);
    setupStore(instance);
    if (qiankunWindow.__POWERED_BY_QIANKUN__) {
      const user = useUserStore();
      user.setToken(props.token);
      user.setSourceList(props.sourceList);
    }
    instance.use(MotionPlugin).use(useI18n).use(ElementPlus);
    instance?.mount(container ? container.querySelector("#app") : "#app");
  });
}
renderWithQiankun({
  mount(props: any) {
    console.info(props);
    // 储存主应用传递信息，如：TOKEN
    // 渲染
    if (props.platform.isTab) {
      props.container.querySelector("#app").classList.add("margin-tab");
    }
    render(props);
  },
  bootstrap() {
    console.log("[vue] vue app bootstraped");
  },
  update() {
    console.log("[vue] vue app updated");
  },
  unmount(props: any) {
    console.log("unmount", props);
    instance.unmount();
    instance._container.innerHTML = "";
  }
});
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
