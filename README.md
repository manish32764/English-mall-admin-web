# mall-admin-web
<p>
<a href="https://github.com/macrozheng/mall"> <img src=” http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/% E 5% 90% 8E%E 5% 8F%B 0% E 9% A 1% B 9% E 7% 9B%AE-mall-blue.svg” alt= “background project” > </a>
<a href=” http://qm.qq.com/cgi-bin/qm/qr?k=V6xu5c12j9qhnMUNdDRzakNxRK zOxibQ "> <img src=” http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/Q Q%E 7% BE%A4-959351312-red.svg” alt="QQ group "> </a>
<a href=” http://qm.qq.com/cgi-bin/qm/qr?k=M5Edq2TiJL_ShcOEeYjwcmdGmq 4zZrd_ "> <img src=” http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/Q Q%E 7% BE%A4-553018255-red.svg” alt="QQ group "> </a>
<a href="https://gitee.com/macrozheng/mall-admin-web"> <img src=” http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/% E 7% A 0% 81% E 4% BA%91-%E 9% A 1% B 9% E 7% 9B%E 5% 9C%B 0% E 5% 9D%80-orange.svg” a lt="Code Cloud"> </a>
</p>

## Preface

This project is the front-end part of the front-end separating project, back-end item `mall` address: [gate] ( https://github.com/macrozheng/mall).

## Project Introduction

`mall-admin-web` is a front-end project of e-commerce back-office management system based on Vue+Element implementation. Mainly include commodity management, order management, membership management, promotion management, operation management, content management, statistical reporting, financial management, rights management, settings and so on.

### Project Demo

Project online demo address: [http://www.macrozheng.com/admin/] ( http://www.macrozheng.com/admin/)

![https://github.com/macrozheng/mall/blob/master/document/resource/mall-admin.gif](https://github.com/macrozheng/mall/blob/master/document/resource/mall-admin.gif)

### Technology Selection

Technology | Description | Official Website
----|----|----
Vue | Front End Framework | [https://vuejs.org/](https://vuejs.org/)
Vue-router | Routing Frameworks | [https://router.vuejs.org/] ( https://router.vuejs.org/)
Vuex | Global State Management Framework | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Element | Front UI Frameworks | [https://element.eleme.io/] ( https://element.eleme.io/)
Axios | Front-End HTTP Framework | [https://github.com/axios/axios] ( https://github.com/axios/axios)
v-charts | Echarts Based Chart Framework | [https://v-charts.js.org/] ( https://v-charts.js.org/)
Js-cookie | cookie management tools | [https://github.com/js-cookie/js-cookie] ( https://github.com/js-cookie/js-cookie)
nprogress | Progress bar control | [https://github.com/rstacruz/nprogress] ( https://github.com/rstacruz/nprogress)
vue-element-admin | Project scaffolding reference | [ https://github.com/PanJiaChen/vue-element-admin] ( https://github.com/PanJiaChen/vue-element-admin)

### Project Layout

``` lua
src — source directory
— api — axios network request definition
－assets — Static Image Resource File
— components — General Assembly Package
— icons — svg vector image files
— router — vue-router routing configuration
— store — state management for vuex
—styles — global css style
— utils — Tool Class
└— views — front-end page
－home — Home
— layout — Universal Page Loading Framework
— login — login page
－oms — Orders Module Page
— pms — Product Module Page
└－sms — Marketing module page
```

## Build Steps
- Download node and install: [https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi] (https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi);
- This project is a front-back-end separating project，To access the local access interface need to build a background environment，Please refer to the back-end project [Portal] ( https://github.com/macrozheng/mall);
- No background environment is required to access the online interface, simply change the BASE_API in the config/dev.env.js file to [ http://120.27.63.9:8080](http://120.27.63.9:8080)即可;
- cloning the source code locally, opening it with IDEA, and compiling it;
- Run the command from the IDEA command line: npm install, download the dependencies;
- Run the command from the IDEA command line: npm run dev, run the project;
- Visit the address: [http://localhost:8090](http://localhost:8090] to open the background management system page;
- For specific deployment procedures, refer to: [Installation and deployment of mall front-end projects] ( http://www.macrozheng.com/#/deploy/mall_deploy_web)
- `NOTE`: If you cannot run the npm command, you need to configure the npm environment variable, such as adding the path variable: C:\Users\zhenghong\ AppData\ Roaming\ npm;
- `Note `: If npm install cannot download dependencies successfully, please refer to [Use Jenkins one-click package to deploy front-end apps, that's all 6!] (http://www.macrozheng.com/#/reference/jenkins_vue) section `Pit encounted'.

## license

[Apache License 2.0](https://github.com/macrozheng/mall-admin-web/blob/master/LICENSE)

Copyright (c) 2018-2020 macrozheng
