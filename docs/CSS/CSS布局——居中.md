# CSS 布局——居中

## 水平居中

### `margin: 0 auto;`

> 实际项目中最常见的是水平居中，一般来说这个最容易实现，使用`margin: 0 auto;`即可实现

```html livecode
<style>
  .horizontal-center {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    background: #000;
  }
</style>
<div class="horizontal-center"></div>
```

### `flex`布局

> 文本和块级元素都适用

```html livecode
<style>
  .box {
    width: 300px;
    height: 200px;
    background: #ddd;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .child {
    width: 100px;
    background: #000;
    color: #fff;
  }
</style>
<div class="box">文本垂直居中</div>
<div class="box">
  <div class="child">块级元素垂直居中</div>
</div>
```

### 使用`grid`布局

> 目前 PC 端各浏览器对`grid`的支持越来越多了，基本已经到了可以不考虑兼容性的问题了，手机端的支持度还不够，[查看`grid`个浏览器的支持度](https://caniuse.com/?search=grid)

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .two {
    background: #000;
  }
  .one,
  .three {
    background: #ddd;
  }
</style>
<div class="box">
  <div class="one"></div>
  <div class="two">target item</div>
  <div class="three"></div>
</div>
```

## 垂直居中

### 使用绝对定位和负外边距对块级元素进行垂直居中

> 在知道被居中块级元素的尺寸的情况下，可以使用绝对定位和负外边距对块级元素进行垂直居中。

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
  }
  .child {
    width: 100px;
    height: 100px;
    background: #000;
    position: absolute;
    top: 50%;
    margin: -50px 0 0 0;
  }
</style>
<div class="box">
  <div class="child"></div>
</div>
```

### 使用绝对定位和 `transform`

> 在不知道被居中元素的尺寸的情况下（当然知道的情况下也可以），可以使用绝对定位和 `transform` 进行垂直居中，因为 `transform` 中 `translate` 偏移的百分比就是相对于元素自身的尺寸而言的。

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
  }
  .child {
    background: #000;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
<div class="box">
  <div class="child">不清楚自己的尺寸</div>
</div>
```

### 使用绝对定位和 `margin`百分比

> 在清楚自己的尺寸在父元素中的占比的情况下，可以使用绝对定位和 `margin` 进行垂直居中。

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
  }
  .child {
    /* width: 50%; */
    height: 50%;
    background: #000;
    color: #fff;
    position: absolute;
    top: 50%;
    margin: -25% 0 0 0;
  }
</style>
<div class="box">
  <div class="child">清楚自己的尺寸在父元素中的占比</div>
</div>
```

### 使用绝对定位和`margin: auto;`

> 使用绝对定位将子元素的`top`和`bottom`设置成相等的值，再使用`margin: auto;`

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
  }
  .child {
    /* width: 200px; */
    height: 100px;
    background: #000;
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    line-height: 100px;
  }
</style>
<div class="box">
  <div class="child">绝对定位加margin: auto;</div>
</div>
```

### 使用`padding`实现子元素的垂直居中

> 给父元素设置相等的上下内边距，子元素自然是垂直居中的，这时候父元素是不能设置高度的，要让它自动被填充起来，除非设置了一个正好等于上内边距+子元素高度+下内边距的值，否则无法精确垂直居中。

```html livecode
<style>
  .box {
    width: 300px;
    background: #ddd;
    padding: 100px 0;
  }
  .child {
    /* width: 200px; */
    height: 100px;
    background: #000;
    color: #fff;
  }
</style>
<div class="box">
  <div class="child">父元素不设置高度，自动撑开</div>
</div>
```

### 添加额外的元素

> 添加一个父元素高度一半的子元素，这样要居中的子元素默认的 top 就到了父元素的 50%位置，然后设置一个`margin-top`，值为自身高度的一半的负值。

```html livecode
<style>
  .box {
    width: 300px;
    background: #ddd;
    height: 300px;
  }
  .base {
    height: 50%;
  }
  .child {
    height: 100px;
    background: #000;
    color: #fff;
    margin-top: -50px;
  }
</style>
<div class="box">
  <div class="base"></div>
  <div class="child">margin-top为自身高度一半的负值</div>
</div>
```

### `flex`布局

> 文本和块级元素都适用

```html livecode
<style>
  .box {
    width: 300px;
    height: 200px;
    background: #ddd;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .child {
  }
</style>
<div class="box">文本垂直居中</div>
<div class="box">
  <div class="child">块级元素垂直居中</div>
</div>
```

### 第二种`flex`布局

```html livecode
<style>
  .box {
    width: 300px;
    height: 200px;
    background: #ddd;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
  }
  .child {
    height: 100px;
    background: #000;
  }
</style>
<div class="box">
  <div class="child"></div>
</div>
```

### 使用`grid`布局

> 目前 PC 端各浏览器对`grid`的支持越来越多了，基本已经到了可以不考虑兼容性的问题了，手机端的支持度还不够，[查看`grid`个浏览器的支持度](https://caniuse.com/?search=grid)

```html livecode
<style>
  .box {
    width: 300px;
    height: 300px;
    display: grid;
  }
  .two {
    background: #000;
  }
  .one,
  .three {
    background: #ddd;
  }
</style>
<div class="box">
  <div class="one"></div>
  <div class="two">target item</div>
  <div class="three"></div>
</div>
```

## 水平垂直居中

### `flex`加`margin: auto;`

```html livecode
<style>
  .box {
    display: flex;
    background: #ddd;
    width: 300px;
    height: 300px;
  }
  .child {
    margin: auto;
    width: 100px;
    height: 100px;
    background: #000;
  }
</style>
<div class="box">
  <div class="child"></div>
</div>
```

### `grid`布局

```html livecode
<style>
  .box {
    display: grid;
    place-content: center;
    background: #ddd;
    width: 300px;
    height: 300px;
  }
  .child {
    width: 100px;
    height: 100px;
    background: #000;
  }
</style>
<div class="box">
  <div class="child"></div>
</div>
```
