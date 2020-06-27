<template>
  <div>
    <view class="custom" :style="{'height':statusBarHeight+'px'}">
      <view :style="{'width':'100%','height':(statusBarHeight-45)+'px'}"></view>
      <view class="title">系统管理</view>
    </view>

    <div class="panel">
      <div class="toppanel">
        <div class="avatarpanel">
          <img class="avatar" :src="yonghuwx.avatarUrl" style="border:1px solid #ebebeb;"/>
          <div class="name">登录用户：小明</div>
        </div>
        <view style="width:100%;">
            <van-cell title="账号管理" is-link 
              link-type="navigateTo"
              url="../user/user"
            />
            <van-cell 
              title="密码设置" 
              is-link 
              link-type="navigateTo"
              url="../reg/reg"
          />
            <van-cell title="系统设置" is-link />
            <van-cell title="系统公告" is-link />
            <van-cell title="提示信息" is-link />
            <van-cell title="清理测试数据" is-link />
        </view>
      </div>
    </div>
  </div>
  
</template>

<script>

  export default {
    data () {
      return {
        statusBarHeight:0,
        yonghuwx:''
      }
    },
    onLoad: function (options) {
      var that = this
      uni.getSystemInfo({
        success: function (res) {
          console.log(res)
          console.log(res.statusBarHeight)
          that.statusBarHeight = res.statusBarHeight+45
        },
      })
      uni.login({
				provider: 'weixin',
				success(loginRes) {
					// 获取用户信息				
					uni.getUserInfo({
						provider: 'weixin',
						success(infoRes) {				
							that.yonghuwx = infoRes.userInfo
							console.log(that.yonghuwx)
            },
            fail(err){
              console.log(err)
            }
            
					});
        },
        fail(err){
          console.log(err)
        }
			});
    },
    computed: {
      userIfo(){
          return this.$store.state.userInfo
      }
    },
    components: {
    },
    methods: {
      updatainfo(){
        wx.navigateTo({
          url: '/pages/memberinfo/main'
        })
      }
    },
    mounted () {
    },
    created () {

    }
  }
</script>

<style scoped lang='scss'>
  .custom{
    width: 100%;
    background: #5f70ff;
    .title{
      text-align:left;
      color:#fff;
      line-height:45px;
      text-indent: 20upx;
      font-size:32upx;
    }
  }
  .panel {
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,1);
    .toppanel {
      width:750rpx;
    //   height:559rpx;
    //   background:linear-gradient(180deg,rgba(119,190,255,1) 0%,rgba(44,195,248,1) 100%);
      .avatarpanel{
        display:flex;
        align-items:center;
        border-bottom:1px solid #ebebeb;
        height:120upx;
        padding-left:20upx;
        .avatar {
          width:100upx;
          height:100upx;
          border-radius:50%;
        }
      }
      .name {
        padding-left: 30upx;
        font-size:32rpx;
        font-family:Noto Sans S Chinese;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
      .level {
        margin-top: 28rpx;
        width: 144rpx;
        height: 48rpx;
        background: rgba(0,234,195,1);
        border-radius: 10rpx;
        font-size: 22rpx;
        font-family: Noto Sans S Chinese;
        font-weight: 400;
        line-height: 48rpx;
        color: rgba(255,255,255,1);
        text-align: center
      }
    }
    .bottompanel {
      width:750rpx;
      height: 200rpx;
      position:relative;
      .bfinput {
        width: 670rpx;
        height: 120rpx;
        position: absolute;
        left: 40rpx;
        top: -60rpx;
        background:rgba(255,255,255,1);
        box-shadow:0rpx 5rpx 10rpx rgba(5,5,5,0.08);
        display:flex;
        align-items:center;
        border-radius:10rpx;
        img {
          width: 40rpx;
          height: 40rpx;
          margin-left: 43rpx;
        }
        .sp1 {
          margin-left: 11rpx;
          font-size:32rpx;
          font-family:Noto Sans S Chinese;
          font-weight:400;
          color:rgba(53,53,53,1);
        }
        .sp2 {
          margin-left: 237rpx;
          font-size:22rpx;
          font-family:Noto Sans S Chinese;
          font-weight:400;
          color:rgba(178,178,178,1);
          opacity:0.6;
        }
        .sp3 {
          margin-left: 8rpx;
          font-size:40rpx;
          font-family:Noto Sans S Chinese;
          font-weight:400;
          color:rgba(178,178,178,1);
        }
      }
    }
  }
</style>
