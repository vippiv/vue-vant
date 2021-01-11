<template>
	<div class="wdwzlysq-container">
		<ckVanNavBar 
			title="我的物资领用申请"
			leftText="返回"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
			<div v-for="item in list" :key="item.id" class="goods-list">
				<van-cell title="工单编号：214121" :value="item.status | transferStatus" size="large" />
				<div class="sq-info">
					<p>{{item.department}}</p>
					<p>申请人员：{{item.applyName}}</p>
					<p>联系方式：{{item.applyContact}}</p>
					<p>申请时间：{{item.applyTime}}</p>
				</div>
				<div class="handle-box">
					<van-button type="default" size="small" @click="handleGoodsDetail(item)">查看详情</van-button>
					<van-button type="info" size="small" @click="handleEditGoods(item)">编辑申请</van-button>
					<van-button type="danger" size="small" @click="handleWithDrawGoods(item)">撤回申请</van-button>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
import { WZ, WZ_WZXQ, WZ_WZLYSQ } from '@/router/routePath'

export default {
	name: 'Wdwzlysq',
	data () {
		return {
			list: [],
			loading: false,
			finished: false
		}
	},
	filters: {
		transferStatus (val) {
			switch(val) {
				case 0:
					return '未审批'
				case 1:
					return '已批准'
				case 2:
					return '已驳回'
				default:
					return ''
			}
		}
	},
	methods: {
		handleGoodsDetail (params) {
			this.$router.push({
				path: `${WZ_WZXQ}/${params.id}`
			})
		},
		handleEditGoods (params) {
			this.$router.push({
				path: `${WZ_WZLYSQ}/${params.id}`
			})
		},
		handleWithDrawGoods (params) {
			this.$dialog.confirm({
				title: '确认撤回申请',
				message: '撤销申请后申请内容将被清空，确定撤销吗？',
			})
			.then(() => {
				console.log('撤销')
			})
			.catch(() => {
				console.log('不撤销')
			})
		},
		onLoad() {
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
				for (let i = 0; i < 10; i++) {
					this.list.push({
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
				this.loading = false

				// 数据全部加载完成
				if (this.list.length >= 40) {
				this.finished = true
				}
			}, 1000)
		},
		onClickLeft () {
			this.$router.push({
				path: WZ
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wdwzlysq-container {
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
}
</style>