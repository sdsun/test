<template>
  <!-- 创建菜单 -->
  <GDrawerPanel
    v-model:visible="visible"
    title="Configure"
    size="calc((100% - 220px)"
    :is-edit="true"
    :show-submit-btn="false"
  >
    <GSectionGroup title="Basic Information">
      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item label="Sales Org">
          {{ orgCode }}
        </el-descriptions-item>
        <el-descriptions-item label="Parent Identity">
          {{ parentCodes }}
        </el-descriptions-item>
        <el-descriptions-item label="dentity Name">
          {{ identityName }}
        </el-descriptions-item>
        <el-descriptions-item label="Local Name"
          >{{ localName }}
        </el-descriptions-item>
        <el-descriptions-item label="Identity Description">
          {{ identityDescription }}
        </el-descriptions-item>
        <el-descriptions-item label="Short Name">
          {{ shortName }}
        </el-descriptions-item>
      </el-descriptions>
    </GSectionGroup>
    <GSectionGroup title="Basic Information">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="Operation Access" name="1">
          <template #title>
            <span class="mr-2 font-bold">Operation Access</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="This is the menu&button access which can be selected from role(s).  Operation Access is given by all the selected roles's access"
              placement="right"
            >
              <i class="iconfont icon-info" />
            </el-tooltip>
          </template>
          <el-form :inline="true">
            <el-form-item label="Role">
              <el-select
                multiple
                filterable
                :reserve-keyword="false"
                placeholder="Select select"
                :style="{ width: '280px' }"
              >
                <el-option label="6560" value="1" />
                <el-option label="6550" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">Submit</el-button>
            </el-form-item>
          </el-form>
          <!-- 操作权限 -->
          <OperationAccess />
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <span class="mr-2 font-bold">Operation Access</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="This is the data access which can be selected from dimension collection.  Data Access is given combined with different dimension"
              placement="right"
            >
              <i class="iconfont icon-info" />
            </el-tooltip>
          </template>
          <!-- 数据权限 -->
          <DataAccess />
        </el-collapse-item>
      </el-collapse>
    </GSectionGroup>
  </GDrawerPanel>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { DataAccess, OperationAccess } from "../../components";
// 模态框配置
const visible = ref(true);
const record = reactive({
  orgCode: "",
  parentCodes: "",
  identityName: "",
  localName: "",
  identityDescription: "",
  shortName: ""
});
// 显示模态框
const handleShow = row => {
  visible.value = true;
  Object.assign(record, {
    orgCode: row.orgCode,
    parentCodes: row.parentCodes,
    identityName: row.identityName,
    localName: row.localName,
    identityDescription: row.identityDescription,
    shortName: row.shortName
  });
};
// 基础数据解构
const {
  orgCode,
  parentCodes,
  identityName,
  localName,
  identityDescription,
  shortName
} = toRefs(record);
// 操作权限和数据权限赋值
const activeNames = ref(["1", "2"]);
// 导出组件实例方法
defineExpose({
  handleShow
});
</script>
