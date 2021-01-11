<template>
	<div class="editpwd-container">
		<ckVanNavBar 
			title="修改密码"
			@click-left="onClickLeft"
		/>
		<van-form @submit="onSubmit" :label-width="100" class="input-text-right">
			<van-field
				v-model="oldPassword"
				name="oldPassword"
				label="原密码"
				placeholder="原密码"
				disabled
			/>
			<van-field
				v-model="newPassword"
				name="newPassword"
				type="password"
				label="新密码"
				placeholder="密码不少于6位"
				required
				:rules="[{ required: true, message: '请填写新密码', trigger: 'onChange' }]"
			/>
			<van-field
				v-model="rePassword"
				type="password"
				name="rePassword"
				label="再次确认新密码"
				placeholder="密码不少于6位"
				required
				:rules="[{ required: true, message: '请再次确认新密码', trigger: 'onChange' }]"
			/>
			<div class="fix-bottom">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { ACCOUNT } from '@/router/routePath'

export default {
	name: 'EditpwdMiddlePage',
	data () {
		return {
			oldPassword: '',
			newPassword: '',
			rePassword: ''
		}
	},
	created() {

	},
	methods: {
		onSubmit(formValues) {
			if (formValues.newPassword.length < 6) {
				this.handleNotify('danger', '密码长度不能小于6位')
				return
			}
			if (formValues.newPassword !== formValues.rePassword) {
				this.handleNotify('danger', '两次密码不一致')
				return
			}
			console.log('submit', formValues)
		},
		onClickLeft () {
			this.$router.push({
				path: ACCOUNT
			})
		},
		handleNotify (type, msg) {
			this.$notify({
				message: msg || '错误',
				type: type || 'danger',
				duration: 1000
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.editpwd-container {
		/deep/ .van-form {
			height: calc(100vh - 40px);
			position: relative;
		}
		/deep/ .van-field__control {
			text-align: right;
		}
		.fix-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 20px;
		}
	}
</style>
