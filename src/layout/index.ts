import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
const Layout = () => import("@/layout/index.vue");
const RouteView = () => import("@/layout/RouteView.vue");
const BasicLayout = qiankunWindow.__POWERED_BY_QIANKUN__ ? RouteView : Layout;

export { BasicLayout, Layout, RouteView };
