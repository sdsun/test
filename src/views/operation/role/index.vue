<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { GTable, GPanelTable } from "gtm-ui";
import { ElMessage } from "element-plus";
import { exportFile } from "@/utils/file";
import { getSysRole, exportRole } from "@/api/operation";
import { putSysRoleUpdate } from "@/api/operation";
import CreateRole from "./components/create-role.vue";
// 子组件实例
const createRoleRef = ref<InstanceType<typeof CreateRole>>();
// 列表筛选的数据
const initQueryData = () => {
  return {
    roleName: "",
    roleCode: ""
  };
};
const filterData = reactive(initQueryData());
// 渲染列表筛选
const filterItems = ref([
  {
    type: "text",
    label: "Role Name",
    options: {
      attributeName: "roleName"
    }
  },
  {
    type: "text",
    label: "Role Code",
    options: {
      attributeName: "roleCode"
    }
  },
  {
    type: "g-select",
    label: "Status",
    options: {
      attributeName: "status",
      elProps: {
        multiple: false,
        lists: [
          {
            label: "Enable",
            value: 0
          },
          {
            label: "Disabled",
            value: 1
          }
        ]
      }
    }
  }
]);
// 列表筛选 - 重置
function handleFormReset() {
  Object.assign(filterData, initQueryData());
  handleGetTableData();
}
// 列表筛选 - 搜索
function handleSearch() {
  handleGetTableData();
}
// 表格列配置
const columns: any = [
  {
    label: "Role Code",
    prop: "roleCode",
    width: "200",
    show: true
  },
  {
    label: "Role Name",
    prop: "roleName",
    width: "200px",
    show: true
  },
  {
    label: "Role Description",
    prop: "roleDescription",
    width: "260px",
    show: true
  },
  {
    label: "Sales Org",
    prop: "salesOrgCode",
    width: "160px",
    show: true
  },
  {
    label: "Status",
    prop: "status",
    width: "160px",
    slot: "status",
    show: true
  },
  {
    label: "Created On",
    prop: "createTime",
    width: "200",
    show: true
  },
  {
    label: "Modified On",
    prop: "updateTime",
    width: "auto",
    minWidth: "200px",
    show: true
  },
  {
    label: "Action",
    prop: "address",
    width: "200px",
    fixed: "right",
    show: true,
    actions: [
      {
        label: "Edit",
        onClick: (action, scope) => {
          createRoleRef.value.handleShow(scope.row);
        }
      },
      {
        label: "Assign Access",
        onClick: (action, scope) => {
          console.log("注册权限");
        }
      }
    ]
  }
];
// 表格数据
const tableData = ref([]);
// 表格状态
const loading = ref(true);
const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  background: true,
  total: 0
});
const handleGetTableData = () => {
  loading.value = true;
  getSysRole(
    Object.assign(filterData, {
      current: pagination.currentPage,
      size: pagination.pageSize,
      salesOrgCode: "6560"
    })
  )
    .then(res => {
      loading.value = false;
      const { code, data } = res;
      if (code === 0) {
        tableData.value = data.records;
        pagination.total = data.total;
      }
    })
    .catch(() => {
      loading.value = false;
    });
};
const handlePageSizeChange = () => {
  handleGetTableData();
};
const handleCurrentChange = () => {
  handleGetTableData();
};
onMounted(() => {
  handleGetTableData();
});

// 创建成功
const handleOk = () => {
  pagination.currentPage = 1;
  handleGetTableData();
};
/**
 * 改变记录状态
 * 0-正常 1-禁用
 */
const handleChangeStatus = row => {
  const status = row.status;
  row.loading = true;
  putSysRoleUpdate({
    id: row.id,
    status
  }).then(res => {
    const { code } = res;
    row.loading = false;
    handleGetTableData();
    if (code === 0) {
      ElMessage({
        message: `Change success`,
        type: "success"
      });
    }
  });
};
// 导出数据
const exportLoading = ref(false);
const handleExportData = () => {
  exportLoading.value = true;
  exportRole({
    salesOrgCode: "6560"
  })
    .then(res => {
      exportLoading.value = false;
      exportFile(res, "roleList");
    })
    .catch(() => {
      ElMessage({
        message: "Export Error",
        type: "error"
      });
    });
};
</script>
<template>
  <div class="h-full">
    <GPanelTable>
      <template #form>
        <GScalableFilterArea
          v-model="filterData"
          :filter-items="filterItems"
          @reset="handleFormReset"
          @submit="handleSearch"
        />
      </template>
      <template #table>
        <GTable
          row-key="id"
          border
          showOverflowTooltip
          headerAlign="left"
          :loading="loading"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :select-info-append="null"
          :config-table="{ setting: false, font: false, fullscreen: false }"
          @page-size-change="handlePageSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #status="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              active-text="Inable"
              inactive-text="Disable"
              inline-prompt
              :loading="scope.row.loading"
              @change="handleChangeStatus(scope.row)"
            />
          </template>
          <template #tableLeft>
            <el-button
              type="primary"
              @click="createRoleRef.handleShow({ id: null })"
            >
              Create
            </el-button>
            <el-button type="primary" @click="handleExportData">
              Export
            </el-button>
          </template>
        </GTable>
      </template>
    </GPanelTable>
    <!-- 创建和编辑角色 -->
    <CreateRole ref="createRoleRef" @ok="handleOk" />
  </div>
</template>
