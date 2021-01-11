<template>
	<div class="wztksh-container">
		<ckVanNavBar 
			title="物资退库审核"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<van-tabs v-model="activeName">
			<van-tab title="待审批" name="dsp">
				<van-list
					v-model="dspLoading"
					:finished="dspFinished"
					finished-text="没有更多了"
					@load="onLoad('dsp')"
					>
					<div v-for="item in dspList" :key="item.id" class="goods-list">
						<van-cell :title="`工单编号：${item.NO}`" value="待审批" size="large" />
						<div class="sq-info">
							<p>{{item.department}} {{item.id}}</p>
							<p>申请人员：{{item.applyName}}</p>
							<p>联系方式：{{item.applyContact}}</p>
							<p>申请时间：{{item.applyTime}}</p>
						</div>
						<div class="handle-box">
							<van-button type="default" size="mini" @click="handleGoodsDetail(item)">查看详情</van-button>
							<van-button type="info" size="mini">审批</van-button>
						</div>
					</div>
				</van-list>
			</van-tab>
			<van-tab title="已批准" name="ypz">
				<van-list
					v-model="ypzLoading"
					:finished="ypzFinished"
					finished-text="没有更多了"
					@load="onLoad('ypz')"
					>
					<div v-for="item in ypzList" :key="item.id" class="goods-list">
						<van-cell :title="`工单编号：${item.NO}`" value="已批准" size="large" />
						<div class="sq-info">
							<p>{{item.department}} {{item.id}}</p>
							<p>申请人员：{{item.applyName}}</p>
							<p>联系方式：{{item.applyContact}}</p>
							<p>申请时间：{{item.applyTime}}</p>
						</div>
						<div class="handle-box">
							<van-button type="default" size="mini" @click="handleGoodsDetail(item)">查看详情</van-button>
						</div>
					</div>
				</van-list>
			</van-tab>
			<van-tab title="已驳回" name="ybh">
				<van-list
					v-model="ybhLoading"
					:finished="ybhFinished"
					finished-text="没有更多了"
					@load="onLoad('ybh')"
					>
					<div v-for="item in ybhList" :key="item.id" class="goods-list">
						<van-cell :title="`工单编号：${item.NO}`" value="已驳回" size="large" />
						<div class="sq-info">
							<p>{{item.department}} {{item.id}}</p>
							<p>申请人员：{{item.applyName}}</p>
							<p>联系方式：{{item.applyContact}}</p>
							<p>申请时间：{{item.applyTime}}</p>
						</div>
						<div class="handle-box">
							<van-button type="default" size="mini" @click="handleGoodsDetail(item)">查看详情</van-button>
						</div>
					</div>
				</van-list>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { WZ, WZ_WZTKSHXQ } from '@/router/routePath'

export default {
	name: 'Wztksh',
	data () {
		return {
			activeName: 'dsp',
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
	watch: {
		activeName (newVal, oldVal) {
			const ele = document.querySelector('.layout')
			localStorage.setItem(`wztksh_${oldVal}_scrollTop`, ele.scrollTop) // 记录上一个tab的scrollTop
			const nowScrollTop = localStorage.getItem(`wztksh_${newVal}_scrollTop`) // 记录上一个tab的scrollTop
			if (nowScrollTop) { // 设置当前tab的scrollTop
				ele.scrollTop = nowScrollTop
			}
		}
	},
	methods: {
		handleGoodsDetail (params) {
			this.$router.push({
				path: `${WZ_WZTKSHXQ}/${params.id}`
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
					this[listVar].push({
						id: Math.floor(Math.random() * 1000000),
						department: '泌尿科',
						applyName: '人员',
						applyContact: '13402515841',
						applyTime: '2020-1-2',
						status: Math.floor(Math.random() * 3),
						NO: Math.floor(Math.random() * 10000000)
					})
				}

				// 加载状态结束
				this[loadingVar] = false

				// 数据全部加载完成
				if (this[listVar].length >= 40) {
					this[finishedVar] = true
				}
			}, 1000)
		}
	}
}
</script>

<style lang="scss" scoped>
.wztksh-container {
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
	/deep/ .van-tabs__line {
		background-color: #1F6BFF;
	}
}
</style>