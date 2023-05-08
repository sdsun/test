<template>
  <div style="border: 1px solid #ccc; z-index: 1002">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      :model-value="modelValue"
      :style="style"
      :disabled="disabled"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useI18n } from "vue-i18n";
import {
  IDomEditor,
  IEditorConfig,
  i18nChangeLanguage
} from "@wangeditor/editor";
const { locale } = useI18n();
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: "default" // 可选模式：[default | simple]
  },
  placeholder: {
    type: String,
    default: ""
  },
  style: {
    type: String,
    default: "height: 400px;"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 设置编辑器多语言
i18nChangeLanguage(locale.value === "zh" ? "zh-CN" : "en");

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  readOnly: props.disabled,
  MENU_CONF: {
    uploadImage: {
      server: "http://localhost:8080/api/upload" // 上传地址
    }
  }
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) {
    return;
  }
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

// 编辑器change事件触发
const emit = defineEmits(["update:modelValue"]);
const handleChange = (editor: IDomEditor) => {
  console.log(editor.getHtml());
  emit("update:modelValue", editor.getHtml());
};
</script>
