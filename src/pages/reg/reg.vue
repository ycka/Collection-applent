<template>
	<view class="content">
		<custom-header title="注册" child></custom-header>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input type="text" focus clearable v-model="param.user" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">原密码：</text>
				<m-input type="password" displayable v-model="param.oldpossword" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">新密码：</text>
				<m-input type="text" clearable v-model="param.newpossword" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">确认新密码：</text>
				<m-input type="text" clearable v-model="param.sopossword" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">确认修改</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				param:{
					user:'',
					oldpossword:'',
					newpossword:'',
					sopossword:'',
				}
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.param.user.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.param.oldpossword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.param.sopossword != this.param.newpossword) {
					uni.showToast({
						icon: 'none',
						title: '两次输入不统一，请重新输入'
					});
					return;
				}
				let param = {
					aaz024:this.param.user,
					aaz025:this.param.oldpossword,
					newPassword:this.param.newpossword
				}
				this.$store.dispatch('regPassword',param).then(e=>{
					uni.showToast({
						icon: 'none',
						title: '密码修改成功'
					});
				})
				// service.addUser(data);
				uni.showToast({
					title: '修改成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		font-size:32upx;
		width:220upx;
	}
</style>
