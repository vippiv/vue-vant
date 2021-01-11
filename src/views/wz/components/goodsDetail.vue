<template>
	<div class="wzxq-container">
		<ckVanNavBar 
			:title="title"
			@click-left="onClickLeft"
		/>
		<p class="caption">工单信息</p>
		<div class="fk-content">
			<van-cell-group>
				<van-cell title="领用编号" value="12546211" />
				<van-cell title="领用时间" value="12546211" />
				<van-cell title="领用备注" label="麻烦检查下是否完好无损" />
				<van-cell title="领用状态" value="未审批" />
			</van-cell-group>
		</div>
		<p class="caption">人员信息</p>
		<div class="fk-content">
			<van-cell-group>
				<van-cell title="人员名称" value="12546211" />
				<van-cell title="领用时间" value="12546211" />
				<van-cell title="所属科室" value="12541" />
				<van-cell title="联系方式" value="12546211" />
			</van-cell-group>
		</div>
		<p class="caption">领用物资</p>
		<div class="fk-content">
			<div class="goods-card" v-for="item in list" :key="item.id">
				<div class="goods-desc">
					<div class="img"></div>
					<div class="desc">
						<p style="font-size: 1.2rem; color: #222;">{{item.name}}</p>
						<p>122522</p>
						<p>剩余{{item.stock}}把</p>
						<p class="red">¥<span class="rmb">{{item.price}}</span></p>
					</div>
				</div>
				<div class="goods-steeper">
					{{item.stepperVal}}把
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { WZ_WDWZLYSQ, WZ_WDWZTK, WZ_WZLYSH_DSP, WZ_WZTKSH } from '@/router/routePath'

export default {
	name: 'WZXQMiddlePage',
	data () {
		return {
			message: '',
			list: [],
			title: '物资领用申请详情',
			backUrl: ''
		}
	},
	created() {
		this.handleUpdateTitle()
		for (let i = 0; i < 10; i++) {
			this.list.push({
				id: this.list.length + 1,
				selectNum: this.list.length + 1,
				name: '密码锁',
				price: '26.3',
				stock: 10,
				stepperVal: 0
			})
		}
	},
	mounted () {
		this.handleScrollTop()
	},
	activated () {
		this.handleUpdateTitle()
		this.handleScrollTop()
	},
	methods: {
		handleScrollTop () {
			const ele = document.querySelector('.layout')
			ele.scrollTop = 0
		},
		handleUpdateTitle () {
			const name = this.$route.name
			switch(name) {
				case 'wzxq':
					this.title = '物资领用申请详情'
					this.backUrl = WZ_WDWZLYSQ
					break
				case 'wztkxq':
					this.title = '物资退库详情'
					this.backUrl = WZ_WDWZTK
					break
				case 'wzlyshxq':
					this.title = '物资领用审核详情'
					// TODO 这里要分三种情况
					this.backUrl = WZ_WZLYSH_DSP
					break
				case 'wztkshxq':
					this.title = '物资退库审核详情'
					this.backUrl = WZ_WZTKSH
					break
				default:
					break
			}
		},
		onClickLeft () {
			this.$router.push({
				path: this.backUrl
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wzxq-container {
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
	.goods-card {
		background-color: white;
		padding: 15px;
		display: flex;
		.goods-desc {
			width: 60%;
			display: flex;
			.img {
				width: 50%;
				height: 100px;
				background-color: #333;
			}
			.desc {
				width: 50%;
				color: #666;
				p {
					line-height: 1.5;
					padding-left: 10px;
				}
				.rmb {
					font-size: 1.2rem;
				}
			}
		}
		.goods-steeper {
			width: 40%;
			text-align: right;
		}
	}
}
</style>
