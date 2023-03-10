import fs from "fs";
import vueLiveMd from "./vue-live-md-it.mjs";

function nav() {
  // const navs = [];
  // let files = fs.readdirSync("./docs");
  // files.forEach((item) => {
  //   if (item !== "public" && !item.startsWith(".")) {
  //     if (fs.statSync("./docs/" + item).isDirectory()) {
  //       navs.push({
  //         text: item,
  //         link: `/${item}/`,
  //       });
  //     }
  //   }
  // });
  // return navs;
  return [
    // { text: "Java", link: "/Java/index", activeMatch: "/Java/" },
    // { text: "Postgresql", link: "/Postgresql/", activeMatch: "/Postgresql/" },
    { text: "Javascript", link: "/Javascript/", activeMatch: "/Javascript/" },
    // { text: "Typescript", link: "/Typescript/", activeMatch: "/Typescript/" },
    { text: "CSS", link: "/CSS/", activeMatch: "/CSS/" },
    { text: "Vue3", link: "/Vue3/", activeMatch: "/Vue3/" },
    // { text: "React", link: "/React/", activeMatch: "/React/" },
    { text: "Shell", link: "/Shell/", activeMatch: "/Shell/" },
    // { text: "杂文", link: "/Essay/", activeMatch: "/Eessay/" },
    // { text: "小说", link: "/Novel/", activeMatch: "/Novel/" },
  ];
}
function sidebar() {
  const side = {};
  let files = fs.readdirSync("./docs");
  // console.log(files);
  files.forEach((item) => {
    // console.log(fs.statSync("./docs/" + item).isDirectory());
    if (item !== "public" && !item.startsWith(".")) {
      if (fs.statSync("./docs/" + item).isDirectory()) {
        const items = [];
        let mds = fs.readdirSync("./docs/" + item);
        mds.forEach((md) => {
          if (md !== "index.md" && md.endsWith(".md")) {
            if (fs.statSync("./docs/" + item + "/" + md).isFile()) {
              let name = md.replace(".md", "");
              items.push({
                text: name,
                link: "/" + item + "/" + name,
                activeMatch: "/" + item + "/" + name,
              });
            }
          }
        });
        items.sort();
        side[`/${item}/`] = [
          {
            text: item,
            // link: "/" + item + "/index",
            // activeMatch: "/" + item + "/index",
            items,
          },
        ];
      }
    }
  });
  return side;
  // return [
  //   {
  //     text: name,
  //     children: [
  //       { text: "变量声明", link: "/" },
  //       { text: "About", link: "/About/" },
  //       { text: "Contact", link: "/Contact/" },
  //     ],
  //   },
  // ];
}
module.exports = {
  lang: "zh-CN",
  title: "Cugbmao's Blog",
  description: "",
  cleanUrls: "with-subfolders",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "Cugbmao" }],
    [
      "meta",
      { name: "keywords", content: "Cugbmao的知识库, 知识库, 博客, Cugbmao" },
    ],

    ["meta", { name: "HandheldFriendly", content: "True" }],
    ["meta", { name: "MobileOptimized", content: "320" }],
    // ['meta', { name: 'theme-color', content: '#3c8772' }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Cugbmao's Blog" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "个人知识库，记录 & 分享个人碎片化、结构化、体系化的知识内容。",
      },
    ],
    ["meta", { property: "og:site", content: "https://blog.cugbmao.com" }],
    ["meta", { property: "og:site_name", content: "Cugbmao's Blog" }],
    ["meta", { property: "og:image", content: "/logo.png" }],
    [
      "script",
      {},
      `
let inMobile = window.location.pathname.startsWith('/mobile')
debugger;
if (window.screen.width < 960) {
  if (!inMobile) {
    window.location.assign(window.location.href.replace(window.location.origin, window.location.origin + '/mobile'))
  }
} else {
  if (inMobile) {
    window.location.assign(window.location.href.replace(window.location.origin + '/mobile', window.location.origin))
  }
}
`,
    ],
    [
      "script",
      {},
      `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?80ab9d52812826bfb0d5ece6fde1758e";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
`,
    ],
  ],
  // mpa: true,
  themeConfig: {
    siteTitle: "Cugbmao's Blog",
    socialLinks: [
      { icon: "github", link: "https://github.com/cugbmao/cugbmao.github.io" },
    ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message: "",
      copyright: "Copyright © 2008-present Cugbmao",
    },
    logo: "/logo.png",
    outline: "deep", // 右侧大纲标题层级
    outlineTitle: "目录", // 右侧大纲标题文本配置
    outlineBadges: false, // 是否在大纲中显示 Badge 文本
    lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
    // algolia: {
    //   appId: "QSR0388ORW",
    //   apiKey: "b5731a28a736c01c91a9d057041e08d4",
    //   indexName: "Cugbmao",
    // },
    nav: nav(),
    sidebar: sidebar(),
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(vueLiveMd);
      const defaultRender = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        if (process.env.BLOG_TARGET === "mobile") {
          return defaultRender(tokens, idx, options, env);
        } else {
          let token = tokens[idx];
          if (token) {
            // const orgInfo = token.info;
            let info = token.info ? String(token.info).trim() : "";
            if (info.indexOf("echarts") > -1) {
              env.sfcBlocks.scripts = JSON.parse(
                JSON.stringify(env.sfcBlocks.scripts)
              );
              if (env.sfcBlocks.scripts.length === 0) {
                env.sfcBlocks.scripts[0] = {
                  content: "<script setup>\n</script>",
                  tagOpen: "<script setup>",
                  type: "script",
                  contentStripped: "\n",
                  tagClose: "</script>",
                };
              }
              env.sfcBlocks.scripts[0].contentStripped +=
                `let ec${idx}_` + token.content.trim();
              env.sfcBlocks.scripts[0].content =
                env.sfcBlocks.scripts[0].content.replace("</script>", "") +
                `\n let ec${idx}_` +
                token.content.trim() +
                "\n import ECharts from '@/components/ECharts.vue';\n </script>";
              token.info = "javascript";
              return (
                defaultRender(tokens, idx, options, env) +
                `<e-charts :option="ec${idx}_option"/>`
              );
            } else if (info.indexOf("livecode") > -1) {
              token.info = info.replace("livecode", "");
              const lang =
                info.replace("livecode").trim().split(" ")[0] || "html";

              // env.sfcBlocks.scripts = JSON.parse(
              //   JSON.stringify(env.sfcBlocks.scripts)
              // );
              // if (env.sfcBlocks.scripts.length === 0) {
              //   env.sfcBlocks.scripts[0] = {
              //     content: "<script setup>\n</script>",
              //     tagOpen: "<script setup>",
              //     type: "script",
              //     contentStripped: "\n",
              //     tagClose: "</script>",
              //   };
              // }
              // env.sfcBlocks.scripts[0].contentStripped +=
              //   `let livecode${idx} = ` + token.content.trim();
              // env.sfcBlocks.scripts[0].content =
              //   env.sfcBlocks.scripts[0].content.replace("</script>", "") +
              //   `\n let livecode${idx} = \`` +
              //   token.content.trim() +
              //   "`\n </script>";
              let code = token.content; //.replaceAll("sscript", "script");
              const codeClean = md.utils
                .escapeHtml(code)
                .replace(/\`/g, "\\`")
                .replace(/\$/g, "\\$");
              const markdownGenerated = `<live-editor lang="${lang}" 
      :rcode="\`${codeClean}\`" 
       />`;
              return markdownGenerated;
              // return `<live-editor lang="${lang}" :rcode="\`${codeClean}\`"/>`;
            } else if (info.indexOf("run") > -1) {
              token.info = info.replace("livecode", "");
              const lang =
                info.replace("run").trim().split(" ")[0] || "javascript";

              let con = defaultRender(tokens, idx, options, env);

              let cleanCon =
                con.slice(0, -6) +
                `<button title="Run Code" class="run iconfont icon-run"></button></div>`;
              return cleanCon;
            }
          }
        }
        return defaultRender(tokens, idx, options, env);
      };
      // md.use(vueLiveMd);
    },
  },
};
