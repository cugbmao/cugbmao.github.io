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
    <template v-if="lang === 'html'">
      <iframe
        v-if="lang === 'html'"
        seamless
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        :srcdoc="code"
        border="0"
        frameborder="0"
      />
    </template>
    <template v-else-if="lang === 'vue'">
      <!-- <component :is="previewCompent" /> -->
      <!--   <Repl -->
      <!--     @keydown.ctrl.s.prevent -->
      <!--     @keydown.meta.s.prevent -->
      <!--     :showCompileOutput="true" -->
      <!--     :autoResize="true" -->
      <!--     :clearConsole="false" -->
      <!--   /> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  shallowRef,
  onMounted,
  computed,
  // defineAsyncComponent,
} from "vue";
// import { Repl, ReplStore } from "@vue/repl";
// import "@vue/repl/style.css";
// import * as compiler from "vue/compiler-sfc";
// import { Codemirror } from "vue-codemirror";
import { Codemirror } from "./codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";

// const { Codemirror } = pkg;
const props = defineProps<{ lang?: string; rcode?: string }>();
const code = ref("");
// let previewCompent = defineAsyncComponent(() => import("./a.vue"));
// const preview = ref();
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
const handleReady = (payload: any) => {
  view.value = payload.view;
  // console.log(view.value);
};

// const useDevMode = ref(false);
// const useSSRMode = ref(false);

// let hash = location.hash.slice(1);
// if (hash.startsWith("__DEV__")) {
//   hash = hash.slice(7);
//   useDevMode.value = true;
// }
// if (hash.startsWith("__SSR__")) {
//   hash = hash.slice(7);
//   useSSRMode.value = true;
// }

// const store = new ReplStore({
//   serializedState: hash,
//   defaultVueRuntimeURL: import.meta.env.PROD
//     ? `${location.origin}/vue.runtime.esm-browser.js`
//     : `${location.origin}/src/vue-dev-proxy`,
//   defaultVueServerRendererURL: import.meta.env.PROD
//     ? `${location.origin}/server-renderer.esm-browser.js`
//     : `${location.origin}/src/vue-server-renderer-dev-proxy`,
// });

// // enable experimental features
// const sfcOptions = {
//   script: {
//     inlineTemplate: !useDevMode.value,
//     isProd: !useDevMode.value,
//     reactivityTransform: true,
//   },
//   style: {
//     isProd: !useDevMode.value,
//   },
//   template: {
//     isProd: !useDevMode.value,
//   },
// };

onMounted(() => {
  let value: string = props.rcode || "";

  value = value.replaceAll("sscript", "script");
  if (props.lang === "html") {
    code.value = value;
  } else if (props.lang === "vue") {
  }
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
// const log = (eventName: string, event: any) => {
// console.log(eventName, event);
// };

// function generateID() {
//   return Math.random().toString(36).slice(2, 12);
// }

// function transformVueSFC(source, filename) {
//   const { descriptor, errors } = compiler.parse(source, { filename });
//   if (errors.length) throw new Error(errors.toString());
//   const id = generateID();
//   const hasScoped = descriptor.styles.some((e) => e.scoped);
//   const scopeId = hasScoped ? `data-v-${id}` : undefined;
//   const templateOptions = {
//     id,
//     source: descriptor.template.content,
//     filename: descriptor.filename,
//     scoped: hasScoped,
//     slotted: descriptor.slotted,
//     compilerOptions: {
//       scopeId: hasScoped ? scopeId : undefined,
//       mode: "module",
//     },
//   };
//   const script = compiler.compileScript(descriptor, {
//     id,
//     templateOptions,
//     sourceMap: true,
//   });
//   if (script.map) {
//     script.content = `${
//       script.content
//     }\n//# sourceMappingURL=data:application/json;base64,${btoa(
//       JSON.stringify(script.map)
//     )}`;
//   }
//   const template = compiler.compileTemplate({
//     ...templateOptions,
//     sourceMap: true,
//   });
//   if (template.map) {
//     template.map.sources[0] = `${template.map.sources[0]}?template`;
//     template.code = `${
//       template.code
//     }\n//# sourceMappingURL=data:application/json;base64,${btoa(
//       JSON.stringify(template.map)
//     )}`;
//   }
//   let cssInJS = "";
//   if (descriptor.styles) {
//     const styled = descriptor.styles.map((style) => {
//       return compiler.compileStyle({
//         id,
//         source: style.content,
//         scoped: style.scoped,
//         preprocessLang: style.lang,
//       });
//     });
//     if (styled.length) {
//       const cssCode = styled.map((s) => s.code).join("\n");
//       cssInJS = `(function(){const el = document.createElement('style');
// el.innerHTML = \`${cssCode}\`;
// document.body.appendChild(el);}());`;
//     }
//   }
//   const moduleCode = `
//   import script from '${getBlobURL(script.content)}';
//   import {render} from '${getBlobURL(template.code)}';
//   script.render = render;
//   ${filename ? `script.__file = '${filename}'` : ""};
//   ${scopeId ? `script.__scopeId = '${scopeId}'` : ""};
//   ${cssInJS}
//   export default script;
//   `;
//   return moduleCode;
// }

// function getBlobURL(jsCode) {
//   const blob = new Blob([jsCode], { type: "text/javascript" });
//   const blobURL = URL.createObjectURL(blob);
//   return blobURL;
// }

// // https://github.com/WICG/import-maps
// // const map = {
// //   imports: {
// //     vue: 'https://unpkg.com/vue@3/dist/vue.esm-browser.js',
// //   },
// //   scopes: { },
// // };

// function makeComponent(componentCode) {
//   // const module = component.getAttribute('component');
//   let module = `module_${generateID()}`;
//   let moduleName = `${module}.vue`;
//   // if(!/\.vue$/.test(module)) {
//   //   moduleName += '.vue';
//   // }
//   // component.setAttribute('module', moduleName);
//   // if(module) {
//   return [getBlobURL(transformVueSFC(componentCode, moduleName)), module];
//   // }
//   // return [];
// }
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* width: 50%; */
  :deep(.cm-editor) {
    flex: 1;
    width: 50%;
  }
  iframe {
    flex: 1;
    /* width: 50%; */
  }
  .preview {
    flex: 1;
    width: 50%;
  }
}
</style>
