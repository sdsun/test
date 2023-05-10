<template>
  <div
    :style="{
      border: '1px solid #EEE',
      padding: '24px'
    }"
  >
    <el-scrollbar max-height="400px">
      <el-tree
        :data="menuTree"
        :props="{
          label: 'name',
          children: 'sysMenuDtoList'
        }"
        @node-click="handleNodeClick"
      />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { getSysMenu } from "@/api/data-accessss.js";
import { ref } from "vue";

const handleNodeClick = data => {
  console.log(data);
};

const menuTree = ref([]);

// 获取菜单数据
const handleGetMenuTree = () => {
  getSysMenu()
    .then(res => {
      const { code, data } = res;
      if (code === 0) {
        menuTree.value = data;
      }
    })
    .catch(() => {});
};
handleGetMenuTree();
</script>
