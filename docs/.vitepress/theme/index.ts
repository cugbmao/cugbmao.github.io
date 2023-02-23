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
// import "dayjs/locale/zh-cn";
import "element-plus/theme-chalk/dark/css-vars.css";
// import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
// import { GaugeChart, LineChart, BarChart, PieChart } from "echarts/charts";
// import {
//   TooltipComponent,
//   LegendComponent,
//   MarkLineComponent,
//   GraphicComponent,
//   GridComponent,
//   TitleComponent,
//   DataZoomComponent,
//   ToolboxComponent,
// } from "echarts/components";
// use([
//   CanvasRenderer,
//   GaugeChart,
//   LineChart,
//   BarChart,
//   PieChart,
//   TooltipComponent,
//   LegendComponent,
//   GraphicComponent,
//   GridComponent,
//   MarkLineComponent,
//   TitleComponent,
//   DataZoomComponent,
//   ToolboxComponent,
// ]);

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    ctx.app.use(ElementPlus);
    ctx.app.component("v-chart", VChart);
  },
};
