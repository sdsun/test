<template>
  <div class="data-per p-4">
    <!-- 内容 -->
    <div>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="mb-2">
            <el-input v-model="filterText" placeholder="Filter keyword" />
          </div>
          <div>
            <GTable
              row-key="id"
              border
              checkable
              showOverflowTooltip
              headerAlign="left"
              :loading="loading"
              :data="tableData"
              :columns="columns"
              :pagination="null"
              :select-info-append="null"
              :config-table="{ setting: false, font: false, fullscreen: false }"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="mb-2">
            <el-input v-model="filterText" placeholder="Filter keyword" />
          </div>
          <div>
            <GTable
              row-key="id"
              border
              checkable
              showOverflowTooltip
              headerAlign="left"
              :loading="loading"
              :data="tableData"
              :columns="columns"
              :pagination="null"
              :select-info-append="null"
              :config-table="{ setting: false, font: false, fullscreen: false }"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { GTable } from "gtm-ui";
// 表格状态
const loading = ref(true);
// 表格列配置
const columns: any = [
  {
    label: "Customer Code",
    prop: "date",
    width: "180px",
    show: true
  },
  {
    label: "Customer Name",
    prop: "name",
    width: "200px",
    show: true
  },
  {
    label: "Account Type",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Region",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Branch",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Channel",
    prop: "address",
    width: "160px",
    show: true
  },
  {
    label: "Sub-channel",
    prop: "address",
    width: "160px",
    show: true
  }
];
// 表格数据
const tableData = [];

setTimeout(() => {
  loading.value = false;
}, 1000);
</script>
<style lang="scss" scoped></style>
