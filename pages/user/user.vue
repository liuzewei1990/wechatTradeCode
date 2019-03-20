<template>
	<view class="content">
		<view class="header">
			<view class="innerBox">
				<view class="head_img">
					<image :src="userInfo.headimgurl || defaultHeader" mode=""></image>
				</view>
				<view class="cont">
					<text class="name">{{userInfo.nickname}}</text>
					<text class="cNo">商户号：{{userInfo.customerNo}}</text>
				</view>
			</view>
		</view>
		<view class="cells mt-10">
			<m-cell title="基本信息" isLink bottomLine isIcon @click="handleClickCells('基本信息')">
				<view class="u-icon" slot="icon">
					<m-icon type="jibenxinxi" size="34" color="#fe6710"></m-icon>
				</view>
			</m-cell>
			<m-cell title="修改结算卡" isLink bottomLine isIcon @click="handleClickCells('修改结算卡')">
				<view class="u-icon" slot="icon">
					<m-icon type="weibiaoti2010104" size="34" color="#fe6710"></m-icon>
				</view>
			</m-cell>
			<m-cell title="切换用户" isLink bottomLine isIcon @click="handleClickCells('切换用户')">
				<view class="u-icon" slot="icon">
					<m-icon type="iconzh2" size="36" color="#fe6710"></m-icon>
				</view>
			</m-cell>
			<m-cell title="使用指南" isLink bottomLine isIcon @click="handleClickCells('使用指南')">
				<view class="u-icon" slot="icon">
					<m-icon type="shiyongbangzhu" size="32" color="#fe6710"></m-icon>
				</view>
			</m-cell>
			<m-cell title="推荐有礼" isLink bottomLine isIcon @click="handleClickCells('推荐有礼')">
				<view class="u-icon" slot="icon">
					<m-icon type="tuijianyouli" size="32" color="#fe6710"></m-icon>
				</view>
			</m-cell>
			<m-cell title="下载新中付" isLink isIcon @click="handleClickCells('下载新中付')">
				<view class="u-icon" slot="icon">
					<m-icon type="xiazai" size="34" color="#fe6710"></m-icon>
				</view>
			</m-cell>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	import mCell from '@/components/m-cell/m-cell.vue'
	import mIcon from "@/components/m-icon/m-icon.vue"

	export default {
		components: {
			mCell,
			mIcon
		},
		computed: {
			...mapState(["userInfo"]),
			...mapGetters(["hasLogin"])
		},
		data() {
			return {
				defaultHeader: this.$mAssetsPath.headImg
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {

			// 获取用户信息
			async getUserInfo() {
				let userInfo = await this.$apis.getUserInfo();
				this.$store.commit("SET_USERINFO", userInfo);
			},

			// 处理点击cell
			async handleClickCells(cellTypeName) {
				switch (cellTypeName) {
					case "基本信息":
						this.$mRouter.push({
							route: this.$mRoutesConfig.userInfo
						})
						break;
					case "修改结算卡":
						this.$mRouter.push({
							route: this.$mRoutesConfig.uUserInfo
						})
						break;
					case "切换用户":
						uni.showModal({
							title: '提示',
							content: '确定退出吗？',
							success: res => {
								if (res.confirm != true) return;
								this.$store.commit("SET_LOGOUT");
								this.$mRouter.redirectTo({
									route: this.$mRoutesConfig.login
								});
							},
						})
						break;
					case "使用指南":
						break;
					case "推荐有礼":
						break;
					case "下载新中付":
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;

		.innerBox {
			background: red;
			display: flex;
			align-items: center;
			padding: 40upx;
			border-radius: 10upx;
			background: linear-gradient(136deg, #ffc003, #fa5d02);
			color: #fff;

			.head_img {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #f6eac3f5;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.cont {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 50upx;

				.name {
					font-size: 36upx;
					flex: 1;
				}

				.cNo {
					flex: 1;
					font-size: 24upx;
					color: #ffdd9b;
					margin-top: 10upx;
				}
			}
		}
	}

	.cells {
		border-radius: 10upx;
		overflow: hidden;
	}
</style>
