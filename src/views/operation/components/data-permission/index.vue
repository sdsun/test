<template>
  <div class="data-permission">
    <el-tabs tab-position="left" :style="{ height: '600px' }">
      <!-- 区域配置 -->
      <el-tab-pane label="Region">
        <config-region />
      </el-tab-pane>
      <!-- 渠道配置 -->
      <el-tab-pane label="Channel">
        <config-channel />
      </el-tab-pane>
      <!-- 客户配置 -->
      <el-tab-pane label="Customer">
        <config-customer />
      </el-tab-pane>
      <!-- 店铺配置 -->
      <el-tab-pane label="Shop">
        <config-shop />
      </el-tab-pane>
      <!-- 产品类别配置 -->
      <el-tab-pane label="Product Category">
        <config-product />
      </el-tab-pane>
      <!-- 品牌配置 -->
      <el-tab-pane label="Brand">
        <config-brand />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import ConfigRegion from "./config-region.vue";
import ConfigChannel from "./config-channel.vue";
import ConfigCustomer from "./config-customer.vue";
import ConfigShop from "./config-shop.vue";
import ConfigProduct from "./config-product.vue";
import ConfigBrand from "./config-brand.vue";
</script>
<style lang="scss" scoped>
.data-permission {
  background: #fff;
  padding: 12px;
}
</style>
