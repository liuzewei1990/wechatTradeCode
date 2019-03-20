<template>
	<view class="content cc-add">
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<text class="title">卡号</text>
				<m-input type="text" clearable v-model="params.cardNo" placeholder="请输入卡号" :maxLength="30" :focus="true" @input="formatCardNo"></m-input>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">开户名</text>
				<m-input type="text" clearable v-model="params.accountName" placeholder="请输入开户名称" :maxLength="30"></m-input>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">预留手机号</text>
				<m-input type="number" clearable v-model="params.reservedPhoneNo" placeholder="请输入手机号" :maxLength="11"></m-input>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">身份证号</text>
				<m-input type="text" clearable v-model="params.idCard" placeholder="请输入持卡人身份证号" :maxLength="18"></m-input>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">银行名称</text>
				<m-input type="text" clearable v-model="params.bankName" placeholder="请输入银行名称" :maxLength="30"></m-input>
			</view>

			<view class="cc-add__btn">
				<button type="primary" @tap="addsSubmit">添加</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mInput from '@/components/m-input/m-input.vue'
	import formRule from "@/config/formRule.config.js"
	import graceChecker from '@/common/graceChecker.js'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				params: {
					cardNo:"",
					accountName:"",
					reservedPhoneNo:"",
					idCard:"",
					bankName:""
				},
				reqBody: {}
			}
		},
		methods: {
			async addsSubmit() {
				this.reqBody["cardNo"] = (this.params["cardNo"] + "").replace(/\s+/g, "");
				this.reqBody["accountName"] = this.params["accountName"];
				this.reqBody["reservedPhoneNo"] = this.params["reservedPhoneNo"];
				this.reqBody["idCard"] = this.params["idCard"];
				this.reqBody["bankName"] = this.params["bankName"];
				let cheRes = graceChecker.check(this.reqBody, formRule.ccAddRule);
				if (!cheRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return;
				}

				await this.$apis.postCard(this.reqBody);
				this.$mRouter.back();
			},

			// 格式化银行卡
			formatCardNo(e) {
				this.params.cardNo = this.$mUtils.formatCardNo(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc-add {
		background: #fbfbfb;

		&__btn {

			padding: 50upx;

			button {
				background: #fe6812;
				color: #fff;
			}
		}
	}
</style>
