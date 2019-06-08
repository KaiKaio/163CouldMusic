# 仿网易云音乐

-	使用了 jQuery 进行开发的移动端云音乐播放器
-	使用了 MVC 的模块化思想的开发方式
-	使用了EventHub 的开发思想处理事件
-	包含了管理端，使用LeanCloud、七牛进行数据存储

**启动应用步骤**

1. `gitclone git@github.com:18898286061/163CouldMusic.git` 下载源代码
2. `npm install -g http-server` 安装 http-server 服务
3. `http-server -c-1` 启动服务
4. `node server 4000` 启动后台

5. 在浏览器中键入`http://127.0.0.1:8080/src/admin.html` 进入管理页面
6. 在浏览器中键入`http://127.0.0.1:8080/src/index.html` 进入该应用页面

扫描二维码进入应用：

![二维码](https://github.com/18898286061/163CouldMusic/blob/master/QRcode.png)
