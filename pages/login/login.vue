<template>
	<view class="content login-page">
		<view class="h2 border-bottom-1px">
			{{loginTitleTxt}}
		</view>
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<text class="title">手机号：</text>
				<m-input type="number" clearable v-model="params.phoneNo" placeholder="请输入手机号" :maxLength="11" :focus="true"></m-input>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">验证码：</text>
				<m-input type="number" clearable v-model="params.code" placeholder="请输入短信验证码" :maxLength="6"></m-input>
				<view class="sendCode">
					<button size="mini" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
				</view>
			</view>
		</view>
		<view class="tips">
			请输入注册时的手机号
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin" :loading="submitBtnDis" :disabled="submitBtnDis || submitBtnDisKey">登录</button>
		</view>
		<text class="vs">{{copyrightTxt}}</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex'
	import mInput from '@/components/m-input/m-input.vue'
	import graceChecker from '@/common/graceChecker.js'
	import formRuleConfig from '@/config/formRule.config.js'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginTitleTxt: this.$mConfig.loginTitleTxt,
				copyrightTxt: this.$mConfig.copyrightTxt,
				btnDis: false,
				submitBtnDis: false,
				btnText: "发送验证码",
				params: {
					phoneNo:"",
					code:""
				},
				reqBody: {},
				// 如果为登录状态 默认跳转的地址
				redirectRoute: this.$mRoutesConfig.main,
				routeQuery: {}
			}
		},
		onLoad(query) {

			this.initredirectRouteData(query);
		},
		computed: {
			...mapState(["openId"]),
			...mapGetters(['hasLogin']),
			submitBtnDisKey(){
				let checkParams = {};
				checkParams["openId"] = this.openId;
				checkParams["phoneNo"] = this.params.phoneNo;
				checkParams["code"] = this.params.code;
				console.log(checkParams)
				let res = graceChecker.check(checkParams, formRuleConfig.loginRule);
				return !res;
			}
		},
		methods: {
			initredirectRouteData(query) {
				if (query.redirectUrl) {
					this.redirectRoute.path = query.redirectUrl;
					delete query.redirectUrl;
					this.routeQuery = query;
				}
			},

			// 登录
			async bindLogin() {
				try {
					this.reqBody["openId"] = this.openId;
					this.reqBody["phoneNo"] = this.params["phoneNo"];
					this.reqBody["code"] = this.params["code"];

					let checkRes = graceChecker.check(this.reqBody, formRuleConfig.loginRule);
					if (!checkRes) {
						uni.showToast({
							title: graceChecker.error,
							icon: "none"
						});
						return;
					}

					// 校验通过...
					this.submitBtnDis = true;
					let userInfo = await this.$apis.postLogin(this.reqBody);
					this.$store.commit("SET_USERINFO", userInfo || {});

					// 前端自动登录
					this.$store.commit("SET_TOKEN", this.$mConfig.tokenKey);

					this.$mRouter.redirectTo({
						route: this.redirectRoute,
						query: this.routeQuery
					});
				} catch (e) {
					console.log(e)
					this.submitBtnDis = false;
				}
			},

			// 发送验证码
			async sendCode() {

				let checkRes = graceChecker.check(this.params, formRuleConfig.sendCodeRule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return;
				}

				await this.$apis.getMsgCode({
					type: 0,
					phoneNo: this.params.phoneNo
				});
				
				uni.showToast({
					title: '发送成功'
				});
				// 开启倒计时
				this.countDown();
			},

			// 验证码倒计时
			countDown() {
				let t = null;
				let timer = 60;
				this.btnDis = true;
				clearInterval(t);
				this.btnText = `${timer}s`;
				t = setInterval(() => {
					if (timer == 0) {
						clearInterval(t);
						this.btnText = "重新发送";
						this.btnDis = false;
						return;
					}
					timer--;
					this.btnText = `${timer}s`;
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page {
		background: #fff;
		position: relative;
	}

	.h2 {
		font-size: 50upx;
		text-align: center;
		padding: 60upx 0;
	}

	.input-group {
		background-color: #fff;
		// border-radius: 10upx;
		margin-top: 10upx;
	}

	.tips {
		padding-left: 20upx;
		margin-top: 20upx;
		color: #8c8c8c;
		font-size: 26upx;
	}

	.vs {
		position: absolute;
		bottom: 70upx;
		text-align: center;
		width: 100%;
	}

	.sendCode {
		display: flex;
		align-items: center;
		padding-right: 20upx;
		box-sizing: border-box;
		align-items: stretch;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 200upx;
			background: #0faeff;
			color: #fff;
			border-radius: 0;
			font-size: 26upx;
			&::after{
				display: none;
			}
		}
	}
</style>
