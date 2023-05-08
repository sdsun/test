import { $t } from "@/plugins/i18n";

export default {
  path: "/WangEditor",
  name: "WangEditor",
  component: () => import("@/views/editor/WangEditor.vue"),
  meta: {
    title: $t("menus.editor"),
    icon: "edit",
    rank: 1
  }
} as RouteConfigsTable;
