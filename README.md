# component
嵌入到html中的部分页面，或者单个组件，使用react

最新的版本中已经能够解决大多数的问题，但是对于后端的接口的结构要求比较严格，而且是继续使用部分react组件的模式，在之后的开发中，努力像三个方向靠拢：
1.界面完成为https://simonzhangiter.github.io/DataVisualization/#/dashboard这样的形式
2.找机会替换或者取消掉对于data-table的依赖，总的来看，这样的开销比致力于解决 react与真实dom操作之间的冲突要来的小一些
3.将项目中不再依赖的css和js去掉，减少时间的消耗
4.将添加新页面时，对于地址的描述文件放在外面，不和react项目一起打包
5.优化各个组件，性能以及兼容度提升
