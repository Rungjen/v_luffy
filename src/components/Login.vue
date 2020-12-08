<template>
	<div>
		<a-button type="primary" @click="loginClick">
			登录
		</a-button>
		<a-modal
				:visible="showLogin"
				:centered=true
				:footer="null"
				@cancel="cancel">
			<a-menu
					v-model="current"
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
					v-bind="layout">
				<a-form-model-item has-feedback prop="phone">
					<a-input v-model="passwordForm.phone" placeholder="手机号">
						<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-model-item>
				<a-form-model-item has-feedback prop="password">
					<a-input v-model="passwordForm.password" type='password' placeholder="请输入密码">
						<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 16, offset: 4 }">
					<a-button type="primary" @click="submitPasswordForm(passwordForm)" :block=true>
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
				<a-form-model-item has-feedback prop="phone">
					<a-input v-model="smsForm.phone" placeholder="仅支持已注册手机号">
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
			let validatePhone = (rule, value, callback) => {
				let flag = value.match(/^1[3-9]\d{9}$/);
				if (!flag) {
					callback(new Error('手机格式不正确'))
				} else {
					callback()
				}
			};
			
			return {
				showLogin: false,
				current: ['passwordLogin'],
				passwordForm: {phone: '', password: ''},
				passwordRules: {
					phone: [
						{required: true, message: '手机号不能为空', trigger: 'blur'},
						{validator: validatePhone, trigger: 'blur'},
					],
					password: [
						{required: true, message: '密码不能为空', trigger: 'blur'},
						{min: 6, message: '密码最小长度为6', trigger: 'blur'},
					]
				},
				smsForm: {phone: '', captcha: ''},
				smsRules: {
					phone: [
						{required: true, message: '手机号不能为空', trigger: 'blur'},
						{validator: validatePhone, trigger: 'blur'},
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
			}
		},
		methods: {
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
				
				// setTimeout(() => {
				// 	this.captchaDisplay = false
				// }, 5000)
			},
			loginClick() {
				this.showLogin = true
			},
			cancel() {
				this.showLogin = false
			},
			select(value) {
				this.menuKey = value.key
			},
			submitPasswordForm(passwordForm) {
				this.$refs.passwordRef.validate(valid => {
					if (valid) {
						console.log(passwordForm)
					} else {
						return false
					}
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

</style>