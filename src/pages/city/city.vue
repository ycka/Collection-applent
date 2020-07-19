<template>
	<view :class="[styleClass.style_is,'page_main']">
		<custom-header title="城镇人员" child></custom-header>
		<view class="content_in">
			<view class="hello">
				<image class="top-banner" style="width:720upx;display:block;" mode="widthFix" src="/static/img/WechatIMG16.jpeg"></image>
				<van-notice-bar
					text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
					backgroundColor="rgba(255,255,255,.5)"
					color="#000"
				>
					<view slot="left-icon">公告：</view>
				</van-notice-bar>
				<style-ought></style-ought>
				<tack-three v-if="show"></tack-three>
				
			</view>
		</view>
	</view>
</template>

<script>
	import tackThree from '@/components/tack-three'
	import styleOught from '@/components/style-ought'
	import { mapState } from 'vuex'

	export default {
		components:{
			tackThree,
			styleOught
		},
		computed: mapState(['styleClass','at']),
		data(){
			return{
				num:0,
				show:true
			}
		},
		methods:{
            
        },
		onShow(){
			this.show = true
		},
		destroy(){
			if(this.at!=1) this.show = false
		},
		onLoad() {
			
		}
	}
</script>

<style>
	
</style>
