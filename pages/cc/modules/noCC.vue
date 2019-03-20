<template>
	<view class="no-cc">
		<view class="no-cc__img">
			<image :src="noCC" mode=""></image>
		</view>
		<text class="no-cc__txt">您当前暂无绑卡信息哦！</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noCC: this.$mAssetsPath.noCC
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no-cc {
		text-align: center;

		&__img {
			width: 330upx;
			height: 220upx;
			margin: 150upx auto 30upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&__txt {
			font-size: 30upx;
			color: #666666;
		}

		&__btn {
			width: 590upx;
			margin: 80upx auto;
		}
	}
</style>
