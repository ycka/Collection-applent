
<template>
    <view class="content">
        <custom-header title="采集统计"></custom-header>
        <view class="view-group">
            <view class="tj_bg">
                <h3 style="color:#fff;padding:40upx;padding-bottom:0">沈阳市采集实时数据</h3>
                <view class="tj">
                    <view class="tj_title">截止2020-05-21 18:50:22 数据统计</view>
                    <view class="tj_btn">刷新统计数据</view>
                </view>
                <view class="view-item tj">
                    <view class="item-child">
                        <view class="tj_t">34</view>
                        <view class="tj_b">今天</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">34</view>
                        <view class="tj_b">近七天</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">34</view>
                        <view class="tj_b">本周</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">34</view>
                        <view class="tj_b">本月</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">34</view>
                        <view class="tj_b">累计</view>
                    </view>
                </view>
            </view>
            <van-panel title="进度统计表">
                <view class="view-item" style="background:#fff;">
                    <view class="item-child">沈阳市</view>
                    <view class="item-child">今日</view>
                    <view class="item-child">本周</view>
                    <view class="item-child">近七天</view>
                    <view class="item-child">本月</view>
                    <view class="item-child">累计</view>
                </view>
                <view class="view-item" v-for="(obj,idx) in tabledata" :key="idx">
                    <view class="item-child">{{obj.name}}</view>
                    <view class="item-child">{{obj.today}}</view>
                    <view class="item-child">{{obj.tos}}</view>
                    <view class="item-child">{{obj.seven}}</view>
                    <view class="item-child">{{obj.month}}</view>
                    <view class="item-child">{{obj.all}}</view>
                    <view class="item-child-position"> <van-icon name="arrow" /></view>
                </view>
            </van-panel>
            
            <view class="view-item">
                <view class="btn">查看更多</view>
            </view>
            <view class="qiun-charts">
                <!-- 区域图 -->
                <van-panel title="进度统计图">
                    <van-tabs :active="actives" @change="onChanges">
                        <van-tab title="区域" disabled></van-tab>
                        <van-tab title="今天"></van-tab>
                        <van-tab title="近七天"></van-tab>
                        <van-tab title="本周"></van-tab>
                        <van-tab title="本月"></van-tab>
                        <van-tab title="累计"></van-tab>
                    </van-tabs>
                    <canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing" style="height:500upx;"></canvas>
                </van-panel>
                
            </view>
            <view class="qiun-charts">
                <!-- 区域图 -->
                <van-panel title="位置地图">
                    <view class="view-item">
                        <view class="item-child">采集人</view>
                        <view class="item-child">今日</view>
                        <view class="item-child">本周</view>
                        <view class="item-child">近七天</view>
                        <view class="item-child">本月</view>
                        <view class="item-child">累计</view>
                    </view>
                    <view class="view-item">
                        <view class="item-child">小张</view>
                        <view class="item-child">1</view>
                        <view class="item-child">22</view>
                        <view class="item-child">77</view>
                        <view class="item-child">213</view>
                        <view class="item-child">7865</view>
                    </view>
                    <map
                        id="map"
                        :longitude="longitude"
                        :latitude="latitude"
                        scale="14"
                        :controls="controls"
                        :markers="markers"
                        @markertap="markertap"
                        show-location
                        class="mapheight"
                    ></map>
                </van-panel>
                
            </view>
            <!-- 柱状图 -->
            <!-- <div class="qiun-charts">
                <van-panel title="标题">
                    <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn" style="height:500upx;"></canvas>
                </van-panel>
                
            </div> -->
        </view>
    </view>
</template>

