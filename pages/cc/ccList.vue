<template>
	<joy-page :joyPageStatus="joyPageStatus">
		<view class="content cc-list">
			<template v-if="isEmpty">
				<view class="cc-list__item" v-for="(item,index) in list" :key="index" @tap="toDetail(item)">
					<view class="cc-list__title">
						{{item.bankName}}：<m-format-card :isStar="true" :cardNo="item.cardNo"></m-format-card>
					</view>
					<view class="cc-list__phone">
						预留手机号：<m-format-phone :isStar="true" :phone="item.reservedPhoneNo"></m-format-phone>
					</view>
				</view>
			</template>
			<template v-else>
				<no-cc></no-cc>
			</template>
			<cc-btn @click="addCc">添加信用卡</cc-btn>
		</view>
	</joy-page>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mFormatCard from "@/components/m-format-card/m-format-card.vue"
	import mFormatPhone from "@/components/m-format-phone/m-format-phone.vue"
	import noCc from "./modules/noCC.vue"
	import ccBtn from "@/components/m-cc-btn/m-cc-btn.vue"
	export default {
		components: {
			noCc,
			ccBtn,
			uniLoadMore,
			mFormatCard,
			mFormatPhone
		},

		data() {
			return {
				noCC: this.$mAssetsPath.noCC,
				joyPageStatus: "loading",
				list: []
			}
		},
		computed: {
			isEmpty() {
				return !!this.list.length;
			}
		},
		async onShow() {
			this.initPage();
		},
		methods: {
			async initPage() {
				try {
					let data = await this.$apis.getCardList();
					this.list = (data.data || []).reverse();
					this.joyPageStatus = "success";
				} catch (e) {
					this.joyPageStatus = "fail";
				}
			},

			// 跳转detail页面
			async toDetail(detail) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.ccDetail,
					query: {
						detailDate: encodeURIComponent(JSON.stringify(detail))
					}
				})
			},

			async addCc() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.ccAdd
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc-list {
		padding: 20upx 20upx;
		box-sizing: border-box;
		background: #fbfbfb;

		&__item {
			background: linear-gradient(136deg, #ffc003, #ff975b);
			margin-top: 20upx;
			border-radius: 10upx;
			color: #fff;
			padding: 30upx 0upx 20upx;
			box-sizing: border-box;
		}

		&__title {
			font-size: 28upx;
			background: rgba(0, 0, 0, 0.2);
			line-height: 60upx;
			padding: 0 30upx;
			box-sizing: border-box;
		}

		&__phone {
			font-size: 24upx;
			line-height: 60upx;
			padding: 0 30upx;
			box-sizing: border-box;
		}
	}

	.load-more-box {
		height: 120upx;
	}
</style>
