<template>
	<div class="product">
		<template>
			<!-- 搜索姓名 -->
			<div class="seachStu">
				<el-select v-model="value" multiple clearable filterable remote reserve-keyword placeholder="请输入姓名,如果不更新,点击右侧搜索按钮"
				 :remote-method="remoteMethod" :loading="loading">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-search" plain></el-button>
				<el-button type="primary" @click="addStu">添加项目</el-button>
			</div>

			<!-- 搜索班级 -->
			<div class="selectClass">
				<span>选择班级:</span>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<!-- 表格 -->
			<div class="tableList">
				<el-table :data="stulist" style="width: 100%" border>
					<el-table-column label="头像" width="180" align="center">
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
					<el-table-column label="操作" align="center">
						<template scope={row}>
							<el-button type="primary" icon="el-icon-view">查看</el-button>
							<el-button type="primary" icon="el-icon-edit">编辑</el-button>
							<el-button type="danger" icon="el-icon-delete" @click="delStu(row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination background layout="prev, pager, next" :total="2" align="center">
				</el-pagination>
			</div>
		</template>
		<zk-dialog></zk-dialog>
	</div>
</template>
</div>
</template>
<script>
	import dialog from "@/components/dialog.vue"
	import {
		getstulist,
		addstu,
		delStu
	} from "@/api/index.js";
	export default {
		data() {
			return {
				stulist: [],
				options: [],
				value: [],
				list: [],
				loading: false,
				states: ["Alabama", "Alaska", "Arizona",
					"Arkansas", "California", "Colorado",
					"Connecticut", "Delaware", "Florida",
					"Georgia", "Hawaii", "Idaho", "Illinois",
					"Indiana", "Iowa", "Kansas", "Kentucky",
					"Louisiana", "Maine", "Maryland",
					"Massachusetts", "Michigan", "Minnesota",
					"Mississippi", "Missouri", "Montana",
					"Nebraska", "Nevada", "New Hampshire",
					"New Jersey", "New Mexico", "New York",
					"North Carolina", "North Dakota", "Ohio",
					"Oklahoma", "Oregon", "Pennsylvania",
					"Rhode Island", "South Carolina",
					"South Dakota", "Tennessee", "Texas",
					"Utah", "Vermont", "Virginia",
					"Washington", "West Virginia", "Wisconsin",
					"Wyoming"
				],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		components: {
			'zk-dialog': dialog
		},
		computed: {
			// ...mapState(['dialogVisible','stuForm'])
		},
		mounted() {
			this.updateTableList()
			this.list = this.states.map(item => {
				return {
					value: `value:${item}`,
					label: `label:${item}`
				};
			});
			this.$bus.$on('updateTable', () => {
				this.updateTableList()
			})
		},
		methods: {
			// 更新表格
			updateTableList() {
				console.log(this.loading)
				this.loading = true
				getstulist().then(res => {
					console.log(res)
					if (res.data.state) {
						this.loading = false
						this.stulist = res.data.data
						console.log(res.data.data)
					}
				})
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.options = this.list.filter(item => {
							return item.label.toLowerCase()
								.indexOf(query.toLowerCase()) > -1;
						});
					}, 200);
				} else {
					this.options = [];
				}
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
								this.updateTableList()
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
		margin: 35px 0 10px;
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
</style>
