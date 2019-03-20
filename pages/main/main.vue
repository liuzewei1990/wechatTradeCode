<template>
	<joy-page class="">
		<m-swiper :list="banner"></m-swiper>

		<uni-grid :data="grid" show-border="false" @click="handleClickGrid"></uni-grid>

		<m-ad :list="adList"></m-ad>

		<uni-card title="推荐办卡">
			<image class="ka" v-for="(item,index) in ka" :key="index" :src="item.image" mode=""></image>
		</uni-card>
	</joy-page>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	import mSwiper from "@/components/m-swiper/m-swiper.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniCard from "@/components/uni-card/uni-card.vue"
	import mAd from "@/components/m-ad/m-ad.vue"
	export default {
		components: {
			mSwiper,
			uniGrid,
			uniCard,
			mAd
		},
		computed: {
			...mapState(['forcedLogin']),
			...mapGetters(['hasLogin'])
		},
		data() {
			return {
				banner: [],
				grid: [],
				ka: [],
				adList: []
			}
		},
		async onLoad(query) {
			
			console.log("APP进入首页");
			await this.$AppEntryController.main(query);
			this.getBanners();
			this.getGrids();
			this.getAd();
			this.getKa();
		},
		methods: {

			handleClickGrid(o) {
				this.$mRouter.push({
					route: this.grid[o.index].path,
					query: {
						id: 1
					}
				})
			},

			getBanners() {
				this.banner = [{
					src: this.$mAssetsPath.banner_1,
					url: ""
				}, {
					src: this.$mAssetsPath.banner_1,
					url: ""
				}, {
					src: this.$mAssetsPath.banner_1,
					url: ""
				}]
			},

			getGrids() {
				this.grid = [{
					image: this.$mAssetsPath.grid_1,
					text: '信用卡申请',
					path: this.$mRoutesConfig.ccApply
				}, {
					image: this.$mAssetsPath.grid_2,
					text: '商户收款',
					path: this.$mRoutesConfig.trade
				}, {
					image: this.$mAssetsPath.grid_3,
					text: '收款记录',
					path: this.$mRoutesConfig.tradeHistory
				}, {
					image: this.$mAssetsPath.grid_4,
					text: '信用卡管理',
					path: this.$mRoutesConfig.ccList
				}, {
					image: this.$mAssetsPath.grid_5,
					text: '我的推广码',
					path: this.$mRoutesConfig.promoCode
				}, {
					image: this.$mAssetsPath.grid_6,
					text: '个人中心',
					path: this.$mRoutesConfig.user
				}]
			},

			getKa() {
				this.ka = [{
					image: this.$mAssetsPath.ka_1,
					url: ""
				}, {
					image: this.$mAssetsPath.ka_2,
					url: ""
				}]
			},

			getAd() {
				this.adList = [{
					src: this.$mAssetsPath.ad_1,
					url: ""
				}, {
					src: this.$mAssetsPath.ad_2,
					url: ""
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ka {
		width: 100%;
		height: 260upx;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			transform-origin: center;
			box-sizing: border-box;
			pointer-events: none;
			top: -50%;
			left: -50%;
			right: -50%;
			bottom: -50%;
			border-bottom: 1px solid $uni-border-color;
			transform: scale(.5);
		}
	}
</style>
