<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { GTable, GPanelTable } from "gtm-ui";
import {
  CreateIdentity,
  TreeConfig,
  OperationRecord,
  AssignPer
} from "./components";
import { getSysIdentity } from "@/api/operation";
// 子组件实例
const createIdentityRef = ref<InstanceType<typeof CreateIdentity>>();
const treeConfigRef = ref<InstanceType<typeof TreeConfig>>();
const operationRecordRef = ref<InstanceType<typeof OperationRecord>>();
const assignPerRef = ref<InstanceType<typeof AssignPer>>();

// 表格配置
const loading = ref(true);
const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  background: true,
  total: 0
});
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
    prop: "identityName",
    width: "220px",
    show: true
  },
  {
    label: "Identity Code",
    prop: "identityCode",
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
    prop: "shortName",
    width: "auto",
    minWidth: "240px",
    show: true
  },
  {
    label: "Operation",
    prop: "action",
    width: "240px",
    show: true,
    fixed: "right"
  }
];
// 表格数据
const tableData = ref([]);
// 获取表单数据方法
const handleGetTableData = () => {
  loading.value = true;
  getSysIdentity({
    current: pagination.currentPage,
    size: pagination.pageSize,
    orgCode: "6560"
  })
    .then(res => {
      loading.value = false;
      const { code, data } = res;
      if (code === 0) {
        tableData.value = data.records;
        pagination.total = data.total;
      }
    })
    .catch(() => {
      loading.value = false;
    });
};
const handlePageSizeChange = () => {
  handleGetTableData();
};
const handleCurrentChange = () => {
  handleGetTableData();
};
onMounted(() => {
  handleGetTableData();
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
          :pagination="pagination"
          :select-info-append="null"
          :config-table="{ setting: false, font: false, fullscreen: false }"
          @page-size-change="handlePageSizeChange"
          @page-current-change="handleCurrentChange"
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
    <!-- 岗位权限 -->
    <AssignPer ref="assignPerRef" />
  </div>
</template>
