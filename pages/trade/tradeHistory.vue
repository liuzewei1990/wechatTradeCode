<template>
	<joy-page :joyPageStatus="joyPageStatus">
		<template v-if="status == '暂无数据'">
			<m-empty-data :coverUrl="no_order_1" noTxt="暂无相关记录"></m-empty-data>
		</template>
		<template v-else>
			<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="title">
					<view class="name">
						{{item.bankName}}
					</view>
					<view class="amount">
						￥{{item.amount}}
					</view>
				</view>
				<view class="time">
					<view class="date">
						{{item.createTime}}
					</view>
					<view class="status" :class="item.status">
						{{dataStatus[item.status]}}
					</view>
				</view>
			</view>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</template>
	</joy-page>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mEmptyData from "@/components/m-empty-data/m-empty-data.vue"
	export default {
		components: {
			uniLoadMore,
			mEmptyData
		},
		computed: {
			// 返回true禁用下拉加载
			infiniteDisabled() {
				return this.status == '请求中' || this.status == '没有更多' || this.status == '暂无数据';
			}
		},
		data() {
			return {
				no_order_1:this.$mAssetsPath.no_order_1,
				joyPageStatus: "loading",
				status: "",
				query: {
					limit: 20,
					page: 1
				},
				dataStatus: {
					SUCCESS: "交易成功",
					PAY_WAIT: "待支付",
					FAIL: "交易失败"
				},
				list: []
			};
		},
		onLoad() {
			this.initPage();
		},
		onPullDownRefresh() {
			this.loadTop();
		},
		onReachBottom() {
			this.loadBottom();
		},
		methods: {
			async initPage() {
				try {
					this.query.page = 1;
					let data = await this.$apis.getTradeList(this.query);
					this.list = this.list.concat(data.data || []);
					this.changeStatus(data);
					this.joyPageStatus = "success";
				} catch (e) {
					this.joyPageStatus = "fail";
				}
			},

			//下拉刷新操作
			async loadTop() {
				try {
					this.query.page = 1;
					let data = await this.$apis.getTradeList(this.query);
					setTimeout(() => {
						this.list = data.data || [];
						this.changeStatus(data);
						uni.stopPullDownRefresh();
					}, 500);
				} catch (e) {
					uni.stopPullDownRefresh();
				}
			},

			//上拉加载操作
			async loadBottom() {
				console.log("infiniteDisabled:", this.infiniteDisabled)
				if (this.infiniteDisabled) {
					return;
				};
				if (this.status == '请求失败') {
					this.reLoad();
					return;
				}
				try {
					this.query.page++;
					this.status = "请求中";
					let data = await this.$apis.getTradeList(this.query);
					this.list = this.list.concat(data.data || []);
					this.changeStatus(data);
				} catch (error) {
					this.status = "请求失败";
				}
			},

			// 网络错误 重新加载
			async reLoad() {
				try {
					if (this.query.page == 1) this.query.page++;
					this.status = "请求中";
					let data = await this.$apis.getTradeList(this.query);
					this.list = this.list.concat(data.data || []);
					this.changeStatus(data);
				} catch (error) {
					this.status = "请求失败";
				}
			},

			// 修改请求状态
			changeStatus(data) {
				if (this.list.length === 0) {
					this.status = "暂无数据";
				} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
					this.status = "没有更多";
				} else {
					this.status = "请求更多";
				}
			},

			// 跳转detail页面
			toDetail(detail) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.tradeDetail,
					query: {
						detailDate: encodeURIComponent(JSON.stringify(detail))
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		background: #fff;
		padding: 20upx;
		flex-direction: column;
		margin-top: 10upx;
		color: #333;

		.title,
		.time {
			display: flex;
			padding: 5upx 0;
		}

		.name {
			flex: 1;
			font-weight: 600;
			font-size: 30upx;
		}

		.amount {
			font-weight: 600;
			font-size: 30upx;
		}

		.date {
			flex: 1;
			color: #888;
			font-size: 28upx;
		}

		.status {
			border-radius: 500upx;
			background: red;
			padding: 0upx 16upx;
			color: #fff;
			font-size: 25upx;
			display: flex;
			align-items: center;
		}

		.SUCCESS {
			background: #44bf1a;
		}

		.PAY_WAIT {
			background: #969696;
		}

		.FAIL {
			background: #f92c2c;
		}
	}

	.load-more-box {
		height: 120upx;
	}
</style>
