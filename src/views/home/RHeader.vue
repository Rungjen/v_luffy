<template>
	<div>
		<div class="header">
			<div class="logo">
				<img src="../../assets/image/logo.png" alt="">
			</div>
			<a-menu mode="horizontal" class="menu">
				<a-menu-item key="free-course">
					免费课
				</a-menu-item>
				<a-menu-item key="actual-course">
					实战课
				</a-menu-item>
				<a-menu-item key="light-course">
					轻课
				</a-menu-item>
				<a-menu-item key="employment-course">
					就业班
				</a-menu-item>
			</a-menu>
			<div class="login-register">
				<login class="login" :showLogin="showLogin"></login>
			</div>
		</div>
	</div>

</template>

<script>
	import Login from "../../components/Login";
	
	export default {
		name: "RHeader",
		data() {
			return {
				showLogin: false
			}
		},
		components: {
			Login,
		},
		methods: {
			loginClick() {
				this.showLogin = true
			}
		}
	}
</script>

<style scoped>
	.header {
		display: flex;
		width: 1200px;
		height: 59px;
		margin: 20px auto 0;
		align-items: center;
	}
	
	.logo {
		flex: 10%;
	}
	
	.logo img {
		width: 150px;
		height: 40px;
	}
	
	.menu {
		flex: 40%;
		margin-left: 20px;
		font-size: 16px;
		margin-top: 10px;
	}
	
	.login-register {
		flex: 30%;
	}
	
	.ant-menu-horizontal {
		border: none;
	}
	
	.banner {
		margin-top: 10px;
	}

</style>