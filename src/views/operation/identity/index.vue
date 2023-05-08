<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GTable, GPanelTable } from "gtm-ui";
import { CreateIdentity, TreeConfig, OperationRecord } from "./components";
// 子组件实例
const createIdentityRef = ref<InstanceType<typeof CreateIdentity>>();
const treeConfigRef = ref<InstanceType<typeof TreeConfig>>();
const operationRecordRef = ref<InstanceType<typeof OperationRecord>>();

// 表格状态
const loading = ref(true);
// 表格列配置
const columns: any = [
  {
    label: "Sales Org",
    prop: "date",
    width: "220px",
    show: true
  },
  {
    label: "Identity Name",
    prop: "name",
    width: "220px",
    show: true
  },
  {
    label: "Department",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Line Leader Identity",
    prop: "address",
    width: "220px",
    show: true
  },
  {
    label: "Short Name",
    prop: "address",
    width: "auto",
    minWidth: "240px",
    show: true
  },
  {
    label: "Operation",
    prop: "address",
    width: "240px",
    show: true,
    fixed: "right"
  }
];
// 表格数据
const tableData = [];
// 获取表单数据方法
const handleGetTableData = () => {};
onMounted(() => {
  handleGetTableData();
  loading.value = false;
});
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
              @click="createIdentityRef.handleShow({ id: null })"
            >
              Create
            </el-button>
            <el-button type="primary" @click="treeConfigRef.handleShow()">
              Tree Configure
            </el-button>
            <el-button type="primary" @click="operationRecordRef.handleShow()">
              Operation Record
            </el-button>
          </template>
        </GTable>
      </template>
    </GPanelTable>
    <!-- 新增和编辑岗位 -->
    <CreateIdentity ref="createIdentityRef" />
    <!-- 职位树 -->
    <TreeConfig ref="treeConfigRef" />
    <!-- 操作记录 -->
    <OperationRecord ref="operationRecordRef" />
  </div>
</template>
