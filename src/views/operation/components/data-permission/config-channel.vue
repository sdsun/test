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
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          />
        </el-col>
        <el-col :span="12">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
const defaultProps = {
  children: "children",
  label: "label"
};
const data = [];
</script>
<style lang="scss" scoped></style>
