export default {
  path: "/operation",
  redirect: "/operation/user",
  meta: {
    icon: "informationLine",
    title: "operation",
    rank: 4
  },
  children: [
    {
      path: "/operation/user",
      name: "OperationUser",
      component: () => import("@/views/operation/user/index.vue"),
      meta: {
        title: "User Center"
      }
    },
    {
      path: "/operation/identity",
      name: "OperationIdentity",
      component: () => import("@/views/operation/identity/index.vue"),
      meta: {
        title: "Identity List"
      }
    },
    {
      path: "/operation/company",
      name: "OperationCompany",
      component: () => import("@/views/operation/company/index.vue"),
      meta: {
        title: "Company Setting"
      }
    },
    {
      path: "/operation/role",
      name: "OperationRole",
      component: () => import("@/views/operation/role/index.vue"),
      meta: {
        title: "Role Manage"
      }
    },
    {
      path: "/operation/application",
      name: "OperationApplication",
      component: () => import("@/views/operation/application/index.vue"),
      meta: {
        title: "Menu"
      }
    }
  ]
} as RouteConfigsTable;
