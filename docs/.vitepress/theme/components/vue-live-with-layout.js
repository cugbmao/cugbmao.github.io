/**
 * vue-live-with-layout.js
 * Copyright (C) 2023 mao <cugbmao@163.com>
 *
 * Distributed under terms of the MIT license.
 */
import { h } from "vue";
import { VueLive } from "./vue-live";
import layout from "./vue-live-layout.vue";

export default (props) => h(VueLive, { ...props, layout });
