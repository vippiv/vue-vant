<template>
    <div class="wdwztk-container">
		<ckVanNavBar 
			title="我的物资退库"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
			<div class="list-container" v-for="(item) in list" :key="item.id">
				<div class="list-item-header">
					<van-cell :title="`工单编号：${item.NO}`" :value="item.status | transferStatus" size="large" />
				</div>
				<div class="list-item-body">
					<p>{{item.department}}</p>
					<p>申请人员：{{item.applyName}}</p>
					<p>联系方式：{{item.applyContact}}</p>
					<p>申请时间：{{item.applyTime}}</p>
				</div>
				<div class="list-item-footer">
					<van-button type="default" @click="handleGoodsDetail(item)" size="mini">查看详情</van-button>
					<van-button type="primary" @click="handleEditGoods(item)" size="mini">编辑退库</van-button>
					<van-button type="danger" @click="handleWithDrawGoods(item)" size="mini">撤回申请</van-button>
				</div>
			</div>
		</van-list>
    </div>
</template>

<script>
import { WZ, WZ_WZTKXQ, WZ_WZTKSQ } from '@/router/routePath'

export default {
	name: 'Wdwztk',
	data () {
		return {
			loading: false,
			finished: false,
			list: []
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
		},
		handleGoodsDetail (params) {
			this.$router.push({
				path: `${WZ_WZTKXQ}/${params.id}`
			})
		},
		handleEditGoods (params) {
			this.$router.push({
				path: `${WZ_WZTKSQ}/${params.id}`
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
		}
	}
}
</script>

<style lang="scss" scoped>
.wdwztk-container {
	.list-container{
		color:#333;
		margin-bottom: 15px;
		background-color: white;
		.list-item-header{
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 16px;
			justify-content: space-between;
		}
		.list-item-body{
			border-top:1px solid #ECECEC;
			border-bottom:1px solid #ECECEC;
			padding:10px;
			line-height: 2;
		}
		.list-item-footer{
			display: flex;
			align-items: center;
			justify-content:flex-end;
			height:50px;
			padding: 10px;
		}
		.danger-text{
			color:red
		}
		.info-text{
			color:#1F6BFF
		}
	}
}
</style>