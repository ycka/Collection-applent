
<template>
    <view class="content">
        <custom-header title="采集统计" child></custom-header>
        <view class="view-group">
            <view class="tj_bg">
                <h3 style="color:#fff;padding:40upx;padding-bottom:0">{{first.aac010}}实时数据</h3>
                <view class="tj">
                    <view class="tj_title">截止{{getNowFormatDate()}} 数据统计</view>
                    <view class="tj_btn">刷新统计数据</view>
                </view>
                <view class="view-item tj">
                    <view class="item-child">
                        <view class="tj_t">{{first.today}}</view>
                        <view class="tj_b">今天</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">{{first.thisWeek}}</view>
                        <view class="tj_b">近七天</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">{{first.severDays}}</view>
                        <view class="tj_b">本周</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">{{first.thisMonth}}</view>
                        <view class="tj_b">本月</view>
                    </view>
                    <view class="item-child">
                        <view class="tj_t">{{first.total}}</view>
                        <view class="tj_b">累计</view>
                    </view>
                </view>
            </view>
            <van-panel title="进度统计表">
                <view class="view-item" style="background:#fff;">
                    <view class="item-child">{{first.aac010}}</view>
                    <view class="item-child">今日</view>
                    <view class="item-child">本周</view>
                    <view class="item-child">近七天</view>
                    <view class="item-child">本月</view>
                    <view class="item-child">累计</view>
                </view>
                <view class="view-item" v-for="(obj,idx) in tableData" :key="idx" v-if="idx!=0">
                    <view class="item-child">{{obj.aac010}}</view>
                    <view class="item-child">{{obj.today}}</view>
                    <view class="item-child">{{obj.thisWeek}}</view>
                    <view class="item-child">{{obj.severDays}}</view>
                    <view class="item-child">{{obj.thisMonth}}</view>
                    <view class="item-child">{{obj.total}}</view>
                    <view v-if="obj.aac003==null" class="item-child-position" @click="down(obj.aaa020)"> <van-icon v-if="obj.aaa020!=null" name="arrow" /></view>
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
                        <van-tab title="今天" name="today"></van-tab>
                        <van-tab title="本周" name="thisWeek"></van-tab>
                        <van-tab title="近七天" name="severDays"></van-tab>
                        <van-tab title="本月" name="thisMonth"></van-tab>
                        <van-tab title="累计" name="total"></van-tab>
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
                        :longitude="markers[0].longitude"
                        :latitude="markers[0].latitude"
                        scale="14"
                        :controls="controls"
                        :markers="markers"
                        @markertap="markertap"
                        show-location
                        class="mapheight"
                    ></map>
                </van-panel>
                
            </view>
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
            first(){
                return this.tableData[0]
            }
        },
        data(){
            return{
                markers: [],
                latitude: 40.013305,  //纬度
            　　 longitude: 118.685713,  //经度
        　　　　　　//scale：5，//最小数，缩放范围最大，可见程度最大
        　　　　　　//scale：18，//最大数，缩放范围最小，可见程度最小
                chartData:[],
                cWidth: "", //宽度
                cHeight: "", //高度
                pixelRatio: 1, //设备像素比
                actives:'today',
                ate:0,
                tableData:[],
                quhua:'',
                single:{}
            }
        },
        onLoad(e) {
            this.$store.dispatch('getMockAddress',this.quhua).then(e=>{
                this.markers = e.map(obj=>{
                    let param =  {
                        iconPath: `/static/img/map/a2.png`,
                        id: obj.aac002,
                        latitude: obj.aaz027.split(',')[1],
                        longitude: obj.aaz027.split(',')[0],
                        width: 40,
                        height: 40
                    }
                    this.markers.push(param)
                    return param
                })
                console.log(this.markers)
            })
            let param = {
                aaz024:this.userInfo.aaz024,
                aaa020:this.userInfo.aaa020,
                aaz026:this.userInfo.aaz026
            }
            this.quhua = e.aaa020
            this.$store.dispatch('dbDown',e).then(ex=>{
                this.tableData = ex
                console.log(ex)
                this.chartData = ex.map(obj=>{
                    let rx = {}
                    console.log()
                    let a = obj['aac003']
                    if(a==null) a = obj['aac010']
                    rx.data = obj[this.actives]
                    rx.name = a
                    return rx
                })
                // canvaRing.updateData({series:this.chartData})
                console.log(this.chartData)
            })
        },
        created() {
            _self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

        },
  
        methods: {
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
			},
            down(id){
                // wx.navigateTo({
                //     url: `../down/down?aaa020=${id}`
                // });
            },
            markertap(e) {
                console.log(e)
                this.markers.map(ob=>{
                    if(ob.id==e.markerId){
                        ob.iconPath =  `/static/img/map/a1.png`
                    }else{
                        ob.iconPath =  `/static/img/map/a2.png`
                    }
                    return ob
                })
            },
            onChanges(e){
                this.actives = e.mp.detail.name
                this.chartData = this.tableData.map(obj=>{
                    let rx = {}
                    if(obj['aac003']==null){
                        rx.name = obj.aac010
                    }else{
                        rx.name = obj['aac003']||'无名'
                    }
                    rx.data = obj[this.actives]
                    return rx
                })
                canvaRing.updateData({series:this.chartData})
            },
            showRing(canvasId) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: false,
					title: {
						name: `${this.ate}%`,
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						offsetY: 0 * _self.pixelRatio,  //这个调节字在中间圆的位置  中间没有字的就整个title注销
					},
					subtitle: {
						name: '采集数',
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
					series:this.chartData,
					animation: true,     // 动画  画个圆的那种
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,    //  图上红圈圈出来的线  true 显示
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format:(item)=> {
                        let sum = 0
                        this.tableData.map((obj)=>{
                            sum+=obj[this.actives]
                        });
                        this.ate = (parseInt(item.data)/sum).toFixed(2)
                        canvaRing.updateData({title: {
                            name: `${this.ate*100}%`,
                            color: '#7cb5ec',
                            fontSize: 25 * _self.pixelRatio,
                            offsetY: 0 * _self.pixelRatio,  //这个调节字在中间圆的位置  中间没有字的就整个title注销
                        }})
						return item.name + ':' + item.data
					}
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
            // this.showColumn();
            // uni.setNavigationBarTitle({
            //     title: '沈阳市采集实时数据'
            // })

            // canvaRing.updateData({series:this.chartData})
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
            .item-child:first-child{
                font-weight:700;
            }
            .item-child-position{
                position:absolute;
                right:10upx;
                top:7upx;
            }
            .item-child{
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