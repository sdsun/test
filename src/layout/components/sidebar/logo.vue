<script setup lang="ts">
import { useNav } from "@/layout/hooks/useNav";

const props = defineProps({
  collapse: Boolean
});

const { title } = useNav();
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <img class="sidebar-logo" src="@/assets/logo/logo.png" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link
        v-else
        key="expand"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <img class="sidebar-logo" src="@/assets/logo/logo.png" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .sidebar-logo {
      margin: 8px;
      width: 32px;
      height: 32px;
    }
    .sidebar-title {
      display: block;
      width: 120px;
      line-height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      color: #ffffff;
      font-weight: 600;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
  &.collapses {
    .sidebar-logo {
      margin-right: 0;
      margin-left: 0;
    }
  }
}
</style>
