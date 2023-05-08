<script setup lang="ts">
/**
 * 新增和编辑系统菜单
 */
import { ref, reactive } from "vue";
import { GDrawerPanel } from "gtm-ui";
import SelectIcon from "./select-icon.vue";
import type { FormInstance, FormRules } from "element-plus";
// 模态框配置
const visible = ref(false);
const isEdit = ref(false);
const title = ref("");
// 表单实例
const ruleFormRef = ref<FormInstance>();
// 子组件实例
const selectIconRef = ref<InstanceType<typeof SelectIcon>>();
// 表单数据
const ruleForm = reactive({
  id: 0,
  code: "",
  icon: "",
  isEnable: 1,
  isShow: 1,
  menuClassify: "1",
  name: "",
  parentCode: "",
  parentId: "",
  redirectUrl: "",
  resOrder: 0,
  type: "",
  url: "",
  delFlag: 0
});
// 表单验证
const rules = reactive<FormRules>({
  code: [{ required: true, message: "Please input code", trigger: "blur" }],
  name: [{ required: true, message: "Please input name", trigger: "blur" }],
  type: [{ required: true, message: "Please select type", trigger: "blur" }],
  url: [{ required: true, message: "Please input url", trigger: "blur" }]
});
// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm);
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

// 显示新增和编辑菜单模态框
const handleShow = recode => {
  visible.value = true;
  if (recode.id) {
    // 编辑
    title.value = "编辑菜单";
    isEdit.value = true;
  } else {
    // 新增
    title.value = "新增菜单";
    setTimeout(() => {
      ruleFormRef.value.resetFields();
    }, 1000);
  }
};

const emits = defineEmits(["ok"]);

// 选择图标
const handleSelectIconOK = (v: string) => {
  ruleForm.icon = v;
};
// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
<template>
  <div>
    <!-- 创建菜单 -->
    <GDrawerPanel
      v-model:visible="visible"
      title="创建菜单"
      size="540px"
      :is-edit="true"
      @update:model-value="resetForm(ruleFormRef)"
      @submit="submitForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        class="demo-ruleForm"
      >
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="ruleForm.code"
            :disabled="isEdit"
            placeholder="请输入编码"
          />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择类型"
            :style="{ width: '100%' }"
          >
            <el-option label="菜单" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="路由" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入路由" />
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirectUrl">
          <el-input
            v-model="ruleForm.redirectUrl"
            placeholder="请输入重定向地址"
          />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="ruleForm.icon" readonly placeholder="请选择图标">
            <template #append>
              <SelectIcon
                ref="selectIconRef"
                :current="ruleForm.icon"
                @selectIconOk="handleSelectIconOK"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="resOrder">
          <el-input-number
            :min="0"
            controls-position="right"
            v-model="ruleForm.resOrder"
            placeholder="请输入排序"
          />
        </el-form-item>
        <el-form-item label="可用状态" prop="isEnable">
          <el-switch
            v-model="ruleForm.isEnable"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="可见状态" prop="isShow">
          <el-switch
            v-model="ruleForm.isShow"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </GDrawerPanel>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-input-group__append) {
  padding: 0;
}
</style>
