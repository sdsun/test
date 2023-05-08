<template>
  <div class="curstom_tree_transfer">
    <div class="left_box">
      <div class="transfer-box-content">
        <div class="left_filter_box">
          <el-input
            v-model="filterText"
            placeholder="输入关键字回车进行过滤"
            @keyup.enter="toFilterTree(filterText)"
          />
        </div>
        <!-- default-expand-all -->
        <div class="tree_box">
          <el-tree
            ref="tree"
            :data="treeData"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            node-key="id"
            :props="defaultProps"
            show-checkbox
          />
        </div>
      </div>
    </div>
    <div class="btn_box">
      <div>
        <el-button @click="del">del</el-button>
      </div>
      <div>
        <el-button @click="add">add</el-button>
      </div>
    </div>

    <div class="right_box">
      <div class="right_slelect_info">
        <span>{{ slectCount }}项</span>
        <span style="cursor: pointer" @click="clearAll()">全部清空</span>
      </div>
      <div class="tree_box" v-loading="loading">
        {{ tableData }}
        <el-tree
          ref="treeRight"
          :data="targetData"
          default-expand-all
          :expand-on-click-node="false"
          node-key="id"
          :props="defaultProps"
          show-checkbox
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, watch, defineComponent } from "vue";
import { ElMessage } from "element-plus";
import cloneDeep from "lodash/cloneDeep";
export default defineComponent({
  name: "",
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          basealldata: [], //基础的所有数据  结构为树状数据
          rightselectdata: [] //右侧选择的数据  结构为一维数组,包含（半勾选）父级数据 不是一维先拍扁再传入
        };
      }
    }
  },
  setup(props) {
    const state = reactive({
      slectCount: 0,
      filterText: "",
      leftCheck: "",
      rightCheck: "",
      tree: null,
      treeRight: null,
      defaultProps: {
        children: "children",
        label: "name"
      },
      treeData: [
        {
          id: "1",
          name: "公共角色",
          parentId: "-1",
          c: "自定义",
          children: [
            {
              id: "1-1",
              name: "销售员",
              parentId: "1",
              c: "自定义"
            },
            {
              id: "1-2",
              name: "采购员",
              parentId: "1",
              c: "自定义"
            }
          ]
        },
        {
          id: "2",
          name: "生产部",
          parentId: "-1",
          c: "自定义",
          children: [
            {
              id: "2-1",
              name: "演示员",
              parentId: "2",
              c: "自定义"
            },
            {
              id: "2-2",
              name: "机加工",
              parentId: "2",
              c: "自定义",
              children: [
                {
                  id: "2-2-1",
                  name: "演示员2",
                  parentId: "2-2",
                  c: "自定义"
                }
              ]
            }
          ]
        }
      ],
      targetData: [],
      hasSearchValue: "",
      hasSelectionList: [],
      loading: false
    });
    onMounted(() => {
      // initData()
    });
    //new methods
    const recursion = (obj, cb) => {
      if (Array.isArray(obj) && obj.length > 0) {
        for (const item of obj) {
          if (item.children) recursion(item.children, cb);
          typeof cb == "function" && cb(obj, item);
        }
      }
    };
    const getLeftValue = val => {
      //console.log(val)
      if (val) {
        state.tree.setCheckedNodes(state.treeData);
      } else {
        state.tree.setCheckedKeys([]);
      }
    };
    const getRightValue = val => {
      if (val) {
        state.treeRight.setCheckedNodes(state.targetData);
      } else {
        state.treeRight.setCheckedKeys([]);
      }
    };
    const add = () => {
      const selectedKeysLeft = state.tree.getCheckedKeys(); //获取勾选的，不包含父级id
      const selectedNodesLeft = state.tree.getCheckedNodes(false, true); //获取所有勾选的node
      //console.log('selectedKeysLeft', selectedKeysLeft)
      console.log(
        "selectedNodesLeft",
        JSON.parse(JSON.stringify(selectedNodesLeft))
      );

      if (selectedKeysLeft.length > 0) {
        state.loading = true;
        setTimeout(() => {
          state.loading = false;
          //复制选择的元素
          handleData(
            selectedKeysLeft,
            selectedNodesLeft,
            state.targetData,
            state.treeData
          );
          //重置选择
          state.tree.setCheckedKeys([]);
          state.leftCheck = false;
          state.rightCheck = false;
        }, 2000);
      } else {
        ElMessage.error("请先勾选数据");
      }
    };
    const del = () => {
      const selectedKeysRight = state.treeRight.getCheckedKeys(); //获取勾选的，不包含父级id
      const selectedNodesRight = state.treeRight.getCheckedNodes(false, true); //获取所有勾选的node
      if (selectedKeysRight.length > 0) {
        handleData(
          selectedKeysRight,
          selectedNodesRight,
          state.treeData,
          state.targetData
        );
        //重置选择
        state.treeRight.setCheckedKeys([]);
        state.rightCheck = false;
        state.leftCheck = false;
      } else {
        ElMessage.error("请先勾选数据");
      }
    };
    /**
 *selectedKeys参数为勾选的id，不包含半勾选
 selectedNodes参数为获取所有勾选的node
 targetData参数为操作后获得的结果数据
 data参数为需要操作勾选的源数据 **/
    const handleData = (selectedKeys, selectedNodes, targetData, data) => {
      //console.log('handleData', selectedKeys, selectedNodes, targetData, data)
      selectedNodes.forEach(nodes => {
        let parentNode;
        recursion(targetData, function (obj, item) {
          //寻找要插入的元素的父节点是否存在
          if (nodes.parentId == item.id) parentNode = item;
        });
        //初始化要插入的节点数据
        console.log("nodes", nodes);
        const nodeObj = {
          // id: nodes.id,
          // name: nodes.name,
          // parentId: nodes.parentId,
          ...nodes
        };
        nodes.parentId && (nodeObj.nodeObj = nodes.parentId);
        nodes.children && (nodeObj.children = []);
        //如果找到父节点,那么代表是子节点，没有找到那么就是一级节点。
        if (parentNode) {
          //判断父节点是否已经存在这个节点。如果不存在就插入
          if (!parentNode.children.find(item => item.id == nodes.id))
            parentNode.children.push(nodeObj);
        } else {
          //一级节点需要在顶层数组里插入
          if (!targetData.find(item => item.id == nodes.id))
            targetData.push(nodeObj);
          setTimeout(() => {
            console.log(
              "selectedNodes--------",
              JSON.parse(JSON.stringify(targetData))
            );
          }, 1000);
        }
      });
      //删除选中的元素
      recursion(data, function (obj, item) {
        console.log(item);
        selectedKeys.forEach(delItem => {
          //找到选中的元素删除
          const index = obj.findIndex(findItem => {
            return delItem == findItem.id;
          });
          index > -1 && obj.splice(index, 1);
        });
      });
    };
    const toFilterTree = val => {
      state.tree.filter(val);
    };
    const filterNode = (value, data) => {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    };

    //记录节点的所有叶子节点个数
    const getLeafCountTree = json => {
      if (json.children.length > 0) {
        json.children.map(item => {
          if (item.children && item.children.length > 0) {
            getLeafCountTree(item);
          } else {
            state.slectCount += 1;
          }
        });
      }
      return state.slectCount;
    };
    const clearAll = () => {
      state.treeRight.setCheckedNodes(state.targetData);
      del();
    };
    const initData = (basealldata, rightselectdata) => {
      if (basealldata && rightselectdata) {
        state.treeData = basealldata;
        rightselectdata.forEach(item => {
          //获取tree中的节点
          const node = state.tree.getNode(item);
          if (node.isLeaf) {
            //设置某个节点的勾选状态
            state.tree.setChecked(node, true);
          }
        });
        const selectedKeys = state.tree.getCheckedKeys(); //获取勾选的，不包含父级id
        const selectedNodes = state.tree.getCheckedNodes(false, true); //获取所有勾选的node
        handleData(
          selectedKeys,
          selectedNodes,
          state.targetData,
          state.treeData
        );
        //重新渲染el-tree
        // this.data = [...this.data]
        state.treeData = [...state.treeData];
      }
    };

    watch(
      () => state.targetData,
      n => {
        if (n) {
          const val = {
            children: n
          };
          state.slectCount = 0;
          state.slectCount = getLeafCountTree(val);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    watch(
      () => props.params,
      n => {
        if (n?.basealldata?.length > 0) {
          //显示基础数据
          state.treeData = cloneDeep(n.basealldata);
        }
        if (n?.basealldata?.length > 0 && n?.rightselectdata?.length > 0) {
          //编辑操作
          const basealldata = cloneDeep(n.basealldata);
          const rightselectdata = cloneDeep(n.rightselectdata);
          initData(basealldata, rightselectdata); //处理数据回显
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    // 用于父组件获取穿梭框数据
    const getData = () => {
      return {
        treeData: state.treeData,
        targetData: state.targetData
      };
    };

    return {
      props,
      ...toRefs(state),
      initData,
      recursion,
      getLeftValue,
      getRightValue,
      add,
      del,
      handleData,
      filterNode,
      toFilterTree,
      getLeafCountTree,
      clearAll,
      getData
    };
  }
});
</script>
<style scoped lang="scss">
.curstom_tree_transfer {
  display: flex;
  width: 100%;
  height: 500px;
  background-color: #ffffff;
  .left_box {
    width: 45%;
    border: 1px solid #dcdcdc;
    .transfer-box-content {
      .left_filter_box {
        width: 100%;
        height: 56px;
        padding: 12px 8px;
        border-bottom: 1px solid #dcdcdc;
      }
      .tree_box {
        width: 100%;
        height: 444px;
        overflow-x: scroll;
      }
    }
  }
  .right_box {
    width: 45%;
    border: 1px solid #dcdcdc;
    .right_slelect_info {
      width: 100%;
      height: 56px;
      line-height: 31px;
      padding: 12px 8px;
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      justify-content: space-between;
    }
    .tree_box {
      width: 100%;
      height: 444px;
      overflow-x: scroll;
    }
  }
  .btn_box {
    width: 10%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    div {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
    }
  }
}
</style>
