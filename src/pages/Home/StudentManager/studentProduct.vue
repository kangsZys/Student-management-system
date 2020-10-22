<template>
	<div class="product">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="formInline.user" placeholder="请输入姓名,如果不更新,点击右侧搜索按钮"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-select v-model="formInline.region">
			<el-option label="区域一" value="shanghai"></el-option>
			<el-option label="区域二" value="beijing"></el-option>
		</el-select>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					user: "",
					region: ""
				}
			};
		},
		methods: {
			onSubmit() {
				console.log("submit!");
			}
		}
	};
</script>
