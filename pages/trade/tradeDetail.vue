<template>
	<joy-page class="tradeDetail-page">
		<view class="border-1px">
			<m-cell title="订单号" bottomLine>{{detailDate.orderNo}}</m-cell>
			<m-cell title="银行名称" bottomLine>{{detailDate.bankName}}</m-cell>
			<m-cell title="银行帐号" bottomLine>
				<view class="format-card">
					<m-format-card :isStar="true" :cardNo="detailDate.accountNo"></m-format-card>
				</view>
			</m-cell>
			<m-cell title="交易金额" bottomLine>￥{{detailDate.amount}}</m-cell>
			<m-cell title="交易时间" bottomLine>{{detailDate.createTime}}</m-cell>
			<m-cell title="交易状态">{{status[detailDate.status]}}</m-cell>
		</view>
	</joy-page>
</template>

<script>
	import mCell from "@/components/m-cell/m-cell.vue"
	import mFormatCard from "@/components/m-format-card/m-format-card.vue"
	export default {
		components: {
			mCell,
			mFormatCard
		},
		data() {
			return {
				status: {
					SUCCESS: "交易成功",
					PAY_WAIT: "待支付",
					FAIL: "交易失败"
				},
				detailDate: {}
			};
		},
		onLoad(params) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.detailDate = JSON.parse(decodeURIComponent(params.detailDate));
			} catch (error) {
				this.detailDate = JSON.parse(params.detailDate);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tradeDetail-page {
		.format-card{
			display: flex;
			align-items: center;
			justify-content:space-between;
		}
	}
</style>
