<template>
	<keep-alive>
		<div>
			<ckVanNavBar 
				title="物资"
				leftText="返回"
				@click-left="onClickLeft"
			/>
			<ul class="wzmenu">
				<li @click="handleEnter(WZ_WZLYSQ)" class="img-common-property wzlysq">物资领用申请</li>
				<li @click="handleEnter(WZ_WDWZLYSQ)" class="img-common-property wdwzlysq mb10">我的物资领用申请</li>

				<li @click="handleEnter(WZ_WZTKSQ)" class="img-common-property wztk">物资退库</li>
				<li @click="handleEnter(WZ_WDWZTK)" class="img-common-property wdwztk mb10">我的物资退库</li>

				<li @click="handleEnter(WZ_WZLYSH_DSP)" class="img-common-property wzlysh">物资领用审核</li>
				<li @click="handleEnter(WZ_WZTKSH)" class="img-common-property wztksh">物资退库审核</li>
			</ul>
		</div>
		<router-view></router-view>
	</keep-alive>
</template>

<script>
import { mapState } from 'vuex'
import { WZ_WZLYSQ, WZ_WDWZLYSQ, WZ_WZTKSQ, WZ_WDWZTK, WZ_WZLYSH, WZ_WZTKSH, MAINMENU, WZ_WZLYSH_DSP } from '@/router/routePath'

export default {
	name: 'BaseDataMiddlePage',
	data () {
		return {
			WZ_WZLYSQ,
			WZ_WDWZLYSQ,
			WZ_WZTKSQ,
			WZ_WDWZTK,
			WZ_WZLYSH,
			WZ_WZTKSH,
			WZ_WZLYSH_DSP
		}
	},
	beforeRouteUpdate (to, from, next) {
		const ele = document.querySelector('.layout')
		if (this.$route.name && this.$route.name.indexOf('wzlysh') > -1) {
			localStorage.setItem(`${this.$route.name}_scrollTop`, ele.scrollTop)
		}
		next()
	},
	methods: {
		handleEnter (route) {
			this.$router.push({
				path: route
			})
		},
		onClickLeft () {
			this.$router.push({
				path: MAINMENU
			})
		}
	},
	destroyed () {
		localStorage.removeItem('wzlysh_ypz_scrollTop')
		localStorage.removeItem('wzlysh_dsp_scrollTop')
		localStorage.removeItem('wzlysh_ybh_scrollTop')
	}
}
</script>

<style lang="scss" scoped>
	.wzmenu {
		& > li {
			line-height: 3;
			background-color: white;
			padding-left: 50px;
			color: #333;
			border-bottom: 1px solid #eee;
		}
		.mb10 {
			margin-bottom: 10px;
		}
		.img-common-property {
			background-repeat: no-repeat;
			background-size: auto 65%;
			background-position: 15px center;
		}
		.wzlysq {
			background-image: url('../../assets/images/wz/wzlysq.png');
		}
		.wdwzlysq {
			background-image: url('../../assets/images/wz/wdwzlysq.png');
		}
		.wztk {
			background-image: url('../../assets/images/wz/wztk.png');
		}
		.wdwztk {
			background-image: url('../../assets/images/wz/wdwztk.png');
		}
		.wzlysh {
			background-image: url('../../assets/images/wz/wzlysh.png');
		}
		.wztksh {
			background-image: url('../../assets/images/wz/wztksh.png');
		}
	}
</style>
