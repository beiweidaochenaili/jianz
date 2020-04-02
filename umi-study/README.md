# umi-study
umi学习
es6

使用babel转码
安装 
$ npm install --save-dev @babel/core

配置文件.babelrc
babel的配置文件是.babelrc,存放在项目的根目录下,使用babel的第一步,就是配置这个文件

该违建用来设置转码规则和插件,基本格式如下
{
  "presets":[],
  "plugins":[]
}

presets字段设定转码规则,官方提供以下的规则集,你可以根据需要安装
#最新的转码规则
npm install --save-dev @babel/preset-env
#react转码规则
npm install --save-dev @babel/preset-react

然后,将这些规则加入.babelrc
{
  "presets":[
  "@babel/env",
  "@babel/preset-react"
 ],
"plugins":[]
}
注意,以下所有的babel工具和模块的而是用,都必须先写好.babelrc

其他更多babel相关知识
https://es6.ruanyifeng.com/#docs/intro