<template>
	<view :class="[styleClass.style_is,'page_main']">
		<custom-header title="添加用户" child></custom-header>
		<view class="content_in" style="margin-top:0;">
			<view v-show="hasLogin" class="hello">
                <style-ought></style-ought>
				<tack-system @set-param="e=>huji=e"></tack-system>
				
			</view>
		</view>
	</view>
</template>

<script>
	import tackSystem from '@/components/tack-system'
	import styleOught from '@/components/style-ought'
	import { mapState } from 'vuex'

	export default {
		components:{
			tackSystem,
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
