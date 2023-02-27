<!--
 * @FileDescription: liveEditor.vue
 * @Author: mao <cugbmao@163.com>
 * @Date: 2023-02-26
 * @LastEditors: mao
 * @LastEditTime: 2023-02-26 14:26
 -->
<template>
  <div class="container">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />
    <!-- @change="log('change', $event)" -->
    <!-- @focus="log('focus', $event)" -->
    <!-- @blur="log('blur', $event)" -->
    <iframe seamless :srcdoc="code" border="0" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from "vue";
// import { Codemirror } from "vue-codemirror";
import { Codemirror } from "./codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";

// const { Codemirror } = pkg;
const props = defineProps<{ lang?: string; rcode?: string }>();
const code = ref("");
const extensions = computed(() => {
  const ex = [oneDark];
  if (props.lang === "html") {
    ex.push(html());
  } else if (props.lang === "javascript") {
    ex.push(javascript());
  } else if (props.lang === "vue") {
    ex.push(vue());
  } else {
    ex.push(html());
  }
  return ex;
});

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
  // console.log(view.value);
};

onMounted(() => {
  code.value = props.rcode || "";
});

// Status is available at all times via Codemirror EditorView
// const getCodemirrorStates = () => {
//   const state = view.value.state;
//   const ranges = state.selection.ranges;
//   const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
//   const cursor = ranges[0].anchor;
//   const length = state.doc.length;
//   const lines = state.doc.lines;
//   // more state info ...
//   // return ...
// };
const log = (eventName: string, event: any) => {
  // console.log(eventName, event);
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* width: 50%; */
  :deep(.cm-editor) {
    flex: 1;
    /* width: 100%; */
  }
  iframe {
    flex: 1;
    /* width: 50%; */
  }
}
</style>
