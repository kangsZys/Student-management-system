<template>
	<div class="product">
		<template>
			<!-- 搜索姓名 -->
			<div class="seachStu">
				<el-select v-model="seachValue" clearable @clear="clearClass" filterable @blur="searchBlur" remote reserve-keyword
				 placeholder="请输入姓名,如果不更新,点击右侧搜索按钮" :remote-method="remoteMethod" :loading="loading" @change="changeSeachText">
					<el-option v-for="item in seachList" :key="item._Id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-search" plain @click="seachButton"></el-button>
				<el-button type="primary" @click="addStu">添加项目</el-button>
			</div>
			<!-- 搜索班级 -->
			<div class="selectClass">
				<span>选择班级:</span>
				<el-select v-model="classes" filterable placeholder="请选择" @visible-change="getClass" @change="changeClass">
					<el-option label="全部" value="all"></el-option>
					<el-option v-for="(item,index) in classOptions" :key="index" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div class="export-excel">
				<el-button icon="iconfont icon-excel" @click="exportExcel">导出excel表格</el-button>
			</div>
			<!-- 表格 -->
			<div class="tableList">
				<el-table :data="stulist" style="width: 100%" border v-loading="loading">
					<el-table-column label="头像" width="180" align="center" fixed>
						<template slot-scope="scope">
							<el-avatar shape="square" :size="50" fit="fill" :src="scope.row.headimgurl"></el-avatar>
						</template>
						<el-avatar shape="square" :size="50" :src="stulist.headimgurl"></el-avatar>
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180" align="center">
					</el-table-column>
					<el-table-column prop="class" label="班级" align="center">
					</el-table-column>
					<el-table-column prop="productUrl" label="项目" align="center">
					</el-table-column>
					<el-table-column prop="cTime" label="注册时间" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center" fixed="right" width="250px">
						<template scope={row}>
							<el-button type="primary" icon="el-icon-view" @click="$router.push({path:'/StudentManager/studentProfile'})">查看</el-button>
							<el-button type="primary" icon="el-icon-edit" @click="editStu(row)">编辑</el-button>
							<el-button type="danger" icon="el-icon-delete" @click="delStu(row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="pages" v-if="pageshow">
					<el-pagination background hide-on-single-page layout="prev, pager, next" :page-size="dateCount" :total="total"
					 align="center" @current-change="changePage" :current-page-sycn="currentPage">
					</el-pagination>
				</div>

			</div>
		</template>
		<zk-dialog></zk-dialog>
	</div>
