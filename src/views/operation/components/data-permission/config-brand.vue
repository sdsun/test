<template>
  <DataPeemissionLayout>
    <template #search>
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
    </template>
    <template #left>
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
    </template>
    <template #right>
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
    </template>
  </DataPeemissionLayout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { GTable } from "gtm-ui";
import DataPeemissionLayout from "./data-peemission-layout.vue";

const columns: any = [
  {
    label: "Brand Mapping Code",
    prop: "date",
    width: "180px",
    show: true
  },
  {
    label: "Brand Code",
    prop: "name",
    width: "180px",
    show: true
  },
  {
    label: "Brand Name",
    prop: "address",
    width: "180px",
    show: true
  },
  {
    label: "Sales Country",
    prop: "address",
    width: "180px",
    show: true
  },
  {
    label: "Sales Org",
    prop: "address",
    width: "180px",
    show: true
  }
];

const tableData = [];

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1000);
</script>
<style lang="scss" scoped></style>