<script>
    import uCharts from '@/components/uchart.js';
    import { mapState } from 'vuex'
    var canvaColumn = null;
    var _self;
	var canvaRing = null;
    export default {
        computed: {
            ...mapState(['single_user','userInfo','select_code','dbdata']),
        },
        data(){
            return{
                markers: [],
                latitude: 40.013305,  //纬度
            　　 longitude: 118.685713,  //经度
        　　　　　　//scale：5，//最小数，缩放范围最大，可见程度最大
        　　　　　　//scale：18，//最大数，缩放范围最小，可见程度最小
                tabledata:[
                    {
                        name:'和平区',
                        today:'22',
                        tos:'33',
                        seven:'32',
                        month:'11',
                        all:'123'
                    },
                    {
                        name:'和平区',
                        today:'22',
                        tos:'33',
                        seven:'32',
                        month:'11',
                        all:'123'
                    },
                    {
                        name:'和平区',
                        today:'22',
                        tos:'33',
                        seven:'32',
                        month:'11',
                        all:'123'
                    },
                ],
                cWidth: "", //宽度
                cHeight: "", //高度
                pixelRatio: 1, //设备像素比
                actives:1
            }
        },
        onLoad() {
            let param = {
                aaz024:this.userInfo.aaz024,
                aaa020:this.userInfo.aaa020,
                aaz026:this.userInfo.aaz026
            }
            this.$store.dispatch('db',param)
			// _self = this;
			// this.cWidth=uni.upx2px(750);
			// this.cHeight=uni.upx2px(500);
			// this.getServerData();
        },
        created() {
            var systemInfo = wx.getSystemInfoSync();
            // this.cWidth = systemInfo.windowWidth; //可使用窗口宽度，
            // this.cHeight = 500 / 750 * systemInfo.windowWidth;
            _self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

        },
  
        methods: {
            markertap(e) {
                // if(this.clickType==0){
                //     this.clickType = 1
                //     this.opendetail( this.listdata[e.mp.markerId])
                // }
                this.markers.map(ob=>{
                    if(ob.id==e.markerId){
                        ob.iconPath =  `/static/img/map/a1.png`
                    }else{
                        ob.iconPath =  `/static/img/map/a2.png`
                    }
                    return ob
                })
            },
            onChanges(){},
            showRing(canvasId) {
				var chartData = {
					series :[{
						"name": "一班",
						"data": 50
					  }, {
						"name": "二班",
						"data": 30
					  }, {
						"name": "三班",
						"data": 20
					  }, {
						"name": "四班",
						"data": 18
					  }, {
						"name": "五班",
						"data": 8
					  }]
				};
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: false,
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						offsetY: 0 * _self.pixelRatio,  //这个调节字在中间圆的位置  中间没有字的就整个title注销
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 10 * _self.pixelRatio,  // 这个调节字在中间圆的位置  中间没有字的就整个subtitle注销
					},
					extra: {
						pie: {
							offsetAngle: 0,
							ringWidth: 20 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#fff',   // 中间圆的背景颜色
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,     // 动画  画个圆的那种
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,    //  图上红圈圈出来的线  true 显示
				});
			},
			touchRing(e) {
                // 这个是点击的时候显示数值，但是我写上报错，就注销了 
				// canvaRing.showToolTip(e, {
				// 	format: function(item) {
				// 		return item.name + ':' + item.data
				// 	}
				// });
			},

            // 柱状图开始

            showColumn(){
                canvaColumn=new uCharts({
                canvasId: "canvasColumn",
                type: 'column',
                legend:true,
                fontSize:11,
                background:'#FFFFFF',
                pixelRatio:this.pixelRatio,
                animation: true,
                // categories: chartData.categories,
                // series: chartData.series,
                categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
                series: [{
                    "name": "成交量1",
                    "data": [15, {
                        "value": 20,
                        "color": "#f04864"
                    }, 45, 37, 43, 34]
                    }, {
                    "name": "成交量2",
                    "data": [30, {
                        "value": 40,
                        "color": "#facc14"
                    }, 25, 14, 34, 18]
                    }],
                    xAxis: {
                        disableGrid:true,
                    },
                    yAxis: {
                        //disabled:true
                    },
                    dataLabel: true,
                    width: this.cWidth * this.pixelRatio,
                    height: this.cHeight * this.pixelRatio,
                            extra: {
                                column: {
                                    type:'group',
                                    width: this.cWidth*this.pixelRatio*0.45/6
                                }
                            }
                        });

                    },
                    touchColumn(e){
                        canvaColumn.showToolTip(e, {
                            // format: function (item, category) {
                            // 	if(typeof item.data === 'object'){
                            // 		return category + ' ' + item.name + ':' + item.data.value
                            // 	}else{
                            // 		return category + ' ' + item.name + ':' + item.data
                            // 	}
                            // }
                        });
            },
            onChange(event) {
                wx.showToast({
                    title: `切换到标签 ${event.detail.name}`,
                    icon: 'none',
                });
            },
        },
        mounted() {
            this.showRing('canvasRing')
            this.showColumn();
            uni.setNavigationBarTitle({
                title: '沈阳市采集实时数据'
            })


            let sely = this
            //获取定位
            wx.getLocation({
                type: 'wgs84',
                success(res) {
                    let {longitude,latitude} = res;
                    console.log({longitude,latitude})
                    sely.longitude = res.longitude
                    sely.latitude = res.latitude
                    sely.markers.push({
                        iconPath: `/static/img/map/a2.png`,
                        id: 122,
                        latitude: latitude,
                        longitude: longitude,
                        width: 40,
                        height: 40
                    })
                    sely.markers.push({
                        iconPath: `/static/img/map/a2.png`,
                        id: 124,
                        latitude: latitude-5,
                        longitude: longitude-5,
                        width: 40,
                        height: 40
                    })
                },
                fail(){
                wx.showModal({
                    title: '温馨提示',
                    content: '获取定位失败，请前往设置打开定位权限',
                    confirmText: '设置',
                    success(res) {
                        if (res.confirm) {
                            wx.openSetting({
                                success: function (res) {
                                    if (res.authSetting["scope.userLocation"]) {
                                        wx.getLocation({
                                            type: 'wgs84',
                                            success(res) {
                                                let {longitude,latitude} = res;
                                                sely.longitude = res.longitude
                                                sely.latitude = res.latitude
                                            }
                                        })
                                    }else{
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }
                                }
                            })
                        } else if (res.cancel) {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
                }
            })



        },
    }
</script>

<style scoped lang="scss">
    .tj_bg{
        width:750upx;
        margin:0 0 20upx 0;
        background-image: -webkit-linear-gradient(top, #1d659e, #aac5d6); 
    }
    .tj{
        padding:40upx;
        padding-top:0;
        width:100%;
        display:flex;
        justify-content:space-between;
        color:rgba(255,255,255,0.7);
        font-size:24upx;
        box-sizing:border-box;
        .tj_title{

        }
        .tj_btn{
        }
    }
    .qiun-charts{
        width:100%;
        height:750upx;
    }
    .view-group{
        display:flex;
        align-items: center;
        justify-content: center;
        width:750upx;
        flex-direction:column;
        .view-item{
            font-size:32upx;
            position:relative;
            display: flex;
            flex-direction:row;
            align-items: center;
            justify-content: space-around;
            box-sizing: border-box;
            width:720upx;
            background:#efeff4;
            height:100upx;
            padding:0 20upx;
            line-height:100upx;
            margin:10upx auto;
            border-radius: 10upx;
            .item-child-position{
                position:absolute;
                right:10upx;
                top:7upx;
            }
            .item-child{
                width:120upx;
                text-align: center;
            }
            .btn{
                color:#505050;
            }
        }
        .view-item.tj{
            width:680upx;
            background:#fff;
            margin:20upx auto;
            line-height:70upx;
            height:180upx;
            .tj_t{
                color:#6fc1a0;
                font-size:42upx;
            }
            .tj_b{
                color:#505050;
                font-size:24upx;
            }
        }
    }
    .mapheight{
      height: 750upx;
      width: 730upx;
      margin:20upx auto;
    }
</style>