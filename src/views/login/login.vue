<template>
	<div class="login-container">
		<h2 class="caption">登陆</h2>
		<div class="login-core">
			<van-form @submit="onSubmit">
				<van-field
					v-model="username"
					name="username"
					label="用户名"
					placeholder="用户名"
					:rules="[{ required: true, message: '请填写用户名' }]"
				/>
				<van-field
					v-model="password"
					type="password"
					name="password"
					label="密码"
					placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]"
				/>
				<div style="margin: 16px;">
					<van-button round block type="info" class="btn-custom" native-type="submit">提交</van-button>
				</div>
			</van-form>
		</div>
		<p class="copyright">-欢迎使用后勤智能管理系统-</p>
	</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	name: 'login',
	data () {
		return {
			activeName: 'first',
			username: '',
			password: '',
		}
	},
	methods: {
		...mapActions(['A_LOGIN']),
		onSubmit(formObj) {
			this.A_LOGIN(formObj)
		}
	}
}

</script>

<style lang="scss" scoped>
	.login-container {
		border-top: 1px solid transparent;
		background: url('../../assets/images/login/login-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		.caption {
			font-size: 16px;
			color: white;
			line-height: 3;
			margin-top: 2rem;
			padding-left: 15px;
		}
		.login-core {
			background-color: white;
			margin: 0 15px;
			border-radius: 15px;
			padding: 70px 15px 15px 15px;
		}
		.btn-custom {
			width: 100%;
			background: url('../../assets/images/login/login-btn-bg.png') no-repeat;
			border: none;
			font-size: 1.2rem;
		}
		.copyright {
			color: white;
			text-align: center;
			line-height: 5;
		}
	}
</style>
