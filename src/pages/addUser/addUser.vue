<template>
	<view :class="[styleClass.style_is,'page_main']">
		<custom-header title="添加用户" child></custom-header>
		<view class="content_in" style="margin-top:0;">
			<view v-show="hasLogin" class="hello">
                <style-ought></style-ought>
				<tack-user @set-param="e=>huji=e"></tack-user>
				<!-- <view class="center-clomn mt">
					<van-button plain type="info" @tap="tonext">提交</van-button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import tackUser from '@/components/tack-user'
	import styleOught from '@/components/style-ought'
	import { mapState } from 'vuex'

	export default {
		components:{
			tackUser,
			styleOught
		},
		data(){
			return{
				huji:''
			}
		},
		methods:{
			tonext(){
                console.log(111)
                uni.navigateBack();
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','person_id','styleClass']),
		onShow(){
			console.log('--传参数了--',this.person_id)
		},
		onLoad() {
			
		}
	}
</script>

<style>
	
</style>
