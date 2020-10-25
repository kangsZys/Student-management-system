<template>
	<!-- dialog窗口 用于添加和编辑的弹窗-->
	<el-dialog :title="dialogInfo.title" :visible.sync="dialogVisible" align="center">
		<el-form :model="stuForm" :rules="stuRules" ref="addStuRuleForm" v-loading="loading" element-loading-text="拼命加载中(╥╯^╰╥)"
		 element-loading-spinner="el-icon-loading">
			<el-form-item label="头像">
				<el-upload class="uploadAvatar" ref="uploadAvatar" action="http://chst.vip/students/uploadStuAvatar" list-type="picture-card"
				 :on-success="uploadSuccess" :on-remove="removeAvatar" :limit="1" name="headimgurl" :multiple="false">
					<!-- name代表上传字段名字 -->
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="stuForm.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="项目地址" prop="productUrl">
				<el-input v-model="stuForm.productUrl" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="班级" prop="class">
				<el-input v-model="stuForm.class" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model="stuForm.age" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model="stuForm.city" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="学历" prop="degree">
				<el-input v-model="stuForm.degree" autocomplete="off"></el-input>
			</el-form-item>
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input v-model="stuForm.description" autocomplete="off"></el-input>
			</el-form-item>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="confirmClick('addStuRuleForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	// import api from '@/api'
	const api = require('@/api/index.js')
	// !!! 此处引入必须用const ... require引入，否则无法直接通过api.去调用方法，api为undefined
	// console.log(api)

	// import {
	// 	addstu,
	// 	updateStu,
	// 	getstulist
	// } from "@/api/index.js"
	export default {
		data() {
			return {
				dialogInfo: {
					title: "增加学员信息",
					requestName: "",
					editSuccessMsg: "增加成功",
					editerrorMsg: "增加失败"
				},
				loading: false,
				showAvatar: true,
				dialogVisible: false,
				stuRules: {
					name: [{
						required: true,
						message: '请输入名字',
						trigger: 'blur'
					}],
					class: [{
						required: true,
						message: '请输入班级',
						trigger: 'blur'
					}],
					degree: [{
						required: true,
						message: '请输入学历',
						trigger: 'blur'
					}],
					city: [{
						required: true,
						message: '请输入城市',
						trigger: 'blur'
					}],
					productUrl: [{
						required: true,
						message: '请输入项目地址',
						trigger: 'blur'
					}],
					age: [{
						required: true,
						message: '请输入年龄',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入描述',
						trigger: 'blur'
					}]
				},
				stuForm: {
					name: '',
					productUrl: '',
					headimgurl: '',
					class: '',
					age: '',
					city: '',
					degree: '',
					description: ''
				}
			}
		},
		mounted() {
			this.$bus.$on('showdialog', () => {
				Object.keys(this.stuForm).forEach(item => {
					this.stuForm[item] = ""
				})
				// this.$refs.uploadAvatar.$children[1].$el.children[0].style.display = "inline-block"
				// this.$refs.uploadAvatar.$children[1].$el.style.background = ``
				// 修改标题
				this.dialogInfo.title = '添加学员信息'
				// 修改请求函数
				this.dialogInfo.requestName = 'addstu'
				this.dialogInfo.editSuccessMsg = '内容添加成功'
				this.dialogInfo.editerrorMsg = '内容增加失败，缺少字段'
				// 打开dialog框
				this.dialogVisible = true
			})
			this.$bus.$on('editEvent', (sId) => {
				// console.log(this.stuForm.headimgurl)
				this.dialogVisible = true
				this.loading = true
				this.dialogInfo.title = '编辑学员信息'
				this.dialogInfo.requestName = 'updateStu'
				this.dialogInfo.editSuccessMsg = '内容修改成功'
				this.dialogInfo.editerrorMsg = '未检测到需要修改的内容'
				// 信息回显
				api.getstulist().then(res => {
					this.loading = false
					console.log(res.data.data)
					let userInfo = res.data.data.filter(item => {
						return item.sId === sId
					})
					this.stuForm = userInfo[0]
				})
				// .then(() => {
				// 	if (this.stuForm.headimgurl) {
				// 		console.log(this.$refs.uploadAvatar)
				// 		this.$refs.uploadAvatar.$children[1].$el.children[0].style.display = "none"
				// 		this.$refs.uploadAvatar.$children[1].$el.style.background = `url(${this.stuForm.headimgurl}) 0/cover`
				// 	} else {
				// 		// console.log(this.$refs.uploadAvatar)
				// 		this.$refs.uploadAvatar.$children[1].$el.children[0].style.display = "inline-block"
				// 		this.$refs.uploadAvatar.$children[1].$el.style.background = ``
				// 	}
				// })
			})
		},
		methods: {
			uploadSuccess(r) {
				// 上传成功 给stuForm添加一条 headimgurl的属性
				this.stuForm.headimgurl = r.headimgurl
				console.log(r)
			},
			removeAvatar(r) {
				this.stuForm.headimgurl = ''
			},
			confirmClick(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.stuForm)
						// 本地表单校验通 将表单信息提交到后台
						// 关闭 dialog
						this.dialogVisible = false
						//增加或者编辑

						// 测试用添加
						// for (let i = 0; i < 10; i++) {
						// 	this.stuForm = {
						// 		name: `测试专用${i}`,
						// 		productUrl: `测试专用${i}`,
						// 		headimgurl: `http://49.235.165.18/avatar/headimgurl-1603525695466.jpg`,
						// 		class: `测试专用`,
						// 		age: `测试专用${i}`,
						// 		city: `测试专用${i}`,
						// 		degree: `测试专用${i}`,
						// 		description: `测试专用${i}`
						// 	}
						// 	api[this.dialogInfo.requestName](this.stuForm)
						// 		.then(res => {
						// 			if (res.data && res.data.state) {
						// 				console.log(this.$refs)
						// 			} else {
						// 				this.$message.warning(this.dialogInfo.editerrorMsg)
						// 			}
						// 		}).catch(err => {
						// 			this.$message.error('网络错误')
						// 		})
						// }

						// 正式用添加
						api[this.dialogInfo.requestName](this.stuForm)
							.then(res => {
								console.log(res)
								if (res.data && res.data.state) {
									this.$message.success(this.dialogInfo.editSuccessMsg)
									this.$bus.$emit('updateTable')
									Object.keys(this.stuForm).forEach(item => {
										this.stuForm[item] = ""
									})
									console.log(this.$refs)
									this.$refs['uploadAvatar'].clearFiles()
								} else {
									this.$message.warning(this.dialogInfo.editerrorMsg)
								}
							}).catch(err => {
								this.$message.error('网络错误')
							})

					} else {
						this.$message.error('请将内容填写完整')
					}
				})
			}
		}
	}
</script>
<style>
	.uploadAvatar {
		text-align: left;
	}

	.el-upload-list__item.is-success,
	.el-upload--picture-card {
		width: 100px !important;
		height: 100px !important;
		line-height: 100px !important;
	}

	.el-dialog__header {
		padding: 0 !important;
		line-height: 60px;
	}
</style>
