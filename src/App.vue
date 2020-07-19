<script>
	export default {
		data(){
			return{
				param:{
					longitude:'',
					latitude:''
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');

            let sely = this
            //获取定位
            // wx.getLocation({
            //     type: 'wgs84',
            //     success(res) {
            //         let {longitude,latitude} = res;
            //         console.log({longitude,latitude})
            //         sely.param.longitude = res.longitude
			// 		sely.param.latitude = res.latitude
			// 		sely.$store.dispatch('location',sely.param)
            //     },
            //     fail(){
            //     wx.showModal({
            //         title: '温馨提示',
            //         content: '获取定位失败，请前往设置打开定位权限',
            //         confirmText: '设置',
            //         success(res) {
            //             if (res.confirm) {
            //                 wx.openSetting({
            //                     success: function (res) {
            //                         if (res.authSetting["scope.userLocation"]) {
            //                             wx.getLocation({
            //                                 type: 'wgs84',
            //                                 success(res) {
            //                                     let {longitude,latitude} = res;
            //                                     sely.param.longitude = res.longitude
			// 									sely.param.latitude = res.latitude
			// 									sely.$store.dispatch('location',sely.param)
            //                                 }
            //                             })
            //                         }else{
            //                             wx.navigateBack({
            //                                 delta: 1
            //                             })
            //                         }
            //                     }
            //                 })
            //             } else if (res.cancel) {
            //                 wx.navigateBack({
            //                     delta: 1
            //                 })
            //             }
            //         }
            //     })
            //     }
            // })
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
	@import "/wxcomponents/vant/dist/common/index.wxss";

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 40upx;
		box-sizing:border-box;
	}
	.text-center{
		text-align: center;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fff;
	}
	.content_in{
		width:750upx;
		padding:15upx 6upx;
		background-color: none;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow:hidden;
		border-radius:12upx;
		padding:0 0 20upx 0;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}
	.position-center{
		display:flex;
		align-items: center;
		justify-content: center;
	}


	.page-section {
        box-sizing: border-box;
        width: 100%;
        padding: var(--cell-vertical-padding,0px) var(--cell-horizontal-padding,16px);
        font-size: 32upx;
        font-size: var(--cell-font-size,32upx);
        line-height: 24px;
        line-height: var(--cell-line-height,24px);
        color: #fff;
        color: var(--cell-text-color,#fff);
        background:rgba(0,0,0,0);
		margin:60upx 0 0 0;
        .weui-cells{
            border-bottom: 1px solid #ebedf0;
            padding: 20upx 32upx 20upx 0;
            background:#fff;
            border-radius: 10upx;
            overflow:hidden;
            .weui-cell{
                padding:0 40upx;
                .weui-input{
                    color:#505050;
                }
            }
        }
        .weui-cells__title{
            padding: 10px 16px 10px 0;
        }
        .weui-cells__title{
            display:flex;
            .required{
                color:#fff;
            }
        }
		
		.van-checkbox{
			color:#fff;
			border:1upx solid #fff;
			flex:1;
			height:100upx;
			line-height:100upx;
			padding-left:20upx;
			border-top:0;
			.van-checkbox__label{
				color:#fff;
			}
		}

    }
    .page-section:after {
        box-sizing: border-box;
        -webkit-transform-origin: center;
        transform-origin: center;
        content: " ";
        pointer-events: none;
        top: auto;
        right: 0;
        bottom: 0;
        left: 16px;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);

    }
	.center-clomn{
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
    }
    .radio-two{
        box-sizing: border-box;
        width: 100%;
        font-size: 32upx;
        font-size: var(--cell-font-size, 32upx);
        line-height: var(--cell-line-height, 48upx);
        color: #323233;
        color: var(--cell-text-color, #323233);
		background:rgba(0,0,0,0)!important;
		padding:0!important;
		van-radio{
			color:#fff;
			border:1upx solid #fff;
			flex:1;
			height:100upx;
			line-height:100upx;
			padding-left:20upx;
			padding-top:0!important;
			padding-bottom:0!important;
			.van-radio{
				height:100%;
				padding:0 0 0 20upx!important;
				.van-radio__label{
					color:#fff;
				}
			}
		}
		van-radio:nth-of-type(2){
			border-left:0;
		}
		
    }
	.radio_some_top{
		width:100%;
		height:3upx;
		background:#fff;
		flex:1;
	}
	.radius--radio_some{
		color:#fff;
		border:1upx solid #fff;
		flex:1;
		height:100upx;
		line-height:100upx;
		padding-left:20upx;
		border-top:0;
		.van-radio__label{
			color:#fff;
		}
	}
	.page_main{
		.van-cell{
			// background:rgba(0,0,0,0);
			// color:#fff;
			// border:1upx solid #fff;
			padding: 20rpx 32rpx 10px 0!important;
			border-top:0;
			min-height:100upx;
			.van-cell__title{
				padding-left:40upx;
			}
			border-radius:10upx;
		}
		.van-cell:nth-of-type(1){
			// border-top:1px solid #fff;
		}
		.van-button--plain{
			background:rgba(0,0,0,0)!important;
			min-width: 350upx;
		}
		.van-hairline--top-bottom:after {
			border-width:0!important;
		}

	}
	.van-radio {
        padding:8upx 0upx;
		padding-left:5%;
    }
	.in_bg{
		min-height: 100%;
		display: flex;
		font-size: 32upx;
		background-image: url(//cdn.weimob.com/saas/survey/pcstatic/images/theme/bg_10.png);
		background-size:cover;
		background-attachment:fixed ;
		padding:0 15upx 6upx 15upx;
		box-sizing:border-box;
	}
	.placeholder{
		font-size:36upx;
		line-height:82upx;
	}
	.hello{
		.mt{
			margin-top:60upx;
		}
	}
	.no-margin{
		margin:0!important;
	}
	.style_su{
		height:20upx;
		width:100%;
		display:flex;
			
		.style_child{
			flex:1;
			height:20upx;
		}
		
	}
	.style_one,.style_four{
		.page-section{
			color:#505050;
			.weui-cells__title{
				display:flex;
				.required{
					color:#505050;
				}
			}
		}
		.radius--radio_some{
			color:#505050;
			border:1upx solid #505050;
			border-top:0;
			.van-radio__label{
				color:#505050;
			}
		}
		.radius--radio_two{
			color:#505050;
			.van-radio__label{
				color:#505050!important;
			}
		}
		.radio-two{
			van-radio{
				color:#505050;
				border:1upx solid #505050;
			}
			van-radio:nth-of-type(2){
				border-left:0!important;
			}
		}
		
		.radio_some_top{
			background:#505050;
		}
		.van-checkbox{
			color:#505050;
			border:1upx solid #505050;
			border-top:0;
			.van-checkbox__label{
				color:#505050;
			}
		}
		
	}
	.style_one{
		background:#c4c4c4;
	}
	.style_two{
		background:#091253;
	}
	.style_three{
		background:#4357eb
	}
	.style_four{
		background:#f0ba00
	}

	.van-checkbox__icon {
		border-color:#fff!important;
	}
	.van-radio__icon {
		border-color:#fff!important;
	}
	.btn-groups{
		.van-button{
			margin:20upx;
		}
	}
	.required{
		padding-right:10upx;
	}
	.f36{
		font-size:36upx!important;
	}
	.none{
		display:none;
	}
	.sdfe{
		.van-checkbox__icon-wrap{
			border:2upx solid #ebebeb!important;
			border-radius:50%;
		}
	}
</style>
