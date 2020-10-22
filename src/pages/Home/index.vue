<template>
	<div class="home">
		<el-container>
			<el-aside width="200px">
				<h1 class="logo"></h1>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" text-color="#4e5bf8"
				 :router="true" active-text-color="rgb(228, 120, 51)">
					<subMenu :sideMenu="menuList"></subMenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<el-row type="flex" class="row-bg" justify="space-between">
						<el-col :span="6">
							<div class="grid-content bg-purple">
								<i class="el-icon-s-fold" @click="change" ref="change"></i>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple-light">
								千锋管理系统
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple">
								<template>
									<el-row class="demo-avatar demo-basic">
										<el-col :span="12">
											<div class="demo-basic--circle">
												<div class="block">
													<el-avatar :size="35" fit="fit" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
													<span>欢迎您：</span>
													<span class="nickname">{{ userInfo.nickname }}</span>
													<span class="exit" @click="exit">退出</span>
												</div>
											</div>
										</el-col>
									</el-row>
								</template>
							</div>
						</el-col>
					</el-row>
				</el-header>
				<el-main>
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item v-for="crumb in crumbs" :key="crumb.name" :to="{ path: crumb.path }">{{ crumb.meta.name }}</el-breadcrumb-item>
					</el-breadcrumb>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	import subMenu from "../../components/subMenu";
	// import {getLoginLog} from "@/api/index.js";
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				isCollapse: false
			};
		},
		computed: {
			...mapState(["userInfo", "menuList", "crumbs"])
		},
		mounted() {
			// console.log(this.$route.path);
			// getLoginLog().then(res => {
			// 	console.log(res);
			// });
		},
		methods: {
			change() {
				if (this.$refs.change.className === "el-icon-s-fold") {
					this.$refs.change.className = "el-icon-s-unfold";
				} else {
					this.$refs.change.className = "el-icon-s-fold";
				}
				this.isCollapse = !this.isCollapse;
			},
			exit() {
				localStorage.removeItem("token");
				localStorage.removeItem("userInfo");
				this.$router.push("/login");
				window.location.reload();
				this.$message.success("退出成功");
			}
		},
		components: {
			subMenu
		}
	};
</script>
<style scoped>
	.el-header,
	.el-footer {
		background-color: #b3c0d1;
		color: #333;
		line-height: 60px;
	}

	.el-header {
		white-space: nowrap;
	}

	.iconfont {
		color: #4e5bf8;
	}

	.el-aside h1 {
		height: 60px;
		background: linear-gradient(135deg, #4c67ff, #5635df);
		background-image: url(../../assets/images/logo.be8bbddf.png);
		background-size: 80%;
		background-repeat: no-repeat;
		background-position: 50%;
	}

	.iconfont {
		margin-right: 10px;
		font-size: 20px;
	}

	.el-header {
		background: linear-gradient(135deg, #4c67ff, #5635df);
		color: #fff;
	}

	.el-aside {
		background-color: #d3dce6;
		color: #333;
		line-height: 200px;
	}

	.el-aside {
		background: linear-gradient(135deg, #5635df, #4c67ff);
	}

	.el-main {
		background-color: #fff;
		color: #333;
		box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.29);
		text-align: center;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 500px;
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: transparent;
	}

	.bg-purple {
		background: transparent;
	}

	.bg-purple-light {
		background: transparent;
		text-align: center;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		background-color: transparent;
	}

	.el-icon-s-unfold,
	.el-icon-s-fold {
		font: 38px/60px "";
		cursor: pointer;
		color: #fff;
	}

	.el-avatar--circle {
		vertical-align: middle;
		margin-right: 10px;
	}

	.nickname {
		color: #fff;
		font-weight: 700;
		cursor: pointer;
		text-decoration: underline;
		margin-right: 10px;
	}

	.exit {
		color: #ff69b4;
		cursor: pointer;
	}
</style>
