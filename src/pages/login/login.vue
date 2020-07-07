<template>
	<view class="content">
		<custom-header title="系统登录" back child></custom-header>
		<view class="login_header">
			劳动力资源信息采集系统
		</view>
		<view class="login_body">
			<van-cell-group>
				<van-fields
					readonly
					:value="selectName"
				>
				<view slot="left-icon" style="margin-right:20rpx;">
					<van-icon size="60rpx"  color="#00e5cb" name="friends" />
				</view>
				<view slot="label" style="width:140upx;">账户类别</view>
				<view slot="right-icon" style="margin-right:20rpx;" @tap="selectOne">
					<van-icon size="60rpx" name="arrow-down"/>
				</view>
				</van-fields>
				<van-fields
					:value="param.userId"
					clearable
					@change="e=>param.userId=e.detail"
					bind:click-icon="onClickIcon"
				>
				<view slot="label" style="width:140upx;">用户账户</view>
				<view slot="left-icon" style="margin-right:20rpx;">
					<van-icon color="#00e5cb" size="60rpx" name="manager" />
				</view>
				</van-fields>

				<van-fields
					:value="param.password"
					:type="passwordType"
					@change="e=>param.password=e.detail"
					:border="false"
				>
				<view slot="label" style="width:140upx;">密码</view>
				<view slot="left-icon" style="margin-right:20rpx;">
					<van-icon size="60rpx" color="#00e5cb" name="lock" />
				</view>
				<view slot="right-icon" style="margin-right:20rpx;" @tap="passwordSee">
					<van-icon size="50rpx" color="#505050" name="browsing-history" />
				</view>
				</van-fields>

				<van-fields
					:value="param.verifyCode"
					clearable
					use-button-slot
					@change="e=>param.verifyCode=e.detail"
				>
					<view slot="label" style="width:140upx;">验证码</view>
					<view slot="left-icon" style="margin-right:20rpx;">
						<van-icon size="60rpx" color="#00e5cb" name="photograph" />
					</view>
					<view slot="right-icon">
						<image @tap="shuaxin" style="width:150upx;display:block;" mode="widthFix" :src="imgurl" ></image>
					</view>
					>
				</van-fields>
				<van-fields
					custom-class="single"
					:value="param.verifyCode"
					clearable
					use-button-slot
					readonly
				>
					<view slot="label" style="width:140upx;">记住密码</view>
					<view slot="left-icon" style="margin-right:20rpx;">
						<van-checkbox
						:value="remember"
						checked-color="#00e5cb"
						@change="onChange"
						>
						</van-checkbox>
					</view>
					<view slot="right-icon" @tap='forgetPassword'>
						忘记账户或密码？
					</view>
					
				</van-fields>
				<van-fields
					custom-class="single"
					clearable
					label=" "
					readonly
				>
				</van-fields>
				
			</van-cell-group>
		</view>
		<!-- <view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view> -->
		<view class="sub">
			<button type="primary" class="primary orge" @tap="bindLogin">登录</button>
		</view>
		<van-action-sheet
		:show="show"
		:actions="select_code['AAZ026']"
		@close="onClose"
		@select="onSelect"
		/>
	</view>
</template>

<script>
	import service from '../../service.js';
	import md5 from '@/components/md5'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				passwordType:'password',
				positionTop: 0,
				isDevtools: false,
				param:{
					userId:'',
					password:'',
					verifyCode:'',
					userType:'',
					// remember:false,
					loginTime:'22-06-29 16:30:23',
					location:'12.6547854,36.2548995'
				},
				remember:false,
				selectName:'',
				show: false,
				actions: [
				{
					name: '选项1',
					value:'01'
				},
				{
					name: '选项2',
					value:'02'
				},
				{
					name: '选项3',
					value:'03'
					// subname: '副文本',
					// openType: 'share',
				},
				],
			}
		},
		computed: mapState(['forcedLogin','imgurl','select_code']),
		methods: {
			...mapMutations(['login']),
			shuaxin(){
				this.$store.dispatch('verifyCode')
			},
			selectOne(){
				this.show = true
			},
			forgetPassword(){
				console.log(`forget password`)
			},
			onChange(){
				this.remember = !this.remember
			},
			onClose() {
				this.show = false
			},
			passwordSee(){
				if(this.passwordType == 'password'){
					this.passwordType = 'text'
				}else{
					this.passwordType = 'password'
				}
			},

			onSelect(event) {
				this.param.userType = event.detail.value
				this.selectName = event.detail.name
				this.show = false
				console.log(event.detail);
			},
			
			async bindLogin() {
				// let param = Object.assign({},this.param,{password:md5(this.param.password)})
				let res = await this.$store.dispatch('login',this.param)
				if(res.data==null){
					wx.showToast({
                        title: res.message,
                        icon: 'none',
					});
					this.shuaxin()
					return
				}else{
					this.$store.commit('set_userInfo',res.data)
					this.$store.commit('login',true)
					uni.reLaunch({
						url: '../main/main',
					});
				}
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
						+ " " + date.getHours() + seperator2 + date.getMinutes()
						+ seperator2 + date.getSeconds();
				return currentdate;
			}
		},
		onReady() {
			this.shuaxin()
		}
	}
</script>

<style lang="scss" scoped>
	.login_header{
		width:750upx;
		height:250upx;
		padding-bottom:50upx;
		background:#5f70ff;
		color:#fff;
		font-size:40rpx;
		display:flex;
		align-items: center;
		justify-content: center;

	}
	.footer{
		width:90%;
		margin:0 auto;
		font-size:28upx;
		position:relative;
		top:-40upx;
		color:#ccc;
	}
	.login_body{
		width:90%;
		margin:0 auto;
		border-radius:20upx;
		position:relative;
		top:-40upx;
		overflow:hidden;
	}
	.sub{
		width:500upx;
		margin:0 auto;
		position:relative;
		top:-100upx;
	}
	.orge{
		border-radius:80upx;
		background:#5f70ff;
	}
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
