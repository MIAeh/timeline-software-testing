# timeline-software-testing


## 简介
部署Web端和桌面应用端简单Timeline应用，同时进行系统测试、性能和测试代码自测试。
- 更新日志&人员分配：腾讯文档 https://docs.qq.com/doc/DY2hVZmxhYk1PaGx2
- 技术框架：   
   - Web前端使用HTML5+CSS3+Javascript+JQuery构建页面，通过Electron在原有Web前端基础上进行修改和适配，转换为桌面应用
   - Web和桌面端后端共享，使用Node.js的Express框架搭建，使用node-mysql与数据库联通
   - 前后端交互使用API进行JSON数据交换
- 环境部署：nodeJS，npm，express，express-generator，intelliJ IDEA
  代码中'node_modules'文件夹为框架配置文件。   
  具体部署步骤详见：[系统部署说明.md](./系统部署说明.md)


## 时间安排
- 主要时间节点：
   - 项目分工截止时间：2018年11月26日24：00
   - 项目资产提交时间截止时间：2019年1月7日24：00
   - 2019年1月11日进行项目展示汇报，请准备PPT，每个小组展示时间10分钟
   
- 迭代方式与周期：
以1周为一个迭代周期（12/2起）：每周六进行meeting&完成度确认&下周任务安排
   - 前两周（12/2~12/16）：集中进行部署数据库、开发和代码自测试
   - 后两周（12/17~12/31）：进行代码优化和修改，集中进行测试
   - 剩余：进行更新、完善、文档撰写


## 项目角色
<table width="1000">
		<tr bgcolor="#EDEDED">
			<th>职责</th>
			<th>负责人</th>
			<th>具体分工</th>
		</tr>
		<tr>
			<td>产品经理</td>
			<td>徐雯蕾</td>
			<td>时间规划、项目架构、任务分配、审查代码&报告</td>
		</tr>
		<tr>
			<td rowspan="2">开发</td>
			<td>徐雯蕾</td>
			<td>Web与桌面端前端完整代码，前后端联通</td>
		</tr>
		<tr>
			<td>杨政达</td>
			<td>数据库部署，代码测试设计与执行，静态分析报告，覆盖度报告</td>
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
	</table>
  

## 文档及入口
### 开发
- 代码
   - [网页版](./timeline-frontend)
   - [桌面版](./electron-timeline)
   - [后端](./timeline-backend)
- 代码测试
   - 测试代码
   - 覆盖度报告
   - 静态测试报告

### 测试
- 系统测试
   - 系统测试计划
   - 系统测试报告
   - *系统测试脚本*
- 性能测试
   - 性能测试计划
   - 性能测试场景
   - 性能测试脚本
   - 性能测试报告

### 其他
- [系统部署说明](./系统部署说明.md)
- [分工 & 更新日志](./更新日志.md)
- 展示PPT
