<template>
    <view>
        <van-cell-group>
            <check-radius top title="是否具备技能资格" @set-param="e=>submitData.aat001=e"></check-radius>
            <van-field v-if="submitData.aat001=='1'" :value="submitData.aat029" label=" " placeholder="请填写答案" required @change="e=>submitData.aat029=e.detail"/>
            <check-radius title="是否具备专业技术资格" @set-param="e=>submitData.aat002=e"></check-radius>
            <van-field v-if="submitData.aat002=='1'" :value="submitData.aat030" label=" " placeholder="请填写答案" required @change="e=>submitData.aat030=e.detail"/>
            
            <van-field :value="submitData.workperson" label="家庭人口数量" placeholder="请输入数字" @change="e=>submitData.workperson=e.detail"/>
            <van-field :value="submitData.aat004" label="家庭就业人口数量" placeholder="请输入数字" @change="e=>submitData.aat004=e.detail"/>
            <check-radius title="被调查人目前是否就业" @set-param="e=>submitData.aat005=e"></check-radius>
            <view v-if="submitData.aat005=='1'">
                <check-radius title="被调查人就业情况" @set-param="e=>submitData.aat006=e" :actions="ccs"></check-radius>
                <view v-if="submitData.aat006=='1'">
                    <check-radius title="就业单位" @set-param="e=>submitData.joblist=e" :actions="joblist"></check-radius>
                    <van-field required v-if="submitData.joblist=='4'" :value="submitData.mackelem" label="其他" placeholder="请填写答案" @change="e=>submitData.mackelem=e.detail"/>
                    <van-field required :value="submitData.aat007" label="就业形式" placeholder="请输入内容" @change="e=>submitData.aat007=e.detail"/>
                    <van-field required :value="submitData.aat009" label="职业（工种）" placeholder="请输入内容" @change="e=>submitData.aat009=e.detail"/>
                    <check-address title="单位详细地址" @set-param="e=>submitData.aat010=e.value"></check-address>
                    <check-radius title="是否签订劳动合同" @set-param="e=>submitData.aat011=e"></check-radius>
                    <van-field required :value="submitData.aat012" label="现工作单位就业时间（月数）" placeholder="请输入数字" @change="e=>submitData.aat012=e.detail"/>
                </view>
                <view v-if="submitData.aat006=='2'">
                    <check-radius title="所属行业" @set-param="e=>submitData.aad007=e" :actions="worklist"></check-radius>
                    <van-field required v-if="submitData.aad007=='8'" :value="submitData.workother" label="其他" placeholder="请填写答案" @change="e=>submitData.workother=e.detail"/>
                    <check-radius title="创业类型" @set-param="e=>submitData.aad008=e" :actions="workhander"></check-radius>
                    <van-field required v-if="submitData.aad008=='7'" :value="submitData.workhanderother" label="其他" placeholder="请填写答案" @change="e=>submitData.workhanderother=e.detail"/>
                </view>
                <view v-if="submitData.aat006=='3'">
                    <check-radius title="灵活就业状态" @set-param="e=>submitData.aat013=e" :actions="likejob"></check-radius>
                    <view v-if="submitData.aat013=='1'">
                        <view class="page-section"> 
                            <view class="weui-cells__title">
                                <view class="required">*</view>
                                <view class="f36">自由职业者（可多选）</view>
                            </view>
                            <view class="radio_some_top"></view>
                            <van-checkbox-group :value="xyz" @change="xyz_change" class="f36">
                                <van-checkbox name="1" shape="square">小商贩</van-checkbox>
                                <van-checkbox name="2" shape="square">临时工</van-checkbox>
                                <van-checkbox name="3" shape="square">网约车司机</van-checkbox>
                                <van-checkbox name="4" shape="square">游戏玩家</van-checkbox>
                                <van-checkbox name="5" shape="square">网络主播</van-checkbox>
                                <van-checkbox name="6" shape="square">职业拍客</van-checkbox>
                                <van-checkbox name="7" shape="square">其他</van-checkbox>
                            </van-checkbox-group>  
                        </view>
                        
                        <van-field required v-if="xyz.indexOf('7')>-1" :value="submitData.xytext" label="其他" placeholder="请填写答案" @change="e=>submitData.xytext=e.detail"/>
                        
                    </view>
                </view>
            </view>
            <view v-if="submitData.aat005=='2'">
                <check-radius title="是否已登记失业" @set-param="e=>submitData.los=e" :actions="cca"></check-radius>
                <view v-if="submitData.los=='1'">
                    <van-field :value="submitData.com" label="原单位名称" placeholder="请输入内容" @change="e=>submitData.com=e.detail"/>
                    <van-field :value="submitData.comorg" label="原职业（工种）" placeholder="请输入内容" @change="e=>submitData.comorg=e.detail"/>
                    <check-picker title="失业时间" @set-param="e=>submitData.makeleave=e"></check-picker>
                    <check-radius title="失业原因" @set-param="e=>submitData.why=e" :actions="ccd"></check-radius>
                    <van-field required v-if="submitData.why=='5'" :value="submitData.macklifetext" label="其他" placeholder="请填写答案" @change="e=>submitData.macklifetext=e.detail"/>
                </view>
                <view v-if="submitData.los=='2'">
                    <view class="page-section"> 
                        <view class="weui-cells__title">
                            <view class="required">*</view>
                            <view class="f36">主要原因（可多选）</view>
                        </view>
                        <view class="radio_some_top"></view>
                        <van-checkbox-group :value="abc" @change="abc_change" class="f36">
                            <van-checkbox name="1" shape="square">无合适工作</van-checkbox>
                            <van-checkbox name="2" shape="square">无技能</van-checkbox>
                            <van-checkbox name="3" shape="square">照顾家庭</van-checkbox>
                            <van-checkbox name="4" shape="square">健康原因</van-checkbox>
                            <van-checkbox name="5" shape="square">年龄大</van-checkbox>
                            <van-checkbox name="6" shape="square">无就业意愿</van-checkbox>
                            <van-checkbox name="7" shape="square">在校读书</van-checkbox>
                            <van-checkbox name="8" shape="square">其他</van-checkbox>
                        </van-checkbox-group>  
                    </view>
                        
                    
                    <van-field required v-if="abc.indexOf('8')>-1" :value="submitData.spname" label="其他" placeholder="请填写答案" @change="e=>submitData.spname=e.detail"/>
                    
                    <view class="page-section"> 
                        <view class="weui-cells__title">
                            <view class="required">*</view>
                            <view class="f36">就业意愿（可多选）</view>
                        </view>
                        <view class="radio_some_top"></view>
                        <van-checkbox-group :value="abcd" @change="abcd_change" class="f36">
                            <van-checkbox name="1" shape="square">县（市、区）内就业</van-checkbox>
                            <van-checkbox name="2" shape="square">区内就业</van-checkbox>
                            <van-checkbox name="3" shape="square">跨省区就业</van-checkbox>
                            <van-checkbox name="4" shape="square">自主创业</van-checkbox>
                            <van-checkbox name="5" shape="square">无就业意愿</van-checkbox>
                        </van-checkbox-group>  
                    </view>
                    
                </view>
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
                    aat001:'',
                    aat029:'',
                    aat002:'',
                    aat030:'',
                    aat005:'',
                    workperson:'',
                    aat004:'',
                    los:'',
                    com:'',
                    comorg:'',
                    makeleave:'',
                    why:'',
                    macklifetext:'',
                    as:'',
                    spname:'',
                    asd:'',
                    aat006:'',
                    joblist:'',
                    mackelem:'',
                    aat007:'',
                    aat009:'',
                    aat010:'',
                    aat011:'',
                    aat012:'',
                    workother:'',
                    aad007:'',
                    aad008:'',
                    workhanderother:'',
                    aat013:'',
                    aat028:'',
                    xytext:'',
                },
                likejob:[
                    {
                        name: '自由职业者',
                        value:'1'
                    },
                    {
                        name: '单位灵活雇佣',
                        value:'2'
                    },
                ],
                workhander:[
                    {
                        name: '企业',
                        value:'1'
                    },
                    {
                        name: '个体工商户',
                        value:'2'
                    },
                    {
                        name: '淘宝店主',
                        value:'3'
                    },
                    {
                        name: '微信店商',
                        value:'4'
                    },
                    {
                        name: '网络代购',
                        value:'5'
                    },
                    {
                        name: '创客',
                        value:'6'
                    },
                    {
                        name: '其他',
                        value:'7'
                    },
                ],
                worklist:[
                    {
                        name: '农林牧渔业',
                        value:'1'
                    },
                    {
                        name: '制造业',
                        value:'2'
                    },
                    {
                        name: '建筑业',
                        value:'3'
                    },
                    {
                        name: '批发零售业',
                        value:'4'
                    },
                    {
                        name: '住宿和餐饮',
                        value:'5'
                    },
                    {
                        name: '居民服务和其他服务业',
                        value:'6'
                    },
                    {
                        name: '快递物流业',
                        value:'7'
                    },
                    {
                        name: '其他',
                        value:'8'
                    },
                ],
                cca:[
                    {
                        name: '已登记失业',
                        value:'1'
                    },
                    {
                        name: '未登记失业',
                        value:'2'
                    },
                ],
                joblist:[
                    {
                        name: '机关、事业单位',
                        value:'1'
                    },
                    {
                        name: '企业单位',
                        value:'2'
                    },
                    {
                        name: '个体工商户',
                        value:'3'
                    },
                    {
                        name: '其他',
                        value:'4'
                    },
                ],
                ccs:[
                    {
                        name: '稳定就业',
                        value:'1'
                    },
                    {
                        name: '自主创业',
                        value:'2'
                    },
                    {
                        name: '灵活就业',
                        value:'3'
                    },
                ],
                ccd:[
                    {
                        name: '用人单位解除劳动合同',
                        value:'1'
                    },
                    {
                        name: '劳动者解除劳动合同',
                        value:'2'
                    },
                    {
                        name: '双方协商解除劳动合同',
                        value:'3'
                    },
                    {
                        name: '劳动合同期满自然终止',
                        value:'4'
                    },
                    {
                        name: '其他',
                        value:'5'
                    },
                ],
                xyz:[],
                abc:[],
                abcd:[]
			}
		},
		methods:{
            cons(){
                console.log(this.submitData)
            },
            cdez(e){
                let da = e.detail.value
				this.submitData.cde = da.join(',')
            },
            bcd(e){
                let da = e.detail.value
				this.submitData.bcs = da.join(',')
            },
            abc_change(e){
                this.abc = e.detail
				console.log(this.abc)
				this.submitData.as = this.abc.join(',')
            },
            xyz_change(e){
                this.xyz = e.detail
				console.log(this.xyz)
				this.submitData.aat028 = this.xyz.join(',')
            },
            abcd_change(e){
                if(e.detail.indexOf('5')>=0){
                    this.abcd = ['5']
                    this.submitData.asd = this.abcd.join(',')
                    return
                }
                this.abcd = e.detail
				console.log(this.abcd)
				this.submitData.asd = this.abcd.join(',')
            },
		},
    }
</script>

<style scoped>

</style>