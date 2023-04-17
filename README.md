# 利用react自定义hooks实现虚拟列表

## 注意事项
1. 在应用虚拟节点时，外层必须嵌套一层dom元素，包裹
2. 形成滚动的条件是虚拟列表整个dom元素的高度必须高于本身dom元素父节点的高度

## 接收属性
isfullScreen, 接受的类型为boolen值，默认为true

## 场景优化
在早期没有采用isFullScreen属性，在绑定滚动事件时，在判断是绑定在window还是dom元素上是通过offsetHeight比较（有bug）。后面采取用户传递isFullScreen属性座位判断条件，全屏情况下目标对window,非全屏情况下为dom元素的父节点