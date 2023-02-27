# 底部 footer 自动贴底

基本 80%以上的网站都有 footer，大部分手机 H5 APP 导航栏在底部

要如何做到页面内容没有撑满整个页面的时候，底部 footer 停留在窗口底部，而在页面内容超过一页的时候，底部 footer 自动跟随页面滑动呢？

> 其实利用`flex`布局加上`margin-top: auto;`即可轻松实现

```html livecode
<style>
  html,
  body {
    margin: 0;
  }
  .container {
    width: 100vw;
    min-height: 100vh;
    background: #ddd;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .footer {
    height: 48px;
    background: #357a66;
    margin-top: auto;
    flex-shrink: 0;
  }
</style>
<div class="container">
  <div id="content" class="content" style="height:100px;">
    <button onclick="document.querySelector('#content').style.height = '600px'">
      中间高度增加到600px
    </button>
    <button onclick="document.querySelector('#content').style.height = '100px'">
      中间高度减少到100px
    </button>
  </div>
  <div class="footer"></div>
</div>
```