</template>
</div>
</template>
<script>
	import dialog from "@/components/dialog.vue"
	import exportExcels from "qf-export-excel"
	import {
		getstulist,
		addstu,
		delStu,
		seachStu,
		getClasses
	} from "@/api/index.js";
	export default {
		data() {
			return {
				stulist: [],
				seachList: [],
				seachValue: '',
				loading: false,
				seachBlur: '',
				classes: '',
				classOptions: [],
				total: 0,
				// 每页显示条数
				dateCount: 5,
				dataPage: '',
				currentPage: 1,
				pageshow: true,
			}
		},
		components: {
			'zk-dialog': dialog
		},
		mounted() {
			this.updateTableList()
			this.$bus.$on('updateTable', () => {
				this.updateTableList()
			})
		},
		methods: {
			// 更新表格
			updateTableList(params = {
				count: this.dateCount,
				page: this.dataPage,
				class: this.classes
			}) {
				this.loading = true
				if (this.seachValue || this.seachBlur) {
					this.seachButton()
					return
				}
				console.log(params)
				getstulist(params).then(res => {
					if (res.data.state) {
						this.loading = false
						this.stulist = res.data.data
						this.total = res.data.total
						this.currentPage = 1
						this.loading = false
						this.pageBug()
						console.log(this.total)
						console.log(res.data)
					} else {
						console.log('qqqq')
						this.currentPage = 1
					}
				})
			},
			// 查询
			remoteMethod(query) {
				console.log(this.classes)
				const params = {
					key: query
				}
				console.log(params)
				this.seachBlur = query
				seachStu(params).then(res => {
						console.log(res.data.data)
						if (res.data && res.data.state) {
							this.seachList = res.data.data
						} else {
							this.$message.error('查询失败')
						}
					})
					.catch(err => {
						this.$message.error('查询错误')
						console.log(err)
					})
			},
			// 增加学生信息
			addStu() {
				this.$bus.$emit('showdialog')
			},
			// 删除学员信息
			delStu(row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delStu(row.sId).then(res => {
							console.log(res)
							if (res.data && res.data.state) {
								this.$message.success('删除成功')
								if (this.seachValue || this.seachBlur) {
									this.seachButton()
								} else {
									this.updateTableList()
								}
							} else {
								this.$message.warning('传入参数有误')
							}
						})
						.catch(err => {
							this.$message.error(err)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 编辑学员信息
			editStu(row) {
				console.log(row)
				this.$bus.$emit('editEvent', row.sId)
			},
			// 点击搜索关键字
			changeSeachText(query) {
				this.dataPage = 1
				this.classes = ''
				this.loading = true
				console.log(query)
				const params = {
					key: query,
					count: this.dateCount,
					page: this.dataPage
				}
				console.log(params)
				seachStu(params).then(res => {
						// console.log(res.data.data)
						if (res.data && res.data.state) {
							this.stulist = res.data.data
							console.log(res.data)
							this.pageBug()
							this.total = res.data.total
						} else {
							this.$message.error('查询失败')
						}
						this.loading = false
					})
					.catch(err => {
						this.$message.error('查询错误')
						console.log(err)
					})
			},
			// 搜索框失去焦点保持数据
			searchBlur() {
				this.seachValue = this.seachBlur
			},
			// 搜索按钮
			seachButton() {
				this.loading = true
				this.dataPage = 1
				this.classes = ''
				const params = {
					key: this.seachValue,
					count: this.dateCount,
					page: this.dataPage
				}
				seachStu(params).then(res => {
						// console.log(res.data.data)
						if (res.data && res.data.state) {
							this.stulist = res.data.data
							this.total = res.data.total
							this.pageBug()
							console.log(res.data)
							console.log(this.total)
						} else {
							this.$message.error('搜索失败')
						}
						this.loading = false
					})
					.catch(err => {
						this.$message.error('搜索错误')
						console.log(err)
					})
			},
			// 清空搜索内容是清除数据,防止出现分页bug
			clearClass() {
				console.log('clear')
				this.seachBlur = ''
				this.seachValue = ''
				// this.classes = ''
			},
			// 获取班级
			getClass(flag) {
				if (!flag) {
					return
				}
				// this.dataPage = 1
				getClasses().then(res => {
					this.classOptions = res.data.data
				})
			},
			// 选择班级
			changeClass(query) {
				this.dataPage = 1
				this.seachValue = ''
				this.seachBlur = ''
				if (query === 'all') {
					var params = {
						count: this.dateCount
					}
					this.classes = ''
				} else {
					var params = {
						page: this.dataPage,
						class: query,
						count: this.dateCount
					}
					this.classes = query
				}
				console.log(params)
				this.updateTableList(params)
			},
			// 导出excel
			exportExcel() {
				let titleList = [{
					title: '姓名',
					key: 'name'
				}, {
					title: '班级',
					key: 'age'
				}, {
					title: '项目',
					key: 'address'
				}, {
					title: '注册时间',
					key: 'address'
				}, {
					title: '城市',
					key: 'city'
				}, {
					title: '学历',
					key: 'degree'
				}, {
					title: '对自己的评价',
					key: 'description'
				}]
				const dataSource = this.stulist
				exportExcels(titleList, dataSource, '学员信息表')
			},
			// 改变分页
			changePage(page) {
				// console.log(page)
				console.log(this.seachValue)
				console.log(this.classes)
				console.log(this.seachValue)
				this.dataPage = page
				if (this.classes) {
					console.log(1)
					this.seachBlur = ''
					this.seachValue = ''
					var params = {
						page: this.dataPage,
						count: this.dateCount,
						class: this.classes
					}
					console.log('class为true')
				} else if (this.seachValue) {
					console.log(2)
					let params = {
						page: this.dataPage,
						count: this.dateCount,
						key: this.seachValue
					}
					console.log(params)
					seachStu(params).then(res => {
							// console.log(res.data.data)
							if (res.data && res.data.state) {
								this.stulist = res.data.data
								this.total = res.data.total
								console.log(res.data)
							} else {
								this.$message.error('搜索失败')
							}
						})
						.catch(err => {
							this.$message.error('搜索错误')
							console.log(err)
						})
					return
				} else {
					console.log(3)
					var params = {
						page: this.dataPage,
						count: this.dateCount,
					}
				}
				console.log(4)
				this.updateTableList(params)
				console.log(this.total)
			},
			// 解决分页跳级bug
			pageBug() {
				console.log('================')
				console.log(this.dataPage)
				console.log(this.seachBlur)
				console.log(this.seachValue)
				console.log(this.classes)
				if (this.seachBlur || this.seachValue || this.classes && this.dataPage === 1) {
					console.log('触发')
					this.pageshow = false; //让分页隐藏
					this.$nextTick(() => { //重新渲染分页
						this.pageshow = true;
					})
				}
			}
		}
	}
</script>
<style>
	.product {
		text-align: left;
	}

	.seachStu {
		margin-top: 35px;
	}

	.seachStu .el-select {
		width: 320px;
		margin-right: 6px;
	}

	.selectClass {
		margin-top: 35px;
	}

	.selectClass .el-input {
		margin-left: 10px;
	}

	.el-pagination {
		margin-top: 20px;
	}

	.tableList .el-button {
		width: 65px;
		height: 25px;
		padding: 0;
	}

	.export-excel {
		padding: 30px;
		overflow: hidden;
	}

	.export-excel .el-button {
		float: right;
		padding: 8px;
		font-size: 16px;
	}

	.export-excel .el-button .iconfont {
		color: green;
		margin-right: 5px;
	}
</style>
