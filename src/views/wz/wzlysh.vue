<template>
    <div class="wzlysh-container">
		<ckVanNavBar 
			title="物资领用审核"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<keep-alive>
			<van-tabs v-model="activeName">
				<van-tab title="待审批" name="a">
					<van-list
						v-model="dspLoading"
						:finished="dspFinished"
						finished-text="没有更多了"
						@load="onLoad('dsp')"
						>
						<div v-for="item in dspList" :key="item" class="goods-list">
							<van-cell title="工单编号：214121" :value="item" size="large" />
							<div class="sq-info">
								<p>泌尿科 dsp</p>
								<p>申请人员：肯定</p>
								<p>联系方式：312541522</p>
								<p>申请时间：2020-12-21</p>
							</div>
							<div class="handle-box">
								<van-button type="primary" size="mini" @click="handleGoodsDetail">查看详情</van-button>
								<van-button type="primary" size="mini">审批</van-button>
							</div>
						</div>
					</van-list>
				</van-tab>
				<van-tab title="已批准" name="b">
					<van-list
						v-model="ypzLoading"
						:finished="ypzFinished"
						finished-text="没有更多了"
						@load="onLoad('ypz')"
						>
						<div v-for="item in ypzList" :key="item" class="goods-list">
							<van-cell title="工单编号：214121" :value="item" size="large" />
							<div class="sq-info">
								<p>泌尿科 ypz</p>
								<p>申请人员：肯定</p>
								<p>联系方式：312541522</p>
								<p>申请时间：2020-12-21</p>
							</div>
							<div class="handle-box">
								<van-button type="primary" size="mini" @click="handleGoodsDetail">查看详情</van-button>
								<van-button type="primary" size="mini">审批</van-button>
							</div>
						</div>
					</van-list>
				</van-tab>
				<van-tab title="已驳回" name="c">
					<van-list
						v-model="ybhLoading"
						:finished="ybhFinished"
						finished-text="没有更多了"
						@load="onLoad('ybh')"
						>
						<div v-for="item in ybhList" :key="item" class="goods-list">
							<van-cell title="工单编号：214121" :value="item" size="large" />
							<div class="sq-info">
								<p>泌尿科 ybh</p>
								<p>申请人员：肯定</p>
								<p>联系方式：312541522</p>
								<p>申请时间：2020-12-21</p>
							</div>
							<div class="handle-box">
								<van-button type="primary" size="mini" @click="handleGoodsDetail">查看详情</van-button>
								<van-button type="primary" size="mini">审批</van-button>
							</div>
						</div>
					</van-list>
				</van-tab>
			</van-tabs>
		</keep-alive>
    </div>
</template>

<script>
import { WZ, WZ_WZXQ } from '@/router/routePath'

export default {
	name: 'Wzlysh',
	data () {
		return {
			activeName: 'a',
			dspList: [],
			dspLoading: false,
			dspFinished: false,
			ypzList: [],
			ypzLoading: false,
			ypzFinished: false,
			ybhList: [],
			ybhLoading: false,
			ybhFinished: false,
			scrollPosition: {}
		}
	},
	methods: {
		handleGoodsDetail () {
			this.$router.push({
				path: WZ_WZXQ
			})
		},
		onClickLeft () {
			this.$router.push({
				path: WZ
			})
		},
		onLoad(tag) {
			let listVar = '', loadingVar = '', finishedVar = ''
			switch (tag) {
				case 'dsp':
					listVar = 'dspList'
					loadingVar = 'dspLoading'
					finishedVar = 'dspFinished'
					break
				case 'ypz':
					listVar = 'ypzList'
					loadingVar = 'ypzLoading'
					finishedVar = 'ypzFinished'
					break
				case 'ybh':
					listVar = 'ybhList'
					loadingVar = 'ybhLoading'
					finishedVar = 'ybhFinished'
					break
				default:
					break
			}
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
				for (let i = 0; i < 10; i++) {
					this[listVar].push(this[listVar].length + 1)
				}

				// 加载状态结束
				this[loadingVar] = false

				// 数据全部加载完成
				if (this[listVar].length >= 40) {
					this[finishedVar] = true
				}
			}, 1000)
		},
	}
}
</script>

<style lang="scss" scoped>
.wzlysh-container {
	.goods-list {
		margin-bottom: 15px;
		background-color: white;
		.sq-info {
			margin: 0px 16px;
			padding: 10px 0;
			line-height: 2;
			border-bottom: 1px solid #ebedf0;
		}
		.handle-box {
			padding: 10px 16px;
			text-align: right;
		}
	}
	/deep/ .van-tabs__wrap {
		position: sticky;
		top: 46px;
		z-index: 99999;
	}
}
</style>