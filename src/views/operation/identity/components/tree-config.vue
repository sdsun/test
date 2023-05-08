<script setup lang="ts">
import { ref } from "vue";
import { GTable, GDrawerPanel } from "gtm-ui";
import AddUser from "./add-user.vue";
import { getSysIdentityTree } from "@/api/operation";
// 子组件实例
const addUserRef = ref<InstanceType<typeof AddUser>>();
// 添加用户开关
const freeMode = ref(false);
// 模态框配置
const visible = ref(false);
// 岗位树
const treeLoading = ref(false);
const treeData = ref([]);

const defaultProps = {
  children: "childrenList",
  label: "identityName"
};

const handleGetIdentityTree = () => {
  treeLoading.value = true;
  getSysIdentityTree({ saleCode: "6560" })
    .then(res => {
      treeLoading.value = false;
      const { data, code } = res;
      if (code === 0) {
        treeData.value = data.childrenList;
      }
    })
    .catch(() => {
      treeLoading.value = false;
    });
};

// 显示新增和编辑角色模态框
const handleShow = () => {
  visible.value = true;
  handleGetIdentityTree();
};

// 表格状态
const loading = ref(false);
const tableVisible = ref(false);
// 表格列配置
const columns: any = [
  {
    label: "User",
    prop: "fullName",
    show: true
  },
  {
    label: "HR Company",
    prop: "hrPosition",
    show: true
  },
  {
    label: "Operation",
    show: true,
    fixed: "right"
  }
];

const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
// 表格数据
const tableData = ref([]);
const handleGetMoreUser = data => {
  tableVisible.value = true;
  tableData.value = data || [];
};
// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
<template>
  <div>
    <!-- 组织树 -->
    <GDrawerPanel
      v-model:visible="visible"
      title="Tree Configure"
      size="calc((100% - 220px)"
      @update:model-value="visible = false"
    >
      <div class="identity-tree">
        <div class="identity-tree__title">
          <h5>HAT 6560 Thailand</h5>
          <div class="title__ac">
            <span class="mr-4"> Free Configure Mode </span>
            <el-switch v-model="freeMode" />
          </div>
        </div>
        <div class="p-4">
          <el-row :gutter="20">
            <el-col :span="16" v-loading="treeLoading">
              <el-tree
                :data="treeData"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
              >
                <template #default="{ node, data }">
                  <div class="custom-tree-node flex items-center">
                    <span class="mr-2">{{ node.label }}</span>
                    <span class="mr-2">({{ data.allList }})</span>
                    <div
                      v-if="data.userInfoList && data.userInfoList.length > 0"
                    >
                      <template
                        v-for="(item, index) in data.userInfoList"
                        :key="index"
                      >
                        <el-popover
                          v-if="index <= 4"
                          placement="top-start"
                          :title="item.fullName"
                          :width="200"
                          trigger="hover"
                        >
                          <template #reference>
                            <el-avatar
                              class="m-1"
                              :size="24"
                              :src="item.avatar || circleUrl"
                            />
                          </template>
                          {{ item.username }}
                        </el-popover>
                        <span
                          v-if="index === 5"
                          class="m-1 cursor-pointer text-center"
                          @click="handleGetMoreUser(data.userInfoList)"
                          :style="{
                            width: '24px',
                            height: '24px',
                            lineHeight: '24px',
                            borderRadius: '50%',
                            background: '#EEE'
                          }"
                        >
                          ···
                        </span>
                      </template>
                    </div>
                    <span
                      v-if="freeMode"
                      class="m-1 cursor-pointer text-center"
                      @click="addUserRef.handleShow('1')"
                      :style="{
                        width: '24px',
                        height: '24px',
                        lineHeight: '24px',
                        borderRadius: '50%',
                        color: '#FFF',
                        background: '#3471ff'
                      }"
                    >
                      +
                    </span>
                  </div>
                </template>
              </el-tree>
            </el-col>
            <el-col :span="8" v-if="tableVisible">
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
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 添加用户 -->
      <AddUser ref="addUserRef" />
    </GDrawerPanel>
  </div>
</template>
<style lang="scss" scoped>
.identity-tree {
  :deep(.el-tree-node__content) {
    padding: 5px 0;
  }
  &__title {
    padding: 0 20px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      position: relative;
      font-weight: bold;
      font-size: 15px;
      padding-left: 12px;
      color: #333;
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -6px;
        content: "";
        display: block;
        width: 3px;
        height: 12px;
        border-radius: 2px;
        background: var(--el-color-primary);
      }
    }
    .title__ac {
      font-size: 14px;
      color: var(--el-color-primary);
    }
  }
}
</style>
