<template>
  <div>
    <WangEditor v-model="editorValue" placeholder="Please input..." />
  </div>
</template>

<script lang="ts" setup>
import WangEditor from "@/components/WangEditor/index.vue";
import { ref } from "vue";

const editorValue = ref("<p>GTM</p>");
</script>
