# CSS：层叠样式表

要做好前端开发，CSS 是绕不过去的

<!-- <iframe seamless srcdoc="hello"/> -->

```html livecode
<style>
  * {
    margin: 0;
  }
  div {
    height: 100vh;
    background: repeating-radial-gradient(
      circle at 150% 150%,
      #fff 0%,
      #fff 50px,
      #000 52px,
      #000 102px,
      #fff 104px
    );
  }
  div::before {
    content: "Cugbmao's Blog";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 40px;
    font-weight: 700;
    white-space: nowrap;
    mix-blend-mode: difference;
  }
</style>
<body>
  <div></div>
</body>
```
