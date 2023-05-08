<script setup lang="ts">
/**
 * 新增和编辑系统角色
 */
import { ref, reactive } from "vue";
import { GDrawerPanel } from "gtm-ui";
import type { FormInstance, FormRules } from "element-plus";
// 模态框配置
const visible = ref(false);
const title = ref("");
// 表单实例
const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  id: 0,
  identityCode: "",
  identityDescription: "",
  identityName: "",
  isEnable: 0,
  localName: "",
  orgCode: "",
  parentCodes: "",
  saleCode: "",
  saleName: "",
  shortName: "",
  size: 0
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
    <!-- 创建岗位 -->
    <GDrawerPanel
      v-model:visible="visible"
      title="Create Identity"
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
        <el-form-item label="Sales Org" prop="saleName">
          <el-select
            v-model="ruleForm.saleName"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Please select"
            :style="{ width: '100%' }"
          >
            <el-option label="应用1" value="1" />
            <el-option label="应用2" value="2" />
            <el-option label="应用3" value="3" />
            <el-option label="应用4" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="dentity Name" prop="identityName">
          <el-input
            v-model="ruleForm.identityName"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Department" prop="name">
          <el-input v-model="ruleForm" />
        </el-form-item>
        <el-form-item label="Local Name" prop="localName">
          <el-input v-model="ruleForm.localName" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Short Name" prop="shortName">
          <el-input v-model="ruleForm.shortName" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Role Description" prop="identityDescription">
          <el-input
            type="textarea"
            v-model="ruleForm.identityDescription"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
    </GDrawerPanel>
  </div>
</template>
