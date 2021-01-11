<template>
	<div class="menu-block-container">
		<Header />
		<div class="index-main">
			<div class="avatar-box">
				<div class="left" @click="handleToUrl(ACCOUNT)">
					<div class="avatar"></div>
					<div class="userinfo">
						<p>您好，{{userInfo && userInfo.nickName}}管理员</p>
						<p>工号：2125</p>
					</div>
				</div>
				<div class="right">
					<van-button type="info" size="mini" @click="handleToUrl(LOGIN)">退出账号</van-button>
				</div>
			</div>
			<div class="flex-layout">
				<div class="menu-item" v-for="(nav, index) in workStations" :key="index" @click="handleSaveBench(nav)">
					<router-link :to="workStationsDictory[nav.APPLICATION].path" :class="workStationsDictory[nav.APPLICATION].imgCls">{{workStationsDictory[nav.APPLICATION].text}}</router-link>
					<span class="text">{{workStationsDictory[nav.APPLICATION].text}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState, mapActions } from 'vuex'
	import workStationsDictory from '@/router/dictionary/workStations'
	import Header from './Header.vue'
	import { ACCOUNT, LOGIN } from '@/router/routePath'

	export default {
		name: 'MenuBlock',
		props: {
			navMenus: {
				type: Array,
				default () {
					return []
				}
			},
			workStations: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			return {
				ACCOUNT,
				LOGIN,
				workStationsDictory: workStationsDictory
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			})
		},
		components: {
            Header
        },
		methods: {
			...mapActions([
				'A_GET_USER_ROLE'
			]),
			handleToUrl(route) {
				this.$router.push({
					path: route
				})
			},
			handleSaveBench (obj) {
				const stationID = obj.APPLICATION
				// 获取 用户角色权限
				this.A_GET_USER_ROLE({
					workbenchcode: obj.WORKBENCH_CODE,
					userid: this.userInfo.UserId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-block-container {
		.index-main {
			width: 90%;
			margin: 0 auto;
			.avatar-box {
				padding: 15px;
				margin-top: -6rem;
				background-color: white;
				border-radius: 0.3em;
				min-height: 8rem;
				display: flex;
				.left {
					width: 60%;
					display: flex;
					.avatar {
						width: 40%;
						background-color: #333;
					}
					.userinfo {
						width: 60%;
						p {
							padding-left: 10px;
						}
					}
				}
				.right {
					width: 40%;
					text-align: right;
				}
			}
			.flex-layout {
				display: flex;
				flex-wrap: wrap;
				background-color: white;
				margin-top: 15px;
				border-radius: 0.3em;
				padding: 15px;
				.menu-item {
					width: 25%;
					margin-bottom: 1rem;
					a {
						// TODO 整理，页面尺寸不固定的情况下，如何保持背景图片正方形比例
						display: block;
						margin: 0 auto;
						width: 0;
						height: 0;
						padding: 40%;
						color: transparent;
						background-position: top center;
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
					.text{
						display: block;
						line-height: 2;
						font-weight: bold;
						text-align: center;
					}
					.wxbg {
						background-image: url('../../../assets/images/index/wxbg.png');
					}
					.xjby {
						background-image: url('../../../assets/images/index/xjby.png');
					}
					.pjys {
						background-image: url('../../../assets/images/index/pjys.png');
					}
					.wz {
						background-image: url('../../../assets/images/index/wz.png');
					}
					.zc {
						background-image: url('../../../assets/images/index/zc.png');
					}
					.pd {
						background-image: url('../../../assets/images/index/pd.png');
					}
					.yj {
						background-image: url('../../../assets/images/index/yj.png');
					}
				}
			}
		}
	}
</style>
