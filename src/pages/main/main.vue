<template>
	<view :class="[styleClass.style_is,'page_main']">
		<custom-header title="数据采集"></custom-header>
		<view class="content_in">
			<view v-show="hasLogin" class="hello">
				<image class="top-banner" style="width:720upx;display:block;" mode="widthFix" src="/static/img/WechatIMG16.jpeg"></image>
				<van-notice-bar
					text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
					backgroundColor="rgba(255,255,255,.5)"
					color="#000"
				>
					<view slot="left-icon">公告：</view>
				</van-notice-bar>
				<style-ought></style-ought>
				<tack-one @set-param="e=>huji=e"></tack-one>
				
			</view>
		</view>
	</view>
</template>

<script>
	import tackOne from '@/components/tack-one'
	import styleOught from '@/components/style-ought'
	import { mapState } from 'vuex'
	import service from '@/service'

	export default {
		components:{
			tackOne,
			styleOught
		},
		data(){
			return{
				num:0,
				huji:''
			}
		},
		methods:{
			
		},
		computed: mapState(['select_code', 'hasLogin', 'userName','userInfo','styleClass']),
		onShow(){
			console.log('--传参数了--',this.userInfo)
			if(Object.keys(this.select_code).length==0) this.$store.dispatch('getData')
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
                success(res) {
					let statusBarHeight = res.statusBarHeight+45
					self.$store.commit('setHeight',statusBarHeight)
                },
			})
			this.$store.commit('set_isLogin',service.getUsers())
			if(service.getUsers().length>0) this.$store.commit('init_userInfo',service.getUsers()[0])
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
				// uni.showModal({
				// 	title: '未登录',
				// 	content: '您未登录，需要登录后才能继续',
				// 	/**
				// 	 * 如果需要强制登录，不显示取消按钮
				// 	 */
				// 	showCancel: !this.forcedLogin,
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			/**
				// 			 * 如果需要强制登录，使用reLaunch方式
				// 			 */
				// 			if (this.forcedLogin) {
				// 				uni.navigateTo({
				// 					url: '../login/login'
				// 				});
				// 			} else {
				// 				uni.navigateTo({
				// 					url: '../login/login'
				// 				});
				// 			}
				// 		}
				// 	}
				// });
			}
			
		}
	}
</script>

<style>
	
</style>
