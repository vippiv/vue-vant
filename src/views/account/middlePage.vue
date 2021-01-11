<template>
	<div class="account-container">
		<ckVanNavBar 
			title="个人中心"
			righText="改密"
			@click-left="onClickLeft"
			@click-right="onClickRight"
		>
			<van-icon :name="lockWhite" size="18" slot="right" />
		</ckVanNavBar>
		<van-form @submit="onSubmit" class="input-text-right">
			<van-field
				v-model="worknum"
				name="worknum"
				label="工号"
				placeholder="工号"
				disabled
			/>
			<van-field
				v-model="username"
				name="username"
				label="姓名"
				required
				placeholder="姓名"
				:rules="[{ required: true, message: '请填写姓名' }]"
			/>
			<van-field
				readonly
				clickable
				name="gender"
				required
				:value="gender"
				label="性别"
				placeholder="点击选择性别"
				@click="genderShowPicker = true"
				:rules="[{ required: true, message: '请选择性别', trigger: 'onChange' }]"
			/>
			<van-popup v-model="genderShowPicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="genderColumns"
					@confirm="onGenderConfirm"
					@cancel="genderShowPicker = false"
				/>
			</van-popup>
			<van-field
				readonly
				clickable
				name="department"
				:value="department"
				label="科室"
				required
				placeholder="点击选择科室"
				@click="dptShowPicker = true"
				:rules="[{ required: true, message: '请选择科室', trigger: 'onChange' }]"
			/>
			<van-popup v-model="dptShowPicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="dptColumns"
					@confirm="onDptConfirm"
					@cancel="dptShowPicker = false"
				/>
			</van-popup>
			<!-- TODO 手机号码需要验证 -->
			<van-field
				v-model="phone"
				type="phone"
				name="phone"
				required
				label="联系方式"
				placeholder="联系方式"
				:rules="[{ validator: validatorPhone, message: '请填写正确的联系方式' }]"
			/>
			<div class="fix-bottom">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { MAINMENU, EDITPWD } from '@/router/routePath'
import lockWhite from '@/assets/images/login/lock-white.png'

export default {
	name: 'AccountMiddlePage',
	data () {
		return {
			worknum: '',
			username: '',
			phone: '',
			gender: '',
			department: '',
      		dptColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      		genderColumns: ['男', '女'],
      		dptShowPicker: false,
			genderShowPicker: false,
			lockWhite
		}
	},
	created() {

	},
	methods: {
		validatorPhone (val) {
			return /^[1]([3-9])[0-9]{9}$/.test(val)
		},
		onSubmit(formValues) {
			console.log('submit', formValues)
		},
		onDptConfirm(value) {
			this.department = value
			this.dptShowPicker = false
		},
		onGenderConfirm (gender) {
			this.gender = gender
			this.genderShowPicker = false
		},
		onClickLeft () {
			this.handleToUrl(MAINMENU)
		},
		onClickRight () {
			this.handleToUrl(EDITPWD)
		},
		handleToUrl (route) {
			this.$router.push({
				path: route
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.account-container {
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
