<template>
    <div class="yj-container">
		<ckVanNavBar 
			title="意见"
			leftText="返回"
			@click-left="onClickLeft"
		/>
		<div class="yj-content">
			<p class="caption">我的反馈</p>
			<div class="yj-item" v-for="item in tableData" :key="item.id">
				<div class="account">
					<p class="phone">13245***54544</p>
					<p class="time">2020-2-1</p>
				</div>
				<div class="content">
					<div class="question">维修师傅不是很专业，戏玩可以整体培训下。</div>
					<div class="answer">
						<div class="clearfix top">
							<span class="left">回复：</span>
							<span class="right">2021-2-1</span>
						</div>
						<div class="middle">
							感谢您的反馈，我们会根据您的问她做到改善。
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fix-bottom">
			<van-button round block type="info" native-type="submit" @click="handleToUrl">我要反馈</van-button>
		</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { YJ_FK, MAINMENU } from '@/router/routePath'

export default {
	name: 'YJMiddlePage',
	data () {
		return {
			tableData: [
				{
					id: 112
				},
				{
					id: 222
				},
				{
					id: 33
				}
			]
		}
	},
	created() {
	},
	computed: {
		...mapState({
			cacheData: state => state.global.keepAlive
		})
	},
	methods: {
		onClickLeft () {
			this.$router.push({
				path: MAINMENU
			})
		},
		handleToUrl () {
			this.$router.push({
				path: YJ_FK
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.yj-container {
	.caption {
		color: #1F6BFF;
		line-height: 3;
		padding-left: 15px;
		font-size: 1.2rem;
	}
	.yj-item {
		background-color: white;
		margin-bottom: 15px;
		.account {
			border-bottom: 1px solid #f7f7f7;
			padding: 15px;
			.phone {
				color: #333;
				font-size: 1.5rem;
			}
			.time {
				color: #666666;
				font-size: 1rem;
				line-height: 2;
			}
		}
		.content {
			padding: 15px;
			.question {
				line-height: 3;
			}
			.answer {
				background-color: #EEEEEE;
				padding: 15px;
				border-radius: 0.3em;
				color: #666;
				.top {
					display: flex;
					line-height: 3;
					.left {
						width: 50%;
						color: #FF4A4A;
					}
					.right {
						width: 50%;
						text-align: right;
					}
				}
			}
		}
	}
	.fix-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20px;
	}
}
</style>
