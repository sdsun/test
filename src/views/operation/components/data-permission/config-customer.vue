<template>
  <div class="data-per p-4">
    <!-- 筛选 -->
    <div class="data-per__filter">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="Region">
          <el-input placeholder="please input" />
        </el-form-item>
        <el-form-item label="Region code">
          <el-input placeholder="please input" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 内容 -->
    <div>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="flex justify-between mb-2">
            <span>Filtered Region List</span>
            <span>Select All 58 Items</span>
          </div>
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
              size="small"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex justify-between mb-2">
            <span>Filtered Region List</span>
            <span>Select All 58 Items</span>
          </div>
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
              size="small"
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
