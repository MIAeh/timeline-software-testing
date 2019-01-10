# timeline-software-testing

## 目录
- [简介](#intro)
- [时间安排](#schedule)
- [项目角色](#role)
- [文档及入口](#docs)<br><br>

## <span id="intro">简介</span>
Web端和桌面应用端的简单Timeline应用，同时进行系统测试、性能和测试代码自测试。
- 项目成果：
   - Web版：外部可访问网址 [http://www.ecnu-joyin.top/timeline-frontend/](http://www.ecnu-joyin.top/timeline-frontend/)
   - 桌面版：可执行文件
      - Windows版：[./electron-timeline/Timeline-win32-x64](./electron-timeline/Timeline-win32-x64)
      - Mac版：[./electron-timeline/Timeline-darwin-x64](./electron-timeline/Timeline-darwin-x64)   
- 技术框架：   
   - Web前端使用HTML5+CSS3+Javascript+JQuery构建页面，通过Electron在原有Web前端基础上进行修改和适配，转换为桌面应用
   - Web和桌面端后端共享，使用Node.js的Express框架搭建，使用node-mysql与数据库联通
   - 前后端交互使用API进行JSON数据交换
   - 后端将数据库部署在云端服务器，将web代码部署在外部可访问域名上
- 环境部署：nodeJS，npm,express,express-generator,electron,IDE。  *代码中'node_modules'文件夹为框架配置文件。*   
	  具体部署步骤详见：[系统部署说明.md](项目文件/系统部署说明.md)<br><br>


## <span id="schedule">时间安排</span>
- 主要时间节点：
   - 项目分工截止时间：2018年11月26日24：00
   - 项目资产提交时间截止时间：2019年1月7日24：00
   - 2019年1月11日进行项目展示汇报，请准备PPT，每个小组展示时间10分钟
   
- 迭代方式与周期：
以1周为一个迭代周期（12/2起）：每周六进行meeting&完成度确认&下周任务安排
   - 12/2~12/16：集中进行部署数据库、开发和代码自测试
   - 12/17~12/24：进行代码联调、部署、测试思想确定
   - 12/24~1/7：进行代码优化和修改，集中进行测试
   - 剩余：进行更新、完善、文档撰写<br><br>


## <span id="role">项目角色</span>
<table width="1000">
		<tr bgcolor="#EDEDED">
			<th>职责</th>
			<th>负责人</th>
			<th>具体分工</th>
		</tr>
		<tr>
			<td>产品经理</td>
			<td>徐雯蕾</td>
			<td>时间规划、项目架构、任务分配、审查代码&报告、PPT、系统部署说明撰写、文件整合</td>
		</tr>
		<tr>
			<td rowspan="2">开发</td>
			<td>徐雯蕾</td>
			<td>Web与桌面端前端完整代码，前后端联通，打包electron可执行文件</td>
		</tr>
		<tr>
			<td>杨政达</td>
			<td>后端开发，数据库部署，代码测试设计与执行，静态分析报告，覆盖度报告，部署Web端代码至服务器</td>
		</tr>
		<tr>
			<td rowspan="2">测试</td>
			<td>侯峂欣</td>
			<td>系统测试计划、系统测试场景、系统测试用例/脚本，系统测试报告</td>
		</tr>
		<tr>
			<td>孙雨晶</td>
			<td>性能测试计划、性能测试场景、性能测试脚本，性能测试报告</td>
		</tr>
	</table><br><br>
  

## <span id="docs">文档及入口</span>
### 开发
- 代码
   - [网页版](./timeline-frontend)
   - [桌面版](./electron-timeline)
   - [后端](./timeline-backend)
- 代码测试
 ***由于桌面端使用了框架，基础的页面设计和UI、交互是同一份代码，因此electron端沿用了Web端的代码测试，新增了部分改动源代码的相应测试***
   - 测试代码   
      - [网页端](./timeline-frontend/test)
      - [桌面端](./electron-timeline/test)
      *testCode文件夹是为了测试重构的前端部分代码*
      - [后端](./timeline-backend/test)
   - 测试报告
   ***测试报告及覆盖度报告均为html形式，请用git下载后用浏览器打开对应文件夹下的html文件***
      - [网页端](./代码测试报告/前端测试/html测试报告)
      - [桌面端](./代码测试报告/桌面测试/html测试报告)
      - [后端](./代码测试报告/后端测试/html测试报告)
   - 覆盖度报告
      - 报告说明
      - [网页端](./代码测试报告/前端测试/html覆盖度报告)
      - [桌面端](./代码测试报告/桌面测试/html覆盖度报告)
      - [后端](./代码测试报告/后端测试/html覆盖度报告)
   - [静态测试报告](/代码测试报告/静态测试报告.docx)


### 测试

- 系统测试 | 目录：[./系统测试](./系统测试)
   - [系统测试计划](系统测试/Timeline测试计划.xlsx)
   - [系统测试脚本](系统测试/脚本)
      - [chrome](系统测试/脚本/chrome)
      - [firefox](系统测试/脚本/firefox)
      - [IE](系统测试/KatalonRecorder)
   - [系统测试报告](系统测试/测试报告.doc)
- 性能测试 | 目录：[./性能测试](./性能测试)
   - [性能测试计划](性能测试/性能测试文档/Timeline性能测试计划.docx)
   - 性能测试脚本
      - [说明](性能测试/性能测试文档/Timeline性能测试脚本说明.md)
      - [脚本](性能测试/性能测试脚本)
   - [性能测试报告(场景包括在内)](性能测试/性能测试文档/Timeline性能测试分析.docx)

### 其他 
目录：[./项目文件](./项目文件)
- [系统部署说明](项目文件/系统部署说明.md)
- [人员分工 & 更新日志](项目文件/更新日志.md)
- [展示PPT](项目文件/汇报PPT(徐雯蕾,杨政达,孙雨晶,侯峂欣).pptx)
- 系统Demo
   - 网页版外部可访问网址 [http://www.ecnu-joyin.top/timeline-frontend/](http://www.ecnu-joyin.top/timeline-frontend/)
   - 桌面版可执行文件 
      - Windows版：[./electron-timeline/Timeline-win32-x64](./electron-timeline/Timeline-win32-x64)
      - Mac版：[./electron-timeline/Timeline-darwin-x64](./electron-timeline/Timeline-darwin-x64)   
   **由于打包了框架，桌面文件可能较大，请注意//不要//单独下载.exe或.app，否则可能会导致资源无法读取**
      - 使用指南：
         1. Download整个github包，进入上述系统对应的目录
         2. 在目录下找到Timeline.exe/Timeline.app文件，点击打开
         3. 系统授予应用程序权限，运行
