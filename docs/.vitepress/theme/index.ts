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
import "./style/var.css";
import VChart from "vue-echarts";
import "echarts";

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    ctx.app.use(ElementPlus).component("v-chart", VChart);
  },
};
