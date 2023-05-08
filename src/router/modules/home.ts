import { $t } from "@/plugins/i18n";
import { BasicLayout } from "@/layout/index";

export default {
  path: "/",
  name: "Home",
  component: BasicLayout,
  redirect: "/index",
  meta: {
    icon: "House",
    title: $t("menus.hshome"),
    rank: 0
  },
  children: [
    {
      path: "/index",
      name: "Home",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.hshome")
      }
    }
  ]
} as RouteConfigsTable;
