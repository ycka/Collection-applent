<template>
	<view class="content">
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
						<image @tap="shuaxin" style="width:150upx;display:block;" mode="widthFix" :src="img" ></image>
					</view>
					>
				</van-fields>
				<van-fields
					custom-class="single"
					:value="param.verifyCode"
					clearable
					use-button-slot
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
		<view class="footer">
			温馨提示：XXXXXXXXXXXXX
		</view>
		<!-- <view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view> -->
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				<button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
			</view>
		</view> -->
		<van-action-sheet
		:show="show"
		:actions="actions"
		@close="onClose"
		@select="onSelect"
		/>
	</view>
</template>

<script>
	import service from '../../service.js';
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
				img:'http://223.100.130.116:7171/ahiru/login/verifyCode',
				param:{
					userId:'',
					password:'',
					verifyCode:'',
					userType:'',
					// remember:false,
					loginTime:'',
					location:''
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
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			shuaxin(){
				this.img = this.img+'?id='+parseInt(Math.random()*100)
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
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				this.$store.dispatch('login',this.param)

				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				// const data = {
				// 	account: this.account,
				// 	password: this.password
				// };
				// const validUser = service.getUsers().some(function(user) {
				// 	return data.account === user.account && data.password === user.password;
				// });

				// if (validUser) {
				// 	this.toMain(this.account);
				// } else {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '用户账号或密码不正确',
				// 	});
				// }
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userId) {
				this.login(userId);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
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
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
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
