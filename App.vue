<script>
	export default {
		onLaunch: function(o) {
			console.log('App Launch', o);

			this.$AppEntryController.getWeChatOpenId();
			// #ifdef H5
			this.$AppEntryController.handleH5BrowserAddressBarAuth();
			// #endif
		},
		onShow: function(o) {
			console.log('App Show', o);
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	body,
	page {
		min-height: 100%;
		display: flex;
		font-size: 32upx;
	}

	body.modal-open {
		position: fixed;
		width: 100%;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		width: 100%;
	}

	.pad-10 {
		padding: 10upx;
	}

	.mt-10 {
		margin-top: 10upx;
	}
	
	.ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		background: #fff;
	}

	.input-row .title {
		width: 25%;
		padding: 20upx 0;
		padding-left: 20upx;
		line-height: 50upx;
	}

	.border-1px {
		position: relative;

		&::before {
			position: absolute;
			z-index: 1;
			right: 0;
			top: 0;
			left: 0upx;
			height: 1upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e2e2e2;
		}

		&::after {
			position: absolute;
			z-index: 1;
			right: 0;
			bottom: 0;
			left: 0upx;
			height: 1upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e2e2e2;
		}
	}

	.border-bottom-1px {
		position: relative;

		&::after {
			position: absolute;
			z-index: 1;
			right: 0;
			bottom: 0;
			left: 20upx;
			height: 1upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e2e2e2;
		}
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
