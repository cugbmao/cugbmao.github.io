# "new Function"

## 语法

> 创建 Function 的语法：通过使用参数`arg1...argN`和最后给定的`functionBody`创建

```javascript
const func = new Function([arg1, arg2, ...argN], functionBody);
```

> 下面的例子是一个带有两个参数和一个不带参数的方法：

```html livecode
<div id="app"></div>
<div id="hello"></div>
<script>
  const sum = new Function("a", "b", "return a + b");
  const noArgs = new Function("return 'Hello Function!'");
  document.querySelector("#app").innerHTML = sum(123, 421);
  document.querySelector("#hello").innerHTML = noArgs();
</script>
```

## 与`eval()`的区别

> `eval()` 的参数是一个字符串。如果字符串表示的是表达式，`eval()` 会对表达式进行求值。如果参数表示一个或多个 `JavaScript` 语句，那么`eval()` 就会执行这些语句。

> `eval()` 是一个危险的方法，它使用与调用者相同的权限执行代码。如果运行的字符串代码被恶意篡改，那么就会导致多种类型的攻击。而`Function`则不那么容易被攻击。

::: tip
`eval()`相关信息在这里就不赘述了，[可以参看这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)
:::

## 特性

> 和传统的方法相比，`new Function`最大的不同在于：它实际上是通过运行时通过参数传递过来的字符串创建的。

> 所以它允许我们将任意字符串变成方法，例如，我们可以从服务端获取一个新的方法并执行它。

```javascript
const str = ... 从服务端动态获取的方法代码 ...

let func = new Function(str);
func();
```

## 闭包

> 使用`new Function`创建一个方法，这个方法的环境是指向全局环境的，所以该方法是无法访问局部变量的，只能访问全局变量。

```javascript run
function getFunc() {
  let value = "test";

  let func = new Function("alert(value)");

  return func;
}

getFunc()(); // error: value is not defined
```

> 而普通常规编码的则是可以访问到局部变量的

```javascript run
function getFunc() {
  let value = "test";

  let func = function () {
    alert(value);
  };

  return func;
}

getFunc()(); // "test"，从 getFunc 的词法环境中获取的
```
