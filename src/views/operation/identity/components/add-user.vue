<template>
  <el-dialog v-model="visible" title="Add User" width="400px">
    <div class="identity-user__filter mb-6">
      <el-input v-model="keyworld" placeholder="Please input" clearable>
        <template #append>
          <i class="iconfont icon-search" />
        </template>
      </el-input>
    </div>
    <el-scrollbar height="420px">
      <div v-if="selectUsers.length > 0">
        <el-checkbox-group v-model="selectUsers" class="w-full">
          <div class="w-full mb-4" v-for="(item, index) in users" :key="index">
            <el-checkbox
              :label="item.userId"
              size="large"
              border
              class="w-full"
              :style="{ height: 'auto' }"
            >
              <div class="p-2">
                <div class="p-1">{{ item.fullName }}({{ item.username }})</div>
                <div class="p-1" v-if="item.email">{{ item.email }}</div>
              </div>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div v-else>
        <el-empty description="No data" />
      </div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getUserList } from "@/api/data-accessss.js";
import { ElMessage } from "element-plus";

const keyworld = ref("");
// 模态框配置
const visible = ref(false);
// 用户列表数据
const users = ref([]);
// 选中用户的ID
const selectUsers = ref([]);
// 确定添加用户
const handleSubmit = () => {
  // 验证是否选择用户
  if (selectUsers.value.length === 0) {
    ElMessage({
      message: "Please select user",
      type: "error"
    });
    return;
  }
  // 添加用户
  visible.value = false;
};

// 获取用户列表
const handleGetUsers = () => {
  users.value = [];
  getUserList().then(res => {
    const { code, data } = res;
    if (code === 0) {
      users.value = data.records;
      console.log(users);
    }
  });
};
// 显示新增用户模态框
const handleShow = data => {
  visible.value = true;
  handleGetUsers();
};

// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
