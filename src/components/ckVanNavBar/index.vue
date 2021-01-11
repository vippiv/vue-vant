<template>
	<div class="nav-bar-container">
		<van-nav-bar
			class="nav-bar"
			:title="title"
			:left-text="leftText"
			:right-text="righText"
			left-arrow
			@click-left="onClickLeft"
			@click-right="onClickRight"
		>
		<template #right>
			<slot name="right"></slot>
		</template>
		<template #left>
			<slot name="left"></slot>
		</template>
		</van-nav-bar>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '标题'
		},
		leftText: {
			type: String,
			default: '返回'
		},
		righText: {
			type: String,
			default: ''
		}
	},
	data () {
		return {}
	},
	methods: {
		onClickLeft () {
			this.$emit('click-left')
		},
		onClickRight () {
			this.$emit('click-right')
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
	.nav-bar {
		background-color: #1F6BFF;
		color: white;
	}
	/deep/ .van-nav-bar__title {
		color: white;
	}
	/deep/ .van-nav-bar__text {
		color: white;
	}
	/deep/ .van-nav-bar {
		.van-icon {
			color: white;
		}
	}
}
</style>

