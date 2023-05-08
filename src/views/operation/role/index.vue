<script setup lang="ts">
import { ref } from "vue";
import { GTable, GPanelTable } from "gtm-ui";
import CreateRole from "./components/create-role.vue";
// 子组件实例
const createRoleRef = ref<InstanceType<typeof CreateRole>>();

// 表格列配置
const columns: any = [
  {
    label: "Role Code",
    prop: "date",
    width: "220px",
    show: true
  },
  {
    label: "Role Name",
    prop: "name",
    width: "220px",
    show: true
  },
  {
    label: "Role Description",
    prop: "address",
    width: "250px",
    show: true
  },
  {
    label: "Application",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Sales Org.",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Approval Role",
    prop: "address",
    width: "200px",
    show: true
  },
  {
    label: "Status",
    prop: "address",
    width: "180px",
    show: true
  },
  {
    label: "Created On",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Modified On",
    prop: "address",
    width: "auto",
    minWidth: "220px",
    show: true
  },
  {
    label: "Action",
    prop: "address",
    width: "240px",
    fixed: "right",
    show: true
  }
];
// 表格数据
const tableData = [];
// 表格状态
const loading = ref(true);

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
              @click="createRoleRef.handleShow({ id: null })"
            >
              Create
            </el-button>
            <el-button type="primary"> Export </el-button>
            <el-button type="primary"> Approval Check >>> </el-button>
          </template>
        </GTable>
      </template>
    </GPanelTable>
    <!-- 创建和编辑角色 -->
    <CreateRole ref="createRoleRef" />
  </div>
</template>
