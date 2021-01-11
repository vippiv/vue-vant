<template>
	<div class="selectgoods-container">
		<ckVanNavBar 
			title="选择物资"
			@click-left="onClickLeft"
		/>
		<van-search
			v-model="kyw"
			show-action
			placeholder="请输入搜索关键词"
			@search="onSearch"
			>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
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
					<van-stepper v-model="item.stepperVal" min="0" theme="round"/>
				</div>
			</div>
		</van-list>
		<div class="fix-bottom">
			<van-button round type="default" native-type="button" style="width: 50%" @click="handleCancel">取消</van-button>
			<van-button round type="info" native-type="button" style="width: 50%" @click="handleSelect">提交</van-button>
		</div>
	</div>
</template>

<script>
import { WZ_WZLYSQ, WZ_WZTKSQ } from '@/router/routePath'
export default {
	name: "SelectGoods",
	data () {
		return {
			kyw: '',
			list: [],
			loading: false,
			finished: false,
			referer: '',
			leftRoute: '',
			sessionName: ''
		}
	},
	created () {
		// TODO 打开时是否要把上次选择的回显出来
		this.handleInitVari()
	},
	activated () {
		this.handleInitVari()
	},
	methods: {
		handleInitVari () {
			this.referer = this.$route.params.type
			if (this.referer === 'wztk') {
				this.leftRoute = WZ_WZTKSQ
				this.sessionName = 'selectWZTK'
			} else if (this.referer === 'wzly') {
				this.leftRoute = WZ_WZLYSQ
				this.sessionName = 'selectWZLY'
			}
		},
		onLoad() {
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
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

				// 加载状态结束
				this.loading = false;

				// 数据全部加载完成
				if (this.list.length >= 40) {
					this.finished = true;
				}
			}, 1000);
		},
		onSearch () {
			console.log('search')
		},
		onClickLeft () {
			this.handleToUrl(this.leftRoute)
		},
		handleToUrl (route) {
			this.$router.push({
				path: route
			})
		},
		handleCancel () {
			this.handleToUrl(this.leftRoute)
		},
		handleSelect () {
			const selectList = this.list.filter(item => item.stepperVal > 0)
			if (selectList.length > 0) {
				localStorage.setItem(this.sessionName, JSON.stringify(selectList))
			}
			this.handleToUrl(this.leftRoute)
		}
	}
}
</script>

<style lang="scss" scoped>
.selectgoods-container {
	.goods-card {
		background-color: white;
		margin: 15px;
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
					line-height: 1.6;
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
	.fix-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20px;
	}
}
</style>