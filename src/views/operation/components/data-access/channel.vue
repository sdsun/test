<template>
  <div class="data-per p-4">
    <!-- 内容 -->
    <div>
      <el-row :gutter="24">
        <el-col :span="12">
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
