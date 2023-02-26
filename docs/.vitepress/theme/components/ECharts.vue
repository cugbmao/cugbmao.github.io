<!--
 * @FileDescription: ECharts.vue
 * @Author: mao <cugbmao@163.com>
 * @Date: 2023-02-24
 * @LastEditors: mao
 * @LastEditTime: 2023-02-24 08:28
 -->
<template>
  <div class="echarts" ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const props = defineProps<{ option?: any }>();

const chart = ref();

onMounted(() => {
  let c = echarts.init(chart.value);
  // 指定图表的配置项和数据
  // var option = {
  //   title: {
  //     text: "ECharts 入门示例",
  //   },
  //   tooltip: {},
  //   legend: {
  //     data: ["销量"],
  //   },
  //   xAxis: {
  //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  //   },
  //   yAxis: {},
  //   series: [
  //     {
  //       name: "销量",
  //       type: "bar",
  //       data: [5, 20, 36, 10, 10, 20],
  //     },
  //   ],
  // };

  // 使用刚指定的配置项和数据显示图表。
  c.setOption(props.option);
});
</script>

<style scoped lang="less">
.echarts {
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 300px;
}
</style>
