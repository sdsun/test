<template>
  <DataPeemissionLayout>
    <template #left>
      <!-- 左侧树 -->
      <el-input />
      <el-tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="{
          children: 'children',
          label: 'label',
          disabled: 'choose',
          class: data => (data.choose ? 'is-hide' : null)
        }"
        :filter-node-method="filterNode"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node flex items-center">
            <span class="mr-2">{{ node.label }}</span>
            <span class="mr-2">({{ data.value }})--{{ data.id }}</span>
          </div>
        </template>
      </el-tree>
    </template>
    <template #right>
      <el-input />
      <!-- 右侧树 -->
      <el-tree
        ref="treeRRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="{
          disabled: data => !data.choose,
          class: data => (!data.choose ? 'is-hide' : null)
        }"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node flex items-center">
            <span class="mr-2">{{ node.label }}</span>
            <span class="mr-2">({{ data.value }})</span>
          </div>
        </template>
      </el-tree>
      <el-button @click="getCheckedKeys"> 获取选中keys </el-button>
    </template>
  </DataPeemissionLayout>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElTree, ElMessage } from "element-plus";
import DataPeemissionLayout from "./data-peemission-layout.vue";
import { getRegion } from "@/api/data-accessss";

const filterText = ref("");
const treeData = ref([]);
const leftCount = ref(0);
const rightCount = ref(0);
// 树形组件实例
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeRRef = ref<InstanceType<typeof ElTree>>();
// 条件过滤
watch(filterText, val => {
  treeRef.value!.filter(val);
});
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

// 接口获取树形数据
const handleGetData = () => {
  getRegion({
    id: "1",
    salesOrg: "6560",
    type: "1"
  }).then(res => {
    const { code, data } = res;
    if (code == 0) {
      treeData.value = data;
      leftCount.value = getlist(treeData.value).length;
      rightCount.value = getlist(treeData.value).filter(
        item => item.choose
      ).length;
    }
  });
};
handleGetData();

// 获取树形叶子节点
const getlist = tree => {
  let list = [];
  tree.forEach(item => {
    item.children && item.children.length > 0
      ? (list = list.concat(getlist(item.children)))
      : list.push(item);
  });
  return list;
};

// 获取所有被选中的子节点
const handleGetchilCheckAll = (tree, selected) => {
  const list = [];
  tree.forEach(item => {
    if (item.children && item.children.length > 0) {
      const selectAll = item.children.filter(item =>
        selected.includes(item.id)
      );
      if (selectAll.length === item.children.length) {
        item.children.map(item => {
          list.push(item.id);
        });
        handleGetchilCheckAll(item.children, selected);
      }
    }
  });
  return list;
};
// 删除所有被选中的子节点
const handleDelchilCheckAll = (arr1, arr2) => {
  const list = arr2.filter(item => {
    return !arr1.some(ele => ele === item);
  });
  return list;
};
// 获取选中的keys
const getCheckedKeys = () => {
  const selectedKeys = treeRef.value!.getCheckedKeys(false);
  const selectedKeysC = handleGetchilCheckAll(treeData.value, selectedKeys);
  const list = handleDelchilCheckAll(selectedKeysC, selectedKeys);
  if (list.length === 0) {
    ElMessage({
      message: "Please select",
      type: "error"
    });
    return;
  }
};
</script>
<style lang="scss" scoped>
:deep(.is-hide) {
  display: none;
}
</style>
