<script setup lang="ts">
import { ref } from "vue";
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
    prop: "date",
    width: "240px",
    show: true
  },
  {
    label: "Type",
    prop: "name",
    width: "220px",
    show: true
  },
  {
    label: "Sales Org",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Icon",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Rank",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Path",
    prop: "address",
    width: "auto",
    minWidth: "300px",
    show: true
  },
  {
    label: "Action",
    prop: "address",
    width: "240px",
    show: true,
    fixed: "right"
  }
];
// 表格数据
const tableData = [];

const handleGet = () => {
  getSysMenu({}).then(res => {
    console.log(res);
  });
};

handleGet();
// 新增回调刷新表格
const handleOk = () => {
  console.log("refesh table");
};
setTimeout(() => {
  loading.value = false;
}, 1500);
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
        >
          <template #tableLeft>
            <el-button
              type="primary"
              @click="createMenuRef.handleShow({ id: null })"
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
