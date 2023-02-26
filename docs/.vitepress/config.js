import fs from "fs";

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
    { text: "Java", link: "/Java/index", activeMatch: "/Java/" },
    { text: "Postgresql", link: "/Postgresql/", activeMatch: "/Postgresql/" },
    { text: "Javascript", link: "/Javascript/", activeMatch: "/Javascript/" },
    { text: "Typescript", link: "/Typescript/", activeMatch: "/Typescript/" },
    { text: "CSS", link: "/CSS/", activeMatch: "/CSS/" },
    { text: "Vue3", link: "/Vue3/", activeMatch: "/Vue3/" },
    { text: "React", link: "/React/", activeMatch: "/React/" },
    { text: "Shell", link: "/Shell/", activeMatch: "/Shell/" },
    { text: "杂文", link: "/Essay/", activeMatch: "/Eessay/" },
    { text: "小说", link: "/Novel/", activeMatch: "/Novel/" },
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
sidebar();
module.exports = {
  lang: "zh-CN",
  title: "Cugbmao's Blog",
  description: "",
  cleanUrls: "with-subfolders",
  head: [
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
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    footer: {
      message: "",
      copyright: "Copyright © 2008-present Cugbmao",
    },
    // algolia: {
    //   appId: "QSR0388ORW",
    //   apiKey: "b5731a28a736c01c91a9d057041e08d4",
    //   indexName: "Cugbmao",
    // },
    nav: nav(),
    sidebar: sidebar(),
  },
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        let token = tokens[idx];
        if (token) {
          const orgInfo = token.info;
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
          }
        }
        return defaultRender(tokens, idx, options, env);
      };
    },
  },
};
