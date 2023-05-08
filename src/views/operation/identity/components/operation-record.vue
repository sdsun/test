<script setup lang="ts">
/**
 * 新增和编辑系统角色
 */
import { ref } from "vue";
import { GDrawerPanel, GTable } from "gtm-ui";
// 模态框配置
const visible = ref(false);
// 表格状态
const loading = ref(true);
// 表格列配置
const columns: any = [
  {
    label: "Identity",
    prop: "date",
    width: "240px",
    show: true
  },
  {
    label: "Operation Type",
    prop: "name",
    width: "240px",
    show: true
  },
  {
    label: "Operation Time",
    prop: "address",
    width: "240px",
    show: true
  },
  {
    label: "Operator",
    prop: "address",
    width: "240px",
    show: true
  },
  {
    label: "Item",
    prop: "address",
    width: "240px",
    show: true
  },
  {
    label: "Value",
    prop: "address",
    width: "240px",
    show: true
  }
];
// 表格数据
const tableData = [];
// 获取表格数据方法
const handleGetTableData = () => {};

handleGetTableData();

const handleShow = () => {
  visible.value = true;
};
// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
<template>
  <div>
    <GDrawerPanel
      v-model:visible="visible"
      title="Operation Record"
      size="calc((100% - 220px)"
      @update:model-value="visible = false"
    >
      <!-- 操作记录 -->
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
      />
    </GDrawerPanel>
  </div>
</template>
