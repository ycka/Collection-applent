<template>
	<view class="in_bg page_main">
		<view class="content_in">
			<view class="hello">
				<image class="top-banner" style="width:720upx;" mode="widthFix" src="//cdn.weimob.com/saas/survey/pcstatic/images/theme/header_10.png"></image>
				<tack-two></tack-two>
				<view class="center-clomn mt">
					<van-button plain type="info" @tap="back">上一页</van-button>
					<van-button plain type="info" @tap="next">下一页</van-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tackTwo from '@/components/tack-two'
	import {
		mapState
	} from 'vuex'

	export default {
		components:{
			tackTwo,
		},
		data(){
			return{
				num:0
			}
		},
		methods:{
            next(){
                uni.navigateTo({url: '../train/train'});
            },
            back(){
                uni.navigateBack();
            }
        },
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','person_id']),
		onShow(){
			console.log('--传参数了--',this.person_id)
		},
		onLoad() {
			
		}
	}
</script>

<style>
	
</style>
