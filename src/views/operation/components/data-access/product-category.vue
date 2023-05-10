<template>
  <div class="data-per p-4">
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
        <el-col :span="12"> </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
const defaultProps = {
  children: "children",
  label: "label"
};
const data = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1"
          },
          {
            id: 10,
            label: "Level three 1-1-2"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1"
      },
      {
        id: 6,
        label: "Level two 2-2"
      }
    ]
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1"
      },
      {
        id: 8,
        label: "Level two 3-2"
      }
    ]
  }
];

function watch(filterText: any, arg1: (val: any) => void) {
  throw new Error("Function not implemented.");
}

function ref(arg0: string): any {
  throw new Error("Function not implemented.");
}
</script>
<style lang="scss" scoped></style>
