<template>
    <div class="wzlysh-container">
		<ckVanNavBar 
			title="物资领用审核"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<Navbar class="navbar-sticky" />
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
			<div v-for="item in list" :key="item.id" class="goods-list">
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
    </div>
</template>

<script>
import { WZ, WZ_WZXQ, WZ_WZLYSHXQ } from '@/router/routePath'
import Navbar from './navbar'

export default {
	name: 'Wzlysh',
	data () {
		return {
			list: [],
			loading: false,
			finished: false
		}
	},
	components: {
		Navbar
	},
	activated () {
		const ele = document.querySelector('.layout')
		const scrollTop = localStorage.getItem(this.$route.name + '_scrollTop')
		ele.scrollTop = scrollTop
	},
	methods: {
		handleGoodsDetail (params) {
			this.$router.push({
				path: `${WZ_WZLYSHXQ}/${params.id}`
			})
		},
		onClickLeft () {
			this.$router.push({
				path: WZ
			})
		},
		onLoad(tag) {
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
	.navbar-sticky {
		position: sticky;
		top: 46px;
		z-index: 99999;
	}
	/deep/ .van-tabs__wrap {
		position: sticky;
		top: 46px;
		z-index: 99999;
	}
}
</style>