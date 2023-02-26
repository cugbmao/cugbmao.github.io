/**
 * vite.config.ts
 * Copyright (C) 2023-02-25  mao <cugbmao@163.com>
 *
 * Distributed under terms of the MIT license.
 */

import { defineConfig } from "vite";
import { SearchPlugin } from "vitepress-plugin-search";
import path from "path";

//default options
var options = {
  // ...flexSearchIndexOptions,
  // previewLength: 62,
  buttonLabel: "搜索",
  placeholder: "搜索文档",
};

export default defineConfig({
  plugins: [SearchPlugin(options)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".vitepress/theme"),
      // 'mermaid': 'mermaid/dist/mermaid.esm.mjs',
    },
  },
});
