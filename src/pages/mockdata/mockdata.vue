
<template>
    <view class="content">
        <view class="view-group">
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
            <view class="view-item">
                <view class="btn">查看更多</view>
            </view>
            <view class="qiun-charts">
                <!-- 区域图 -->
                <van-panel title="标题" desc="描述信息" status="状态">
                    <canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing" style="height:500upx;"></canvas>
                </van-panel>
                
            </view>
            <div class="qiun-charts">
                <!-- 柱状图 -->
                <van-panel title="标题" desc="描述信息" status="状态">
                    <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn" style="height:500upx;"></canvas>
                </van-panel>
                
            </div>
        </view>
    </view>
</template>

<script>
    import uCharts from '@/components/uchart.js';
    var canvaColumn = null;
    var _self;
	var canvaRing = null;
    export default {
        data(){
            return{
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
                pixelRatio: 1 //设备像素比
            }
        },
        onLoad() {
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
        },
        mounted() {
            this.showRing('canvasRing')
            this.showColumn();
        },
    }
</script>

<style scoped lang="scss">
    .qiun-charts{
        width:100%;
        height:650upx;
    }
    .view-group{
        display:flex;
        align-items: center;
        justify-content: center;
        width:750upx;
        flex-direction:column;
        .view-item{
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
            margin:10upx 0;
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
    }
</style>