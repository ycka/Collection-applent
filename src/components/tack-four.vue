<template>
    <view>
        <van-cell-group>
            <view>
                <check-checkbox other="00" title="参保情况（可多选，[未参保]不可与其他项同时选择）" @set-param="e=>submitData.aas001=e" actions="aas001"
                    :default="submitData.aas001"></check-checkbox>
                
            </view>

            <check-radius title="技术等级" @set-param="e=>submitData.aas002=e" actions="aas002"
                :default="submitData.aas002"></check-radius>
            <check-radius title="参加培训情况" @set-param="e=>submitData.aas003=e" actions="aas003"
                :default="submitData.aas003"></check-radius>
            <check-radius title="想参加职业技能培训吗？" @set-param="e=>submitData.aas005=e" actions="aas005"
                :default="submitData.aas005"></check-radius>
            <view class="page-section" v-show="submitData.aas005=='1'"> 
                <van-field :value="submitData.aas006" label="想参加的工种1" placeholder="请填写答案" required @change="e=>submitData.aas006=e.detail"/>
                <van-field :value="submitData.aas009" label="想参加的工种2" placeholder="请填写答案" required @change="e=>submitData.aas009=e.detail"/>
                <van-field :value="submitData.aas010" label="想参加的工种3" placeholder="请填写答案" required @change="e=>submitData.aas010=e.detail"/>
                    
                <check-radius title="希望培训的时间" @set-param="e=>submitData.aas007=e" actions="aas007"
                    :default="submitData.aas007"></check-radius>
                    <view v-show="submitData.aas007=='04'">
                        <van-field :value="submitData.aas008" label="其他天数" placeholder="请填写" required @change="e=>submitData.aas008=e.detail"/>
                    </view>
                
            </view>
        </van-cell-group>
        <view class="page-section" style="margin-top:0;">
            <view class="weui-cells__title f36">
                <view class="required">&nbsp;</view>
                <view> 采集人员：</view>
                <view style="font-size:30upx;">{{userInfo.aac003}}</view>
            </view>
        </view>
        <view class="page-section" style="margin-top:0;">
            <view class="weui-cells__title f36">
                <view class="required">&nbsp;</view>
                <view> 电话号码：</view>
                <view style="font-size:30upx;">{{userInfo.aae005}}</view>
            </view>
        </view>
        <view class="page-section" style="margin-top:0;">
            <view class="weui-cells__title f36">
                <view class="required">&nbsp;</view>
                <view> 采集日期：</view>
                <view style="font-size:30upx;">{{getNowFormatDate()}}</view>
            </view>
        </view>
        <!-- <view style="width:100%;background:#fff;padding:20upx;">
            <button type="primary" plain="true" style="width:70%;margin:0 auto;" @tap="cons">按钮</button>
        </view> -->
        <view class="center-clomn mt">
            <van-button plain type="info" @tap="back">上一页</van-button>
            <van-button plain type="info" @tap="toindex">提交</van-button>
        </view>
    </view>
</template>

<script>
    import checkRadius from './check-radius'
    import vanField from './van-field'
    import checkCheckbox from './check-checkbox'
    import { mapState } from 'vuex' 
    export default {
        components:{checkRadius,vanField,checkCheckbox},
        computed: mapState(['select_tree','aac002','editData','userInfo']),
        data(){
			return{
				// 提交数据
				submitData:{
                    aas002:'',
                    aas003:'',
                    aas001:'',
                    aas005:'',
                    aas006:'',
                    aas009:'',
                    aas010:'',
                    aas007:'',
                    aac002:'',
                    aas008:'',
                },
                default:''
			}
        },
        mounted(){
			this.default = Object.assign({},this.submitData)
			if(this.editData!=null){
				Object.keys(this.submitData).map(obj=>{
					if(this.editData[obj]){
						this.submitData[obj] = this.editData[obj]
					}
				})
			}
		},
		methods:{
            back(){
                uni.navigateBack();
			},
            toindex(){
                this.submitData.aac002 = this.aac002
				this.$store.dispatch('submitall',{key:'4',data:this.submitData}).then(e=>{
                    this.$store.commit('edit_data',null)
					uni.reLaunch({url:`../main/main`})
				})
			},
            cons(){
                console.log(this.submitData)
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
    }
</script>

<style scoped>

</style>