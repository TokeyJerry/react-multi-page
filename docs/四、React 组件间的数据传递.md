
- docs 目录
    + [一、React 浅析](./一、React 浅析.md)
    + [二、DOM DIFF 算法](./二、DOM DIFF 算法.md)
    + [三、React 组件的生命周期](三、React 组件的生命周期.md)
    + 四、React 组件间的数据传递
    + [五、虚拟 DOM 及内核 Virtual DOM and Internals](五、虚拟 DOM 及内核 Virtual DOM and Internals.md)

## React 组件间的数据传递

> React 的最大好处在于：功能组件化，遵守前端可维护的原则。而组建之间的通信、数据传递如何实现，正是本文所探讨的内容。

### React 组件间数据传输方式：单项数据流

React 是单向数据流，数据主要从父节点传递到子节点（通过 `props`）。
如果顶层（父级）的某个 `props` 改变了，React 会重渲染所有的子节点。


### 参考资料

- https://blog.csdn.net/guangyao88/article/details/71713806
- https://www.cnblogs.com/tim100/p/6050514.html