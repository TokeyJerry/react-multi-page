
# 项目技术解析

> 本项目旨在基于 React、NodeJs 

## package.json

### devDep

### dependencies


### 

- nodemon `用于修改服务端代码实时更新`
- webpack
- webpack-dev-middleware webpack-hot-middleware `用于开发时热更新的模块`

- babel 相关
```shell
  npm install --save-dev babel 
                         babel-core
                         babel-loader
                         babel-preset-es2015
                         babel-preset-react
                         babel-preset-stage-2  
```

JavaScript 在这种情况下是不会报任何错误的，但是页面就是显示不正常，然后我们踏上了漫漫 debug 的路程。这里的例子还是过于简单，容易 debug，但是对于比较复杂的成因和情况是比较难处理的。

于是 React.js 就提供了一种机制，让你可以给组件的配置参数加上类型验证，就用上述的评论组件例子，你可以配置 Comment 只能接受对象类型的 comment 参数，你传个数字进来组件就强制报错。我们这里先安装一个 React 提供的第三方库 prop-types：
http://www.css88.com/react/docs/typechecking-with-proptypes.html

```js
  npm install --save prop-types
```

## React 技术栈

1.React： 主体
2.WebPack、grunt、gulp： 自动化构建工具
3.Flex： 布局
4.React-Router： 路由
5.Redux： View 层
6.Mocha：测试
7.Istanbul：覆盖率
