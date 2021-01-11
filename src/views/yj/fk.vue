<template>
	<div class="fk-container">
		<ckVanNavBar 
			title="我要反馈"
			@click-left="onClickLeft"
		/>
		<div class="fk-content">
			<p class="caption">相关建议反馈</p>
			<van-field
				v-model="message"
				rows="2"
				autosize
				type="textarea"
				maxlength="300"
				placeholder="请输入用户感受、功能异常、维修建议、后勤管理情况等、 等（限300字）"
				show-word-limit
			/>
			<p class="caption"><span class="red">*</span>图片上传<span>(不超过9张)</span></p>
			<van-uploader v-model="fileList" multiple :max-count="2" />
		</div>
		<div class="fix-bottom">
			<van-button round block type="info" native-type="submit" @click="handleToUrl">提交反馈</van-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { YJ_FK, MAINMENU } from '@/router/routePath'

export default {
	name: 'FkMiddlePage',
	data () {
		return {
			message: ''
		}
	},
	created() {
		
	},
	methods: {
		onClickLeft () {
			this.$router.push({
				path: MAINMENU
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.fk-container {
	.caption {
		color: #333;
		line-height: 3;
		padding-left: 15px;
		font-size: 1.2rem;
	}
	.fk-content {
		background-color: white;
		padding: 15px;
	}
	.fix-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20px;
	}
}
</style>
