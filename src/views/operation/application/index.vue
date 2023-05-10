<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { GTable, GPanelTable } from "gtm-ui";
import { getSysMenu } from "@/api/operation";
import CreateMenu from "./components/create-menu.vue";
// 子组件实例
const createMenuRef = ref<InstanceType<typeof CreateMenu>>();
// 表格配置
const loading = ref(true);
// 列表列数据
const columns: any = [
  {
    label: "Menu Name",
    prop: "name",
    width: "240px",
    show: true
  },
  {
    label: "Code",
    prop: "code",
    width: "200px",
    show: true
  },
  {
    label: "Icon",
    prop: "icon",
    width: "60px",
    show: true,
    cellRenderer(props: any) {
      return h("i", {
        class: `iconfont ${props.row.icon}`,
        style: { fontSize: "20px" }
      });
    }
  },
  {
    label: "Rank",
    prop: "resOrder",
    width: "80px",
    show: true
  },
  {
    label: "Path",
    prop: "url",
    width: "auto",
    minWidth: "360px",
    show: true
  },
  {
    label: "Action",
    prop: "address",
    width: "240px",
    show: true,
    fixed: "right",
    actions: [
      {
        label: "Edit",
        onClick: (action, scope) => {
          createMenuRef.value.handleShow(2, scope.row);
        }
      },
      {
        label: "Detail",
        onClick: (action, scope) => {
          createMenuRef.value.handleShow(4, scope.row);
        }
      },
      {
        label: "Add Submenu",
        onClick: (action, scope) => {
          createMenuRef.value.handleShow(3, scope.row);
        }
      }
    ]
  }
];
// 表格数据
const tableData = ref([]);

const handleGetTableData = () => {
  loading.value = true;
  getSysMenu()
    .then(res => {
      loading.value = false;
      const { code, data } = res;
      if (code === 0) {
        tableData.value = data;
      }
    })
    .catch(() => {
      loading.value = false;
    });
};

onMounted(() => {
  handleGetTableData();
});
// 刷新表格
const handleOk = () => {
  handleGetTableData();
};
</script>
<template>
  <div class="h-full">
    <GPanelTable>
      <template #table>
        <GTable
          row-key="id"
          border
          showOverflowTooltip
          headerAlign="left"
          :loading="loading"
          :data="tableData"
          :columns="columns"
          :pagination="null"
          :select-info-append="null"
          :config-table="{ setting: false, font: false, fullscreen: false }"
          :tree-props="{
            children: 'sysMenuDtoList'
          }"
        >
          <template #tableLeft>
            <el-button
              type="primary"
              @click="createMenuRef.handleShow(1, { id: null })"
            >
              Create
            </el-button>
          </template>
        </GTable>
      </template>
    </GPanelTable>
    <!-- 创建和编辑菜单 -->
    <CreateMenu ref="createMenuRef" @ok="handleOk" />
  </div>
</template>
