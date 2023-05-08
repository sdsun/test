<template>
  <div class="per">
    <!-- 查询参数区域 -->
    <div class="per-search">
      <slot name="search" />
    </div>
    <div class="per-org">
      <span>6550</span>
    </div>
    <div class="per-main">
      <div class="flex justify-between h-full">
        <div class="per-main__left">
          <div class="flex justify-between">
            <span>Filtered Region List:</span>
          </div>
          <slot name="left" />
        </div>
        <div class="per-main__right">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.per {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 600px;
  box-sizing: border-box;
  &-search {
    margin-bottom: 20px;
  }
  &-org {
    border-bottom: 1px solid var(--el-border-color-light);
    margin-bottom: 20px;
    span {
      background: var(--el-color-primary);
      color: #fff;
      display: inline-block;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }
  &-main {
    flex: 1;
    &__left,
    &__right {
      height: 100%;
      width: 49%;
      box-sizing: border-box;
      padding: 20px;
      border: 1px solid var(--el-border-color-light);
    }
  }
}
</style>
