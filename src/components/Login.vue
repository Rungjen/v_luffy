<template>
	<div>
		<a-button type="primary" @click="loginClick">
			{{username}}
		</a-button>
		<a-divider type="vertical" v-show="username!=='登录'" class="divider"/>
		<a-button type="primary" v-show="username!=='登录'" @click="signOut">
			注销
		</a-button>
		<a-modal
				:visible="showLogin"
				:centered=true
				:footer="null"
				@cancel="cancel">
			<a-menu
					:defaultSelectedKeys=defaultSelectedKeysList
					mode="horizontal"
					@select="select"
					class="login-menu">
				<a-menu-item key="passwordLogin" class="passwordLogin">
					密码登录
				</a-menu-item>
				<a-menu-item key="smsLogin" class="smsLogin">
					短信登录
				</a-menu-item>
			</a-menu>
			
			<a-form-model
					v-if="menuKey==='passwordLogin'"
					ref="passwordRef"
					:model="passwordForm"
					:rules="passwordRules"
					v-bind="layout"
					@submit="submit($event)">
				<a-form-model-item has-feedback prop="login_name">
					<a-input v-model="passwordForm.login_name" placeholder="手机号/邮箱/用户名">
						<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-model-item>
				<a-form-model-item has-feedback prop="password">
					<a-input v-model="passwordForm.password" type='password' placeholder="请输入密码">
						<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 16, offset: 4 }">
					<a-button type="primary" @click="validatePasswordForm(passwordForm)" :block=true>
						登录
					</a-button>
				</a-form-model-item>
			</a-form-model>
			
			<a-form-model
					v-else-if="menuKey==='smsLogin'"
					ref="smsRef"
					:model="smsForm"
					:rules="smsRules"
					v-bind="layout">
				<a-form-model-item has-feedback prop="mobile">
					<a-input v-model="smsForm.mobile" placeholder="手机号">
						<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-model-item>
				<a-form-model-item has-feedback prop="captcha">
					<a-input v-model="smsForm.captcha" placeholder="验证码">
						<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
						<a-button type="link" slot="suffix" @click="captchaClick" :disabled="captchaDisplay">
							{{captchaText}}
						</a-button>
					</a-input>
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 16, offset: 4 }">
					<a-button type="primary" @click="submitSmsForm(smsForm)" :block=true>
						登录
					</a-button>
				</a-form-model-item>
			</a-form-model>
			
			<div class="other-login">
				<div class="wx-login">
					<img src="../assets/image/wx_logo.png" alt="">
					<span>微信登录</span>
				</div>
				<div class="wx-login">
					<img src="../assets/image/qq_logo.png" alt="">
					<span>QQ登录</span>
				</div>
			</div>
		
		</a-modal>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			let validMobile = (rule, value, callback) => {
				let flag = value.match(/^1[3-9]\d{9}$/);
				if (!flag) {
					callback(new Error('手机格式不正确'))
				} else {
					callback()
				}
			};
			let validUser = (rule, value, callback) => {
				this.$http.validUser({login_name: value}).then(res => {
					callback()
				}).catch(err => {
					callback(new Error(err.response.data.result))
				})
			};
			let validPassword = (rule, value, callback) => {
				if (this.backendError) {
					callback(new Error(this.backendError))
				} else {
					callback()
				}
			};
			return {
				showLogin: false,
				defaultSelectedKeysList: ['passwordLogin'],
				passwordForm: {login_name: '', password: ''},
				passwordRules: {
					login_name: [
						{required: true, message: '登录名不能为空', trigger: 'blur'},
						{validator: validUser, trigger: 'blur'},
					],
					password: [
						{required: true, message: '密码不能为空', trigger: 'blur'},
						{min: 6, message: '密码最小长度为6', trigger: 'blur'},
						{validator: validPassword, trigger: 'blur'}
					]
				},
				smsForm: {mobile: '', captcha: ''},
				smsRules: {
					mobile: [
						{required: true, message: '手机号不能为空', trigger: 'blur'},
						{validator: validMobile, trigger: 'blur'},
					],
					captcha: [
						{required: true, message: '验证码不能为空', trigger: 'blur'},
						{len: 4, message: '验证码长度为4', trigger: 'blur'},
					]
				},
				layout: {
					wrapperCol: {offset: 4, span: 16},
				},
				menuKey: 'passwordLogin',
				captchaText: '获取验证码',
				captchaDisplay: false,
				username: '登录',
				backendError: ''
			}
		},
		watch: {
			backendError(value) {
			}
		},
		methods: {
			loginClick() {
				this.showLogin = true
			},
			captchaClick() {
				this.captchaDisplay = true;
				let total = 5;
				let interval = setInterval(() => {
					total--;
					this.captchaText = '还剩 ' + total + ' s';
					if (total <= 0) {
						clearInterval(interval);
						this.captchaDisplay = false;
						this.captchaText = '获取验证码'
					}
				}, 1000);
			},
			cancel() {
				this.showLogin = false
			},
			select(value) {
				this.menuKey = value.key;
				// 对整个表单进行重置，并移除校验结果
				if (this.$refs.passwordRef) {
					this.$refs.passwordRef.resetFields()
				} else if (this.$refs.smsRef) {
					this.$refs.smsRef.resetFields()
				}
			},
			validatePasswordForm(passwordForm) {
				this.backendError = false;
				this.$refs.passwordRef.validate((valid) => {
					console.log(valid);
					if (valid) {
						this.submitPasswordForm(passwordForm)
					} else {
						return false
					}
				})
			},
			submitPasswordForm(passwordForm) {
				this.$http.passwordLogin(passwordForm).then(res => {
					this.showLogin = false;
					this.username = res.data.username + ' 您好！';
					this.$cookie.set('token', res.data.token, '7d');
					this.$cookie.set('username', res.data.username, '7d')
				}).catch(error => {
					// console.log(error.response.data.result.non_field_errors[0]);
					// this.$store.commit('setBackendError', error.response.data.result.non_field_errors[0])
					this.backendError = error.response.data.result.non_field_errors[0]
					// 重新验证password字段
					this.$refs.passwordRef.validateField('password')
				})
			},
			submitSmsForm(smsForm) {
				this.$refs.smsRef.validate(valid => {
					if (valid) {
						console.log(smsForm)
					} else {
						return false
					}
				})
			},
			signOut() {
				this.$cookie.delete('token');
				this.$cookie.delete('username');
				this.username = '登录'
			},
		},
		created() {
			let username = this.$cookie.get('username');
			if (username) {
				this.username = this.$cookie.get('username') + ' 您好！';
			}
		}
	}
</script>

<style scoped>
	.login-menu {
		display: flex;
	}
	
	.ant-menu-item {
		flex: 1;
		padding-left: 95px;
	}
	
	.ant-form {
		margin-top: 40px;
	}
	
	.other-login {
		display: flex;
	}
	
	.other-login img {
		width: 30px;
		height: 30px;
	}
	
	.wx-login {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.ant-divider {
		background: silver;
		width: 2px;
		height: 20px;
	}
</style>