<template>
    <view>
        <van-cell-group>
            <view>
                <view class="page-section" style="margin-top:0;"> 
                    <view class="weui-cells__title">
                        <view class="required">*</view>
                        <view class="f36">参保情况（可多选，[未参保]不可与其他项同时选择）</view>
                    </view>
                    <view class="radio_some_top"></view>
                    <van-checkbox-group :value="xyz" @change="xyz_change" class="f36">
                        <van-checkbox name="1" shape="square">新型农村合作医疗保险</van-checkbox>
                        <van-checkbox name="2" shape="square">城乡居民医疗保险</van-checkbox>
                        <van-checkbox name="3" shape="square">城镇职工医疗保险</van-checkbox>
                        <van-checkbox name="4" shape="square">城乡居民养老保险</van-checkbox>
                        <van-checkbox name="5" shape="square">城镇职工养老保险</van-checkbox>
                        <van-checkbox name="6" shape="square">失业保险</van-checkbox>
                        <van-checkbox name="7" shape="square">工伤保险</van-checkbox>
                        <van-checkbox name="8" shape="square">生育保险</van-checkbox>
                        <van-checkbox name="9" shape="square">未参保</van-checkbox>
                    </van-checkbox-group>  
                </view>
                
            </view>

            <check-radius title="技术等级" @set-param="e=>submitData.aas002=e" :actions="aas002"></check-radius>
            <check-radius title="参加培训情况" @set-param="e=>submitData.aas003=e" :actions="stname"></check-radius>
            <check-radius title="想参加职业技能培训吗？" @set-param="e=>submitData.aas005=e"></check-radius>
            <view class="page-section" v-if="submitData.aas005=='1'"> 
                <van-field :value="submitData.st_text1" label="想参加的工种1" placeholder="请填写答案" required @change="e=>submitData.st_text1=e.detail"/>
                <van-field :value="submitData.st_text1" label="想参加的工种2" placeholder="请填写答案" required @change="e=>submitData.st_text2=e.detail"/>
                <van-field :value="submitData.st_text1" label="想参加的工种3" placeholder="请填写答案" required @change="e=>submitData.st_text3=e.detail"/>
                    
                <check-radius title="希望培训的时间" @set-param="e=>submitData.aas007=e" :actions="study"></check-radius>
            </view>
        </van-cell-group>
        <!-- <view style="width:100%;background:#fff;padding:20upx;">
            <button type="primary" plain="true" style="width:70%;margin:0 auto;" @tap="cons">按钮</button>
        </view> -->
    </view>
</template>

<script>
    import checkRadius from './check-radius'
    import checkPicker from './check-picker'
    import checkAddress from './check-address'
    import vanField from './van-field'
    export default {
        components:{checkRadius,checkPicker,checkAddress,vanField},
        data(){
			return{
				// 提交数据
				submitData:{
                    aas002:'',
                    aas003:'',
                    aas001:'',
                    aas005:'',
                    st_text1:'',
                    st_text2:'',
                    st_text3:'',
                    aas007:''
                },
                year:[
                    {
                        name: '无',
                        value:'1'
                    },
                    {
                        name: '初级技工',
                        value:'2'
                    },
                    {
                        name: '中级技工',
                        value:'3'
                    },
                    {
                        name: '高级技工',
                        value:'4'
                    },
                    {
                        name: '技师',
                        value:'5'
                    },
                    {
                        name: '高级技师',
                        value:'6'
                    },
                ],
                stname:[
                    {
                        name: '未参加',
                        value:'1'
                    },
                    {
                        name: '参加了职业技能培训',
                        value:'2'
                    },
                    {
                        name: '参加了创业培训',
                        value:'3'
                    },
                    {
                        name: '其他培训',
                        value:'4'
                    },
                ],
                study:[
                    {
                        name: '3-5天',
                        value:'1'
                    },
                    {
                        name: '10—15天',
                        value:'2'
                    },
                    {
                        name: '20—30天',
                        value:'3'
                    },
                    {
                        name: '30天以上',
                        value:'4'
                    },
                ],
                box:[],
                xyz:[]
			}
		},
		methods:{
            cons(){
                console.log(this.submitData)
            },
            xyz_change(e){
                console.log(e.detail)
                if(e.detail.indexOf('9')>=0){
                    this.xyz = ['9']
                    this.submitData.aas001 = this.xyz.join(',')
                    return
                }
                this.xyz = e.detail
				this.submitData.aas001 = this.xyz.join(',')
            }
		},
    }
</script>

<style scoped>

</style>