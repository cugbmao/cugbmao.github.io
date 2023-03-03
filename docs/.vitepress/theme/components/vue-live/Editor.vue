<template>
  <!-- <PrismEditor -->
  <!--   v-model="stableCode" -->
  <!--   @update:modelValue="updatePreview" -->
  <!--   :highlight="highlighter" -->
  <!--   v-bind="editorProps" -->
  <!--   line-numbers -->
  <!-- /> -->
  <Codemirror
    v-model="stableCode"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @update:modelValue="updatePreview"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
// import { PrismEditor } from "vue-prism-editor";
import debounce from "debounce";
import { Codemirror } from "../codemirror";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";

// import "vue-prism-editor/dist/prismeditor.min.css";

// import makeHighlight from "./utils/highlight";

const UPDATE_DELAY = 300;

export default defineComponent({
  name: "VueLiveEditor",
  inheritAttrs: false,
  components: { Codemirror },
  props: {
    code: {
      type: String,
      required: true,
    },
    error: {
      type: [Error, Object] as PropType<(Error | Object) & { loc: any }>,
      default: undefined,
    },
    delay: {
      type: Number,
      default: UPDATE_DELAY,
    },
    editorProps: {
      type: Object,
      default: () => ({}),
    },
    prismLang: {
      type: String,
      default: "html",
      validator: (val: string) => ["html", "vsg"].includes(val),
    },
    jsx: {
      type: Boolean,
      default: false,
    },
    squiggles: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      updatePreview: (() => {}) as (code: string) => void,
      /**
       * This data only gets changed when changing language.
       * it allows for copy and pasting without having the code
       * editor repainted every keystroke
       */
      extensions: [vue(), oneDark],
      stableCode: this.code,
      highlight: (() => (code: string) => code) as (
        lang: "vue" | "vsg",
        jsxInExamples: boolean
      ) => (code: string, errorLoc: any) => string,
    };
  },
  async beforeMount() {
    /**
     * To load the prism jsx language with ESmodules we need to
     * load javascript first then load jsx
     * order is not guaranteed to work in ESmodules imports
     */
    // this.highlight = await makeHighlight();
  },
  methods: {
    // highlighter(code: string) {
    //   return this.highlight(this.prismLang as "vue" | "vsg", this.jsx)(
    //     code,
    //     this.squiggles && this.error && this.error.loc
    //   );
    // },
  },
  watch: {
    code(value) {
      this.updatePreview(value);
    },
  },
  created() {
    this.updatePreview = debounce((value: string) => {
      this.stableCode = value;
      this.$emit("change", value);
    }, this.delay);
  },
});
</script>

<style>
.VueLive-squiggles-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}

.VueLive-squiggles {
  border-bottom: 2px dotted red;
}
</style>
