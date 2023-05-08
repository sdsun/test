<script setup lang="ts">
/**
 * 新增和编辑系统角色
 */
import { ref, reactive } from "vue";
import { GDrawerPanel } from "gtm-ui";
import type { FormInstance, FormRules } from "element-plus";
import { toRefs } from "vue";
// 模态框配置
const visible = ref(false);
const title = ref("");
// 表单实例
const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  id: null,
  approvalRole: 0,
  delFlag: 0,
  isDefault: 0,
  roleCode: "",
  roleDescription: "",
  roleName: "",
  salesOrgCode: []
});
// 表单验证
const rules = reactive<FormRules>({
  salesOrgCode: [
    { required: true, message: "Please select sales org", trigger: "blur" }
  ],
  roleCode: [
    { required: true, message: "Please input role code", trigger: "blur" }
  ],
  roleName: [
    { required: true, message: "Please input role name", trigger: "blur" }
  ]
});
// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      console.log(toRefs(ruleForm));
      emits("ok");
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

// 显示新增和编辑角色模态框
const handleShow = recode => {
  visible.value = true;
  if (recode.id) {
    // 编辑
    title.value = "编辑角色";
  } else {
    // 新增
    title.value = "创建角色";
    setTimeout(() => {
      ruleFormRef.value.resetFields();
    }, 1000);
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
      title="Create Role"
      size="540px"
      :is-edit="true"
      @update:model-value="resetForm(ruleFormRef)"
      @submit="submitForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="Sales Org" prop="salesOrgCode">
          <el-select
            v-model="ruleForm.salesOrgCode"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Select select"
            :style="{ width: '100%' }"
          >
            <el-option label="6560" value="1" />
            <el-option label="6550" value="2" />
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
    </GDrawerPanel>
  </div>
</template>
