<script setup lang="ts">
/**
 * 新增和编辑系统菜单
 */
import { ref, reactive, nextTick } from "vue";
import { GDrawerPanel } from "gtm-ui";
import SelectIcon from "./select-icon.vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { postSysMenuSave, postSysMenuUpdate } from "@/api/operation";

// 模态框配置
const visible = ref(false);
const isEdit = ref(true);
const title = ref("");
const actionType = ref();
const loading = ref(false);
// 表单实例
const ruleFormRef = ref<FormInstance>();
// 子组件实例
const selectIconRef = ref<InstanceType<typeof SelectIcon>>();
// 数据类型
interface FormType {
  id: number | string;
  code: string;
  icon: string;
  appCode: string;
  appName: string;
  isEnable: number;
  isShow: number;
  menuClassify: string;
  name: string;
  parentCode: string;
  parentId: string;
  parentName: string;
  redirectUrl: string;
  resOrder: number;
  type: string;
  url: string;
  delFlag: number;
  level: number;
  fullId: string;
}

// 表单初始化数据方法
const initFormData = () => {
  return {
    id: null,
    code: "",
    icon: "",
    appCode: "appCode",
    appName: "appName",
    isEnable: 1,
    isShow: 1,
    menuClassify: "1",
    name: "",
    parentCode: "",
    parentId: "",
    parentName: "",
    redirectUrl: "",
    resOrder: 0,
    type: "",
    url: "",
    delFlag: 0,
    level: 1,
    fullId: ""
  };
};
// 创建表单数据
const ruleForm = reactive<FormType>(initFormData());
// 表单验证
const rules = reactive<FormRules>({
  code: [{ required: true, message: "Please input", trigger: "blur" }],
  name: [{ required: true, message: "Please input", trigger: "blur" }],
  type: [{ required: true, message: "Please select", trigger: "change" }],
  url: [{ required: true, message: "Please input", trigger: "blur" }]
});

const emits = defineEmits(["ok"]);

// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // SET fullId
      if (actionType.value === 1) {
        ruleForm.fullId = ruleForm.code;
      } else if (actionType.value === 3) {
        ruleForm.fullId = `${ruleForm.fullId}!${ruleForm.code}`;
      }
      loading.value = true;
      // ADD AND EDIT
      const api = ruleForm.id ? postSysMenuUpdate : postSysMenuSave;
      api(ruleForm)
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
const handleSetForm = (type, row) => {
  nextTick(() => {
    Object.assign(ruleForm, {
      id: row.id,
      code: row.code,
      icon: row.icon,
      isEnable: row.isEnable,
      isShow: row.isShow,
      name: row.name,
      redirectUrl: row.redirectUrl,
      resOrder: row.resOrder,
      type: row.type,
      url: row.url,
      parentName: row.parentName,
      parentCode: row.parentCode,
      parentId: row.parentId,
      level: row.level,
      fullId: row.fullId
    });
  });
};

/**
 * 显示操作模态框以及数据重置
 * @param { type } 1-新增 2-编辑 3-新增子菜单 4-菜单详情
 */
const handleShow = (type, row) => {
  // 显示状态
  visible.value = true;
  // 编辑状态
  isEdit.value = type !== 4;
  // 行为类型
  actionType.value = type;
  switch (type) {
    case 1:
      // 新增一级菜单
      title.value = "新增菜单";
      Object.assign(ruleForm, initFormData());
      break;
    case 2:
      // 编辑菜单
      title.value = "编辑菜单";
      handleSetForm(type, row);
      break;
    case 3:
      // 新增子菜单
      title.value = "新增子菜单";
      Object.assign(ruleForm, initFormData(), {
        parentName: row.name,
        parentCode: row.code,
        parentId: row.id,
        level: row.level + 1,
        fullId: row.fullId
      });
      break;
    case 4:
      // 查看菜单详情
      title.value = "菜单详情";
      handleSetForm(type, row);
      break;
  }
};

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
      :is-edit="isEdit"
      @update:model-value="resetForm(ruleFormRef)"
      :show-submit-btn="false"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        class="demo-ruleForm"
      >
        <el-form-item v-if="ruleForm.parentId" label="上级菜单" prop="parentId">
          <el-input v-model="ruleForm.parentName" disabled />
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="ruleForm.code"
            :disabled="!isEdit"
            placeholder="请输入编码"
          />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            :disabled="!isEdit"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="ruleForm.type"
            :disabled="!isEdit"
            placeholder="请选择类型"
            :style="{ width: '100%' }"
          >
            <el-option label="菜单" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="路由" prop="url">
          <el-input
            v-model="ruleForm.url"
            :disabled="!isEdit"
            placeholder="请输入路由"
          />
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirectUrl">
          <el-input
            v-model="ruleForm.redirectUrl"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
            controls-position="right"
            v-model="ruleForm.resOrder"
            placeholder="请输入排序"
          />
        </el-form-item>
        <el-form-item label="可用状态" prop="isEnable">
          <el-switch
            v-model="ruleForm.isEnable"
            :disabled="!isEdit"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="可见状态" prop="isShow">
          <el-switch
            v-model="ruleForm.isShow"
            :disabled="!isEdit"
            :active-value="1"
            :inactive-value="0"
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
<style lang="scss" scoped>
:deep(.el-input-group__append) {
  padding: 0;
}
</style>
