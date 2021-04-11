## 脚手架cli搭建
学习coderwhy的脚手架教程所搭建的。
（划掉，尚未发布到npm）首先是安装：npm install yho_cli

指令包括：
- why --help
- options
  - why -c --command
  - why -d --dest \<dest\>
  - why -f --framework \<framework\>
- command
  - why create \<project\> [others...]
  - why addcpn \<name\> [-d src/components]，添加组件，例如why addcpn HelloWorld
  - why addpage \<page\> [-d src/components]，添加页面，例如why addpage Home
  - why addstore \<store\> [-d src/components]，添加store，例如: why addstore user
