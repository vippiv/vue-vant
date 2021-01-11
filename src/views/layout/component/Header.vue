<template>
	<div class="header">
		<ckVanNavBar 
			title="后勤智能管理"
			leftText=""
			@click-left="onClickLeft"
		/>
		
	</div>
</template>

<script>


export default {
	name: 'Header',
	data () {
		return {
			routeMatched: []
		}
	},
	created () {
		// const routeMatch = JSON.parse(localStorage.getItem('routeMatched'))
		// if (routeMatch && routeMatch.length > 0) {
		// 	this.routeMatched = routeMatch
		// } else {
		// 	this.routeMatched = [{
		// 		meta: {title: "主页"},
		// 		path: "/mainmenu"
		// 	}]
		// }
	},
	methods: {	
		saveRouteMatch() {
			const routeMatch = []
			this.routeMatched.forEach(item => {
				routeMatch.push({
					path: item.path,
					meta: {
						title: item.meta.title
					}
				})
			})
			localStorage.setItem('routeMatched', JSON.stringify(routeMatch))
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
	.header {
		background: #1F6BFF;
		height: 12rem;
		/deep/ .van-nav-bar__left {
			display: none;
		}
	}
</style>
