# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## 后端接口

[地址](https://github.com/Binaryify/NeteaseCloudMusicApi)

```bash
# 下载后端项目
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

# 安装依赖
npm install

# 启动接口
node app.js
```

## 安装

``` bash
# 安装依赖
npm install

# 开启本地服务运行项目
npm run dev

```


## 部分截图


![image-20220530173844543](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301738885.png)

![image-20220530173911819](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301739589.png)

![image-20220530174411871](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301744788.png)

![image-20220530174458106](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301744230.png)

![image-20220530174035366](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301740325.png)

![image-20220530174529352](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205301745654.png)


## 项目目录
```js
├─.postcssrc.js // px转vw 配置
├─src
|  ├─App.vue
|  ├─main.js
|  ├─views // 视图
|  |   ├─video // 视频模块
|  |   |   ├─video.vue
|  |   |   ├─components
|  |   |   |     └recomVideoSwipe.vue
|  |   ├─songsList // 歌单页面
|  |   |     ├─mySongList.vue
|  |   |     ├─newSongList.vue
|  |   |     └recomPlaysList.vue
|  |   ├─search // 搜索页面
|  |   |   └search.vue
|  |   ├─piazza // 广场模块
|  |   |   └piazza.vue
|  |   ├─mine // 我的模块
|  |   |  ├─mine.vue
|  |   |  ├─components
|  |   |  |     └songlist.vue
|  |   ├─login // 登录页面
|  |   |   └login.vue
|  |   ├─home // 首页模块
|  |   |  ├─home.vue
|  |   |  ├─components
|  |   |  |     ├─newSongSwipe.vue
|  |   |  |     ├─Promotion.vue
|  |   |  |     └recomPlayListSwipe.vue
|  |   ├─audio // 音频页面
|  |   |   ├─audioPage.vue
|  |   |   └audioPageFooter.vue
|  ├─utils // 工具
|  |   ├─request.js // 封装axios
|  |   └storage.js
|  ├─store // 仓库
|  |   ├─index.js
|  |   └userInfo.js
|  ├─router // 路由
|  |   ├─index.js
|  |   ├─modules
|  |   |    ├─base.js
|  |   |    └songList.js
|  ├─plugin // 插件
|  |   ├─index.js
|  |   ├─mixin.js // 全局混入
|  |   └vant.js // vant组件局部引入
|  ├─components
|  |     ├─Swipe // 轮播图
|  |     |   ├─horizontalSwipe.vue
|  |     |   ├─multiSwipeItem.vue
|  |     |   └Swipe.vue
|  |     ├─subHead // 子标题
|  |     |    └subHead.vue
|  |     ├─songList // 歌单
|  |     |    ├─recomPlayListTop.vue
|  |     |    ├─songListContent.vue
|  |     |    ├─songListFooter.vue
|  |     |    └songListTop.vue
|  |     ├─Layout // 布局
|  |     |   ├─Footer.vue
|  |     |   ├─nameList.js
|  |     |   └topNav.vue
|  |     ├─IconList // 图标列表
|  |     |    └IconList.vue
|  ├─assets
|  |   ├─logo.png
|  |   ├─style //样式
|  |   |   ├─global.scss
|  |   |   ├─index.scss
|  |   |   ├─mixin.scss
|  |   |   └reset.css
|  |   ├─js // iconfont资源
|  |   | └iconList.js
|  ├─api
|  |  └api.js // api接口

```