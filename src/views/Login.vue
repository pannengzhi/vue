<template>
	<el-card class="login-container">
		<el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
			<h2 class="login-title">系统登录</h2>
			<el-form-item prop="username">
				<el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" clearable><i slot="prefix" class="fa fa-user fa-lg icon-blue"></i></el-input>
			</el-form-item>
			<el-form-item prop="password" style="margin-bottom: 15px">
				<el-input type="password" v-model="loginForm.password" @keyup.enter.native="handleLogin" auto-complete="off" placeholder="密码">
					<i slot="prefix" class="fa fa-lock fa-lg icon-blue"></i>
				</el-input>
			</el-form-item>
			<el-checkbox v-model="loginForm.remember" label-position="left">记住密码</el-checkbox>
			<!-- <router-link class="register" to="">注册</router-link> -->
			<el-form-item style="margin-top: 15px"><el-button type="primary" style="width: 100%" :loading="loading" @click.prevent="handleLogin">登录</el-button></el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import { setToken } from 'utils/auth'; // 验权
import Crypto from 'utils/crypto'; // 密码加密解密
export default {
	name: 'login',
	data() {
		return {
			loading: false,
			loginForm: {
				username: 'admin',
				password: '123456',
				remember: false
			},
			loginRules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			},
			redirect: undefined
		};
	},
	created() {
		if (localStorage.getItem('wbUser')) {
			this.loginForm.remember = true;
			const user = JSON.parse(Crypto.decrypt(unescape(localStorage.getItem('wbUser'))));
			this.loginForm.username = user.username;
			this.loginForm.password = Crypto.decrypt(unescape(user.password));
		}
	},
	methods: {
		handleLogin() {
			this.loading = true;
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					const params = { username: this.loginForm.username, password: this.$md5(this.loginForm.password), remember: this.loginForm.remember };
					this.axios.post('mock/login', params).then(
						data => {
							if (data.code === 1) {
								setToken(data.data);
								this.$router.push({ path: this.redirect || '/' });
								if (this.loginForm.remember) {
									params.password = escape(Crypto.encrypt(this.loginForm.password));
									localStorage.setItem('wbUser', escape(Crypto.encrypt(JSON.stringify(params))));
								} else {
									localStorage.removeItem('wbUser');
								}
							}else{
								this.$message({ showClose: true, message: data.msg, type: 'error' });	
							}
							this.loading = false;
						},
						error => {
							this.$message({ showClose: true, message: '登录失败', type: 'error' });
							this.loading = false;
						}
					);
				} else {
					this.loading = false;
					return false;
				}
			});
		}
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true
		}
	}
};
</script>

<style lang="scss" scoped>
.login-container {
	position: absolute;
	left: 0;
	right: 0;
	width: 360px;
	margin: 140px auto;
	border-top: 10px solid #409eff;
	.login-title {
		text-align: center;
	}
	.icon-blue {
		margin-left: 5px;
		color: #409eff;
	}
	.register {
		float: right;
		color: #409eff;
		font-size: 15px;
		cursor: pointer;
	}
}
</style>
