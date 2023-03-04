/**
 * index
 * @author mao
 * @create_date 2022/12/19
 * @modify_date 2022/12/19
 * @modify_content
 */

import Theme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style/var.less";
import "element-plus/theme-chalk/dark/css-vars.css";
import VueLiveWithLayout from "./components/vue-live-with-layout";
import liveEditor from "./components/liveEditor.vue";
import NotFound from "./components/NotFound.vue";

// let search = null;

export default {
  ...Theme,
  // Layout: Theme.Layout,
  // enhanceApp: Theme.enhanceApp,
  NotFound,
  enhanceApp(ctx: any) {
    Theme.enhanceApp(ctx);
    ctx.app.use(ElementPlus);
    ctx.app.component("live-editor", liveEditor);
    ctx.app.component("VueLive", VueLiveWithLayout);
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          // @ts-ignore:next-line
          document.querySelector(".modal-back")?.click();
        }
      });
      window.addEventListener("click", (e) => {
        const el = e.target as HTMLElement;
        if (el.matches('div[class*="language-"] > button.run')) {
          const parent = el.parentElement;
          // const sibling = el.previousSibling
          //   ?.previousSibling as HTMLPreElement | null;
          // console.log(parent, sibling);
          // // console.log(el.nextElementSibling);
          // console.log(el.previousSibling);

          if (!parent) {
            return;
          }

          const sibling = parent.querySelector("code");

          if (!sibling) return;
          let text = "";
          // console.log(sibling.querySelectorAll("span.line"));

          sibling
            .querySelectorAll("span.line:not(.diff.remove)")
            .forEach((node) => (text += (node.textContent || "") + "\n"));
          text = text.slice(0, -1);
          // console.log(text);
          let func = new Function(text);

          try {
            let result = func();
            // alert(JSON.stringify(result));
          } catch (e) {
            alert(e);
          }
        }
      });
    }
  },
};
