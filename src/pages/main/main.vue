<template>
	<view class="in_bg page_main">
		<view class="content_in">
			<view v-if="hasLogin" class="hello">
				<view class="title">
					您好 {{userName}}，您已成功登录。
				</view>
				<view class="ul">
					<view> </view>
					<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
					<van-button type="primary">按钮</van-button>
				</view>
			</view>
			<view v-if="!hasLogin" class="hello">
				<image class="top-banner" style="width:720upx;" mode="widthFix" src="//cdn.weimob.com/saas/survey/pcstatic/images/theme/header_10.png"></image>
				<van-notice-bar
				left-icon="volume-o"
				text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
				backgroundColor="rgba(255,255,255,.5)"
				color="#000"
				/>
				<view class="style_su">
					<view @tap="color(1)" class="style_one style_child"></view>
					<view @tap="color(2)" class="style_two style_child"></view>
					<view @tap="color(3)" class="style_three style_child"></view>
				</view>
				<tack-one @set-param="e=>huji=e"></tack-one>
				<view class="center-clomn mt">
					<van-button v-if="num<3"  plain type="info" @tap="tonext">下一页</van-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import services from '../../components/public.js'
	import tackOne from '@/components/tack-one'
	import {
		mapState
	} from 'vuex'

	export default {
		components:{
			tackOne,
		},
		mixins:[services],
		data(){
			return{
				num:0,
				huji:''
			}
		},
		methods:{
			tonext(){
				if(this.huji=='1'){
					uni.navigateTo({url: '../countryside/countryside'});
				}else{
					uni.navigateTo({url: '../city/city'});
				}
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','person_id']),
		onShow(){
			console.log('--传参数了--',this.person_id)
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.navigateTo({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	
</style>
