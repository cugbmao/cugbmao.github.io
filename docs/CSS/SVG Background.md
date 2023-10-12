# SVG Background

在`css`中要拉伸背景图片，只需要指定背景大小

```css
.bg {
  background: url("bg.png") center center no-repeat;
  background-size: 100% 100%;
}
```

但是当背景图片是SVG的时候，背景会保持宽高比，不会拉伸，想要SVG背景不保持宽高比而是拉伸铺满，则需要加上`preserveAspectRatio`参数

```css
.bg {
  background: url("bg.svg#svgView(preserveAspectRatio(none))") center center
    no-repeat;
  background-size: 100% 100%;
}
```
