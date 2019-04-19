<template>
	<joy-page :joyPageStatus="joyPageStatus">
		
		<!-- 商户状态审核成功 -->
		<template v-if="cusrometStatus == 'SUCCESS'">
			<view class="content trade-page">
				<view class="input-row border-bottom-1px">
					<text class="title">收款金额</text>
					<m-input type="number" clearable v-model="params.amount" placeholder="请输入金额" :maxLength="10" :focus="false"></m-input>
				</view>

				<m-cell title="支付卡" isLink bottomLine @click="showPopup">
					{{cradName}}
				</m-cell>

				<view class="btn">
					<button type="primary" :disabled="btndis" @tap="submit_setup_1">确认</button>
				</view>

				<cc-popup-list ref="ccPopupList" titleText="请选择支付卡" @onSelect="ccSelectResult"></cc-popup-list>
			</view>
		</template>
		
		<!-- 商户状态审核失败 -->
		<template v-else>
			<m-fail :status="cusrometStatus"></m-fail>
		</template>
	</joy-page>
</template>

<script>
	import mFail from "@/components/m-fail/m-fail.vue"
	import mInput from '@/components/m-input/m-input.vue'
	import mCell from '@/components/m-cell/m-cell.vue'
	import ccPopupList from "@/components/m-cc-popup/m-cc-popup.vue"
	export default {
		components: {
			mFail,
			mInput,
			mCell,
			ccPopupList
		},
		data() {
			return {
				joyPageStatus: "",
				cusrometStatus: "",
				cc: {},
				params: {
					amount: ""
				},
			}
		},
		onShow() {
			this.initPage();
		},
		computed: {
			cradName() {
				if (this.cc.bankName == undefined && this.cc.cardNo == undefined) return "选择支付卡";
				let bankName = this.cc.bankName;
				let cardNo = this.cc.cardNo+"";
				return `${bankName}(${cardNo.slice(cardNo.length - 4, cardNo.length)})`;
			},
			btndis(){
				return !(this.params.amount && this.cc.cardNo);
			}
		},
		methods: {
			async initPage() {
				try {
					this.joyPageStatus = "loading";
					this.cusrometStatus = await this.$AppEntryController.customerStatusInterceptor();
					this.joyPageStatus = "success";
					if (this.cusrometStatus != "SUCCESS") return;

					// 获取卡列表
					setTimeout(() => {
						this.$refs.ccPopupList.getCardList()
					}, 0)

				} catch (e) {
					this.joyPageStatus = "fail";
				}
			},

			// 打开popup
			async showPopup() {
				this.$refs.ccPopupList.show();
			},

			// popup选中结果
			async ccSelectResult(card) {
				console.log(card)
				this.cc = card;
			},

			// 获取下单路由 ------ 第一步
			async submit_setup_1() {
				let cardNo = this.cc.cardNo;
				let data = await this.$apis.getPayRoute({
					cardNo: cardNo
				});
				/* data.quickRoute说明：
				 * FORM：返回FORM即使用网关支付，后续需要调用快捷支付(form表单)
				 * JSON：返回JSON即使用无卡支付，后续需要调用下面的用户下单 	
				 */
				if (data.quickRoute === "JSON") {
					this.submit_setup_2(data);
					return;
				}
				if (data.quickRoute === "FORM") {
					// 网关支付...
					return;
				}

				uni.showToast({
					icon: "none",
					title: "获取路由失败"
				})
			},

			// JSON 下单 ------ 第二步
			async submit_setup_2(data) {
				// 验证是，数字或者两位小数，或者一位小数，整数
				if(!/^\d+(\.\d{1,2})?$/.test(this.params.amount)){
					uni.showToast({
						icon:"none",
						title:"请输入正确的金额格式"
					})
					return;
				}
				let sendBody = {};
				sendBody["cardNo"] = data.cardNo;
				sendBody["routeType"] = data.quickRoute;
				// 金额转分
				sendBody["amount"] = this.$mUtils.accMul(this.params.amount,100);
				console.log(sendBody)
				return;

				let res = await this.$apis.postPayOrder(sendBody);
				
				/* 
				 * res.smsFlag说明：
				 * 0:不需短信，不需要密码
				 * 1:需要短信，不需要密码
				 * 2:需要短信，需要密码
				 * 3:不需短信，需要密码
				 */
				
				switch (res.smsFlag){
					case "0":
						break;
					case "1":
						break;
					case "2":
						break;
					case "3":
						break;
					default:
						break;
				}
				
			},
			
			// 用户下单确认 ------ 第三步
			async submit_setup_3(){
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.trade-page {
		// background: #fff;

		.btn {
			width: 90%;
			margin: 30upx auto;
		}
	}
</style>
