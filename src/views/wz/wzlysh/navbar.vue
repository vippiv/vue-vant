<template>
	<div class="wzlysh_navbar-container">
		<div class="nav"><span :class="routeName === 'wzlysh_dsp' ? 'active' : ''" @click="handleToUrl(WZ_WZLYSH_DSP)">待审批</span></div>
		<div class="nav"><span :class="routeName === 'wzlysh_ypz' ? 'active' : ''" @click="handleToUrl(WZ_WZLYSH_YPZ)">已批准</span></div>
		<div class="nav"><span :class="routeName === 'wzlysh_ybh' ? 'active' : ''" @click="handleToUrl(WZ_WZLYSH_YBH)">已驳回</span></div>
	</div>
</template>

<script>
import { WZ_WZLYSH_DSP, WZ_WZLYSH_YPZ, WZ_WZLYSH_YBH } from '@/router/routePath'

export default {
	name: 'WZLYSHNavbar',
	data () {
		return {
			WZ_WZLYSH_DSP,
			WZ_WZLYSH_YPZ,
			WZ_WZLYSH_YBH,
			routeName: ''
		}
	},
	watch:{
		$route(to, from){
			this.routeName = to.name
		}
	},
	methods: {
		handleToUrl (route) {
			this.$router.push({
				path: route
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wzlysh_navbar-container {
	display: flex;
	text-align: center;
	background-color: white;
	.nav {
		width: 33.33%;
		height: 40px;
		line-height: 40px;
		span {
			display: inline-block;
			line-height: 38px;
		}
		span.active {
			color: #1F6BFF;
			border-bottom: 2px solid #1F6BFF;
		}
	}
}
</style>