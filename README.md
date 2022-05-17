# 天理通知助手小程序

> 开发周期：2021年4月20日 — 2021年4月28日
>
> 项目内容：给予微信小程序的通知管理平台
>
> 版本迭代：1.0.4

## 概览

### 产品定位

#### 1. 现状

- 目前校园类通知我们更多使用QQ、微信发布。通知过于密集的时候我们常常会忘记其中的一些重要通知。天理通知助手小程序针对“老师”、“学生”等群体，进行了多维度的通知管理，让通知的阅读不再困难。同时小程序耗费资源较小，易于使用。

  ![](https://tva1.sinaimg.cn/large/008i3skNly1gpzjlbqiyrj31hh0u0k0v.jpg)



#### 2. 逻辑

- 流程图

  ![](https://tva1.sinaimg.cn/large/008i3skNly1gpzjm9rl5mj31hh0u0qd5.jpg)

#### 3.页面展示

![](https://tva1.sinaimg.cn/large/008i3skNly1gpzk4n88ygj31hj0u0h0q.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gpzk4vq79yj31hj0u0gwz.jpg)

![image-20210428165237640](/Users/leehs/Library/Application%20Support/typora-user-images/image-20210428165237640.png)

### 使用方法

#### 1. 体验版

- 扫描二维码或联系504794559@qq.com获取小程序体验版

  <img src="https://tva1.sinaimg.cn/large/008i3skNly1gpzjpwduloj30hs0g8wg2.jpg" style="zoom:33%;" /> 

#### 2. 正式版

- 等待发布

### 开发人员

#### 1. 前端

- 李酉夏、张文森、李鑫磊

#### 2.后端

- 李鑫磊

### 3.产品 & UI

- 张蔼婷、张照



## 项目

### 前端

#### 1.技术栈

- 框架：Taro-Vue 小程序框架
- UI：Taro-Vue-UI

#### 2.技术难点

- 页面逻辑：页面较为简单，但代码逻辑较为复杂，增加了团队合作的难度
- 请求封装：Request函数封装要适用于各类请求，封装需要前期谨慎考虑
- 界面交互：需要合理的用户交互，面对不同的状态需要给予用户不同的反馈
- 代码抽离：精简的函数抽离，需要恰当的使用不同的函数封装不同的功能

### 后端

#### 1.技术栈

- 框架：Koa
- 数据库：MySQL、Redis

#### 2.技术难点

- 服务优化：使用Redis将用户和群组进行缓存，减轻服务器压力和应对高并发，方便后台进行常规的获取数据操作而不走Mysql，同时定期刷新缓存、新用户刷新缓存
- 代码设计：代码结构进行了 route-controller-service 的分层设计、使用SESSION鉴权
- 数据库：使用MYSQL作为主数据库
