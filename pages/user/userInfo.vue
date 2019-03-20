<template>
	<view class="content">
		<view class="status-fail-tip" v-if="customerInfo.status == 'REJECT' || customerInfo.status == 'WAIT_AUDIT'">
			<view class="fail-title">
				信息{{customerStatus[customerInfo.status]}}！
			</view>
			<text class="fail-desc" v-if="customerInfo.status == 'REJECT'">
				原因 : {{customerInfo.auditResult}}
			</text>
		</view>
		<view class="border-1px">
			<m-cell title="姓名" bottomLine :desc="customerInfo.userName"></m-cell>
			<m-cell title="身份证" bottomLine :desc="customerInfo.idCard"></m-cell>
			<m-cell title="手机号" bottomLine :desc="customerInfo.phoneNo"></m-cell>
			<m-cell title="银行名称" bottomLine :desc="customerInfo.bankName"></m-cell>
			<m-cell title="银行账号" bottomLine>
				<view class="format-card">
					<m-format-card :cardNo="customerInfo.cardNo"></m-format-card>
				</view>
			</m-cell>
			<m-cell title="开户地区" bottomLine :desc="cityName"></m-cell>
			<m-cell title="商户号" bottomLine :desc="customerInfo.customerNo"></m-cell>
			<m-cell title="审核状态" :desc="customerStatus[customerInfo.status]"></m-cell>
		</view>
		<!-- 		<view class="edit-btn" v-if="customerInfo.status == 'REJECT'">
			<button type="primary" @tap="resetSubmitRegInfo">重新编辑</button>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import mCell from "@/components/m-cell/m-cell.vue"
	import CheckLogin from "@/common/auth.js"
	import cityData from "@/common/cityData.js"
	import mFormatCard from "@/components/m-format-card/m-format-card.vue"
	export default {
		components: {
			mCell,
			mFormatCard
		},
		computed: {
			...mapState(["customerInfo"]),
			cityName() {
				let cityName = this.$mUtils.getCityName(cityData, this.customerInfo.cityNo);
				return cityName;
			}
		},
		data() {
			return {
				customerStatus: this.$mConstDataConfig.status,
			};
		},
		async onLoad(params) {
			this.getCustomerInfo();
		},
		methods: {
			async getCustomerInfo() {
				let customerInfo = await this.$apis.getCustomer();
				this.$store.commit("SET_CUSTOMERINFO", customerInfo);
			}
		},
		onNavigationBarButtonTap: function(e) {
			if (e.btnType == "EDIT") {
				if (this.customerInfo.status == "REJECT") {
					this.$mRouter.push({
						route: this.$mRoutesConfig.reg,
						query: {
							type: "RESET"
						}
					})
				} else if (this.customerInfo.status == "WAIT_AUDIT") {
					uni.showToast({
						title: `信息${this.$mConstDataConfig.status[this.customerInfo.status]}`,
						icon: "none"
					})
				} else {
					this.$mRouter.push({
						route: this.$mRoutesConfig.uUserInfo
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status-fail-tip {
		background: linear-gradient(136deg, #ffc003, #fa5d02);
		color: #fff;
		padding: 20upx;
		box-sizing: border-box;

		.fail-title {
			font-size: 36upx;
			line-height: 60upx;
		}

		.fail-desc {
			font-size: 26upx;
		}
	}

	.edit-btn {
		width: 96%;
		margin: 40upx auto;

		button {
			background: linear-gradient(136deg, #ffc003, #fa5d02);
		}
	}

	.format-card {
		color: #666;
		float: right;
	}
</style>
