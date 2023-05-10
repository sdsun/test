<template>
  <el-popover
    :width="360"
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <span class="cursor-pointer" :style="{ padding: '0 20px' }">+</span>
    </template>
    <template #default>
      <div class="menu-icon">
        <div class="menu-icon__inner">
          <div
            :class="[
              'menu-icon__item',
              {
                'is-active': props.current === item.value
              }
            ]"
            v-for="(item, index) in list"
            :key="index"
            @click="emits('selectIconOk', item.value)"
          >
            <i :class="`iconfont ${item.value}`" />
          </div>
        </div>
      </div>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { ref } from "vue";

type IconType = {
  name: string;
  value: string;
}[];

interface Prop {
  current: string;
}

const props = defineProps<Prop>();

const emits = defineEmits(["selectIconOk"]);

const visible = ref(false);
// 显示模态框
const handleShow = () => {
  visible.value = true;
};

// 暴露实例方法
defineExpose({
  handleShow
});
// 图标列表
const list = ref<IconType>();
</script>
<style lang="scss" scoped>
.menu-icon {
  height: 300px;
  overflow-y: scroll;
  .is-active {
    color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
  }
  &__item {
    width: 16%;
    margin: 2%;
    float: left;
    text-align: center;
    height: 48px;
    line-height: 48px;
    border: 1px solid #eee;
    box-sizing: border-box;
    i {
      font-size: 20px;
    }
  }
}
</style>
