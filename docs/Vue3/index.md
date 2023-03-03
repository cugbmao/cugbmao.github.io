# Vue3

> 目前下面的编辑器，对于选项式写法支持还比较差，无法调用 method，正在修正中

```vue live
<template>
  <h1>{{ name }}</h1>
  <input v-model="name" />
  <el-button @click="changeName">change</el-button>
</template>
<script lang="ts">
export default {
  data() {
    return {
      name: "Hello World!",
    };
  },
  methods: {
    changeName() {
      this.name = this.name + "!";
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 32px;
}
h2 {
  font-size: 24px;
}
</style>
```
