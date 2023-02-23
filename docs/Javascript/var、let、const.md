# var、let、const
从 nodejs 13 开始，不允许在不使用（var/let/const)关键字声明的情况下直接定义变量
```javascript
/**
 * nodejs 12及以前版本正常运行
 * 13及以后版本报错：ReferenceError: a is not defined
 */
a = 1
```

