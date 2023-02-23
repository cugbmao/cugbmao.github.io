function nav() {
  return [
    { text: "Java", link: "/Java/index", activeMatch: "/Java/" },
    { text: "Javascript", link: "/Javascript/" },
    { text: "Vue3", link: "/Vue3/" },
    { text: "React", link: "/React/" },
    { text: "Typescript", link: "/Typescript/" },
    { text: "杂文", link: "/Essay/" },
    { text: "小说", link: "/Novel/" },
  ];
}
function sidebar(name) {
  return [
    {
      text: name,
      children: [
        { text: "变量声明", link: "/" },
        { text: "About", link: "/About/" },
        { text: "Contact", link: "/Contact/" },
      ],
    },
  ];
}
module.exports = {
  lang: "zh-CN",
  title: "Cugbmao's Blog",
  description: "",
  cleanUrls: "with-subfolders",
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
    nav: nav(),
    sidebar: {
      "/Java/": [
        {
          text: "Java",
          items: [
            {
              text: "简介",
              link: "Java/index",
            },
          ],
        },
      ],
    },
  },
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        let token = tokens[idx];
        if (token) {
          // console.log(token);
          // console.log(JSON.parse(JSON.stringify(env.sfcBlocks.scriptSetup)));
          const orgInfo = token.info;
          let info = token.info ? String(token.info).trim() : "";
          if (info.indexOf("echarts") > -1) {
            env.sfcBlocks.scripts = JSON.parse(
              JSON.stringify(env.sfcBlocks.scripts)
            );
            env.sfcBlocks.scripts[0].contentStripped +=
              `let ec${idx}_` + token.content.trim();
            env.sfcBlocks.scripts[0].content =
              env.sfcBlocks.scripts[0].content.replace("</script>", "") +
              `\n let ec${idx}_` +
              token.content.trim() +
              "\n </script>";
            token.info = "javascript";
            return (
              defaultRender(tokens, idx, options, env) +
              `
                <v-chart :option="ec${idx}_option" style="width:400px;height:300px" />
              `
            );
          }
        }
        return defaultRender(tokens, idx, options, env);
      };
    },
  },
};
