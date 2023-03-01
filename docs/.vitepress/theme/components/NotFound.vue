<!--
 * @FileDescription: NotFound.vue
 * @Author: mao <cugbmao@163.com>
 * @Date: 2023-03-01
 * @LastEditors: mao
 * @LastEditTime: 2023-03-01 11:11
 -->
<template>
  <div class="container">
    <h1>404</h1>
    <div class="cloak__wrapper">
      <div class="cloak__container">
        <div class="cloak"></div>
      </div>
    </div>
    <div class="info">
      <h2>页面走丢了！</h2>
      <p>先到首页或者通过顶部导航栏到其他模块流览其他内容</p>
      <a :href="withBase(root)" aria-label="首页">首页</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { withBase, useData } from "vitepress";
// import { useData } from "vitepress";
import { useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";

const { site } = useData();
const { localeLinks } = useLangs({ removeCurrent: false });

const root = ref("/");
onMounted(() => {
  const path = window.location.pathname
    .replace(site.value.base, "")
    .replace(/(^.*?\/).*$/, "/$1");
  if (localeLinks.value.length) {
    root.value =
      localeLinks.value.find(({ link }) => link.startsWith(path))?.link ||
      localeLinks.value[0].link;
  }
});
</script>

<style scoped>
@import url("https://fonts.font.im/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap");

.container * {
  box-sizing: border-box;
  transform-style: preserve-3d;
}
@property --swing-x {
  initial-value: 0;
  inherits: false;
  syntax: "<integer>";
}
@property --swing-y {
  initial-value: 0;
  inherits: false;
  syntax: "<integer>";
}
.container {
  --button: #b3b3b3;
  --button-color: #0a0a0a;
  --shadow: #000;
  --bg: #737373;
  --header: #7a7a7a;
  --color: #fafafa;
  --lit-header: #e6e6e6;
  --speed: 2s;
  /* min-height: 60vh; */
  height: 100%;
  width: 100%;
  flex: 1;
  /* position: absolute; */
  display: flex;
  font-family: "Roboto", sans-serif;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: var(--bg); */
  background: var(--vp-c-bg);
  color: var(--color);
  perspective: 1200px;
}
a {
  text-transform: uppercase;
  text-decoration: none;
  background: var(--button);
  color: var(--button-color);
  padding: 1rem 4rem;
  border-radius: 4rem;
  font-size: 0.875rem;
  letter-spacing: 0.05rem;
}
p {
  font-weight: 100;
}
h1 {
  /* -webkit-animation: swing var(--speed) infinite alternate ease-in-out; */
  animation: swing var(--speed) infinite alternate ease-in-out;
  font-size: clamp(5rem, 30vmin, 20rem);
  line-height: initial;
  font-family: "Open Sans", sans-serif;
  margin: 0;
  margin-bottom: 1rem;
  letter-spacing: 1rem;
  transform: translate3d(0, 0, 0vmin);
  --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
  background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x)
    100%/200% 200%;
  -webkit-background-clip: text;
  color: transparent;
}
h1:after {
  /* -webkit-animation: swing var(--speed) infinite alternate ease-in-out; */
  animation: swing var(--speed) infinite alternate ease-in-out;
  content: "404";
  position: absolute;
  top: 0;
  left: 0;
  color: var(--shadow);
  filter: blur(1.5vmin);
  transform: scale(1.05) translate3d(0, 12%, -10vmin)
    translate(
      calc((var(--swing-x, 0) * 0.05) * 1%),
      calc((var(--swing-y) * 0.05) * 1%)
    );
}
.cloak {
  animation: swing var(--speed) infinite alternate-reverse ease-in-out;
  height: 100%;
  width: 100%;
  transform-origin: 50% 30%;
  transform: rotate(calc(var(--swing-x) * -0.25deg));
  background: radial-gradient(
    50% 50% at 50% 50%,
    transparent,
    var(--vp-c-bg) 35%
  );
}
.cloak__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.cloak__container {
  height: 250vmax;
  width: 250vmax;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info {
  text-align: center;
  line-height: 1.5;
  max-width: clamp(16rem, 90vmin, 25rem);
}
.info > p {
  margin-bottom: 3rem;
  margin-top: 1rem;
}
@-webkit-keyframes swing {
  0% {
    --swing-x: -100;
    --swing-y: -100;
  }
  50% {
    --swing-y: 0;
  }
  100% {
    --swing-y: -100;
    --swing-x: 100;
  }
}
@keyframes swing {
  0% {
    --swing-x: -100;
    --swing-y: -100;
  }
  50% {
    --swing-y: 0;
  }
  100% {
    --swing-y: -100;
    --swing-x: 100;
  }
}
</style>
