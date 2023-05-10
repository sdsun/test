<template>
  <div class="data-permission">
    <el-tabs tab-position="left" :style="{ height: '600px' }">
      <!-- 区域配置 -->
      <el-tab-pane label="Region">
        <Region />
      </el-tab-pane>
      <!-- 渠道配置 -->
      <el-tab-pane label="Channel">
        <Channel />
      </el-tab-pane>
      <!-- 客户配置 -->
      <el-tab-pane label="Customer">
        <Customer />
      </el-tab-pane>
      <!-- 店铺配置 -->
      <el-tab-pane label="Shop">
        <Shop />
      </el-tab-pane>
      <!-- 产品类别配置 -->
      <el-tab-pane label="Product Category">
        <ProductCategory />
      </el-tab-pane>
      <!-- 品牌配置 -->
      <el-tab-pane label="Brand">
        <Brand />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import Region from "./region.vue";
import Channel from "./channel.vue";
import Customer from "./customer.vue";
import Shop from "./shop.vue";
import ProductCategory from "./product-category.vue";
import Brand from "./brand.vue";
</script>
<style lang="scss" scoped>
.data-permission {
  background: #fff;
  padding: 12px;
}
</style>
