<script setup lang="ts">
/**
 * 新增和编辑系统角色
 */
import { ref, reactive, nextTick } from "vue";
import { GDrawerPanel } from "gtm-ui";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { postSysRoleSave, putSysRoleUpdate } from "@/api/operation";
// 模态框配置
const visible = ref(false);
const title = ref("");
const loading = ref(false);
// 表单实例
const ruleFormRef = ref<FormInstance>();
// 表单初始化数据方法
const initFormData = () => {
  return {
    id: null,
    approvalRole: 0,
    delFlag: 0,
    isDefault: 0,
    roleCode: "",
    roleDescription: "",
    roleName: "",
    salesOrgCode: [],
    appCode: []
  };
};
// 表单数据
const ruleForm = reactive(initFormData());
// 表单验证
const rules = reactive<FormRules>({
  salesOrgCode: [
    { required: true, message: "Please select", trigger: "change" }
  ],
  roleCode: [{ required: true, message: "Please input", trigger: "blur" }],
  roleName: [{ required: true, message: "Please input", trigger: "blur" }]
});
// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      const api = ruleForm.id ? putSysRoleUpdate : postSysRoleSave;
      api({
        ...ruleForm,
        ...{
          salesOrgCode: ruleForm.salesOrgCode.join(","),
          appCode: ruleForm.appCode.join(",")
        }
      })
        .then(res => {
          loading.value = false;
          visible.value = false;
          const { code, msg } = res;
          if (code === 0) {
            ElMessage({
              message: `${ruleForm.id ? "Edit" : "Add"} success`,
              type: "success"
            });
            emits("ok");
          } else {
            ElMessage({
              message: msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          loading.value = false;
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 表单重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  visible.value = false;
};
// 表单赋值
const handleSetForm = row => {
  nextTick(() => {
    Object.assign(ruleForm, {
      id: row.id,
      approvalRole: 0,
      isDefault: 0,
      roleCode: row.roleCode,
      roleDescription: row.roleDescription,
      roleName: row.roleName,
      salesOrgCode: row.salesOrgCode ? row.salesOrgCode.split(",") : [],
      appCode: row.appCode ? row.appCode.split(",") : []
    });
  });
};
// 显示角色模态框
const handleShow = row => {
  visible.value = true;
  if (row.id) {
    // 编辑
    title.value = "Edit Role";
    handleSetForm(row);
  } else {
    // 新增
    title.value = "Create Role";
    Object.assign(ruleForm, initFormData());
  }
};

const emits = defineEmits(["ok"]);

// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
<template>
  <div>
    <!-- 创建角色 -->
    <GDrawerPanel
      v-model:visible="visible"
      :title="title"
      size="540px"
      :is-edit="true"
      @update:model-value="resetForm(ruleFormRef)"
      :show-submit-btn="false"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="App" prop="appCode">
          <el-select
            v-model="ruleForm.appCode"
            multiple
            filterable
            :reserve-keyword="false"
            placeholder="Select select"
            :style="{ width: '100%' }"
          >
            <el-option label="6560" value="1" />
            <el-option label="6550" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="Sales Org" prop="salesOrgCode">
          <el-select
            v-model="ruleForm.salesOrgCode"
            multiple
            filterable
            :reserve-keyword="false"
            placeholder="Select select"
            :style="{ width: '100%' }"
          >
            <el-option label="6560" value="6560" />
            <el-option label="6550" value="6550" />
          </el-select>
        </el-form-item>
        <el-form-item label="Role Code" prop="roleCode">
          <el-input v-model="ruleForm.roleCode" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Role Name" prop="roleName">
          <el-input v-model="ruleForm.roleName" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Role Description" prop="roleDescription">
          <el-input
            type="textarea"
            v-model="ruleForm.roleDescription"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #actions>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm(ruleFormRef)"
        >
          Submit
        </el-button>
      </template>
    </GDrawerPanel>
  </div>
</template>
