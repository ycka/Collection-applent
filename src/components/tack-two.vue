<template>
    <view>
        <van-cell-group>
            <check-radius top title="是否具备技能资格" @set-param="e=>submitData.aat001=e"></check-radius>
            <van-field top v-if="submitData.aat001=='1'" :value="submitData.aat029" label=" " placeholder="请填写答案" required @change="e=>submitData.aat029=e.detail"/>
            <check-radius title="是否具备专业技术资格" @set-param="e=>submitData.aat002=e"></check-radius>
            <van-field top v-if="submitData.aat002=='1'" :value="submitData.aat030" label=" " placeholder="请填写答案" required @change="e=>submitData.aat030=e.detail"/>
            
            <check-radius title="是否建档立卡贫困劳动力" @set-param="e=>submitData.aav001=e"></check-radius>
            <check-radius top v-if="submitData.aav001=='1'" title="是否已脱贫" @set-param="e=>submitData.aav002=e"></check-radius>
            <check-radius title="是否异地搬迁劳动力" @set-param="e=>submitData.aav003=e"></check-radius>
            <check-radius title="是否失地农民" @set-param="e=>submitData.aav017=e"></check-radius>
            <check-radius top v-if="submitData.aav017=='1'" title="是否已转非农" @set-param="e=>submitData.aav018=e"></check-radius>
            <check-radius title="人口资源分类" @set-param="e=>submitData.aav004=e" :actions="ccdactions"></check-radius>
            <check-radius title="就业（转移）状态" @set-param="e=>submitData.aav005=e" :actions="cceactions"></check-radius>
            <!-- 转移就业 -->
            <view v-if="submitData.aav005=='1'">
                <check-radius title="转移就业方式" @set-param="e=>submitData.aav006=e" :actions="ccdactions"></check-radius>
                <check-radius title="是否有组织劳务输出" @set-param="e=>submitData.aav007=e"></check-radius>
                <check-radius title="从事行业" @set-param="e=>submitData.aav008=e" :actions="aav008"></check-radius>
                <van-field top v-if="submitData.aav008=='4'" required :value="submitData.lifetext" label="其他" placeholder="请填写答案" @change="e=>submitData.lifetext=e.detail"/>
                <check-address title="转移就业地点" @set-param="e=>submitData.aav009=e.value"></check-address>
                <check-picker title="转移就业时间" @set-param="e=>submitData.aav010=e"></check-picker>

                <van-field :value="submitData.aav011" label="转移就业单位名称" placeholder="请输入内容" @change="e=>submitData.aav011=e.detail"/>
                <check-radius title="转移就业月收入" @set-param="e=>submitData.aav012=e" :actions="monery"></check-radius>
            </view>
            <!-- 自主创业 -->
            <view v-if="submitData.aav005=='2'">
                <van-field :value="submitData.aad002" label="创业项目名称" placeholder="请输入内容" @change="e=>submitData.aad002=e.detail"/>
                <check-address title="创业项目地址" @set-param="e=>submitData.aad003=e.value"></check-address>
                <check-picker title="创业时间" @set-param="e=>submitData.aad001=e"></check-picker>
                <check-radius title="创业项目所属行业" @set-param="e=>submitData.aad007=e" :actions="aad007"></check-radius>
                <van-field top v-if="submitData.aad007=='7'" required :value="submitData.macklineseven" label="其他" placeholder="请填写答案" @change="e=>submitData.macklineseven=e.detail"/>
                <check-radius title="创业单位类型" @set-param="e=>submitData.aad008=e" :actions="macklife"></check-radius>
                <van-field top v-if="submitData.aad008=='3'" required :value="submitData.macklifetext" label="其他" placeholder="请填写答案" @change="e=>submitData.macklifetext=e.detail"/>
                <van-field :value="submitData.aad004" label="创业项目投资金额（万元）" placeholder="请输入数字" @change="e=>submitData.aad004=e.detail"/>
                <van-field :value="submitData.aad005" label="创业带动就业人数" placeholder="请输入数字" @change="e=>submitData.aad005=e.detail"/>
                <van-field :value="submitData.aad006" label="带动贫困劳动力就业人数" placeholder="请输入数字" @change="e=>submitData.aad006=e.detail"/>
            </view>
            <!-- 暂未就业 -->
            	
            <view v-if="submitData.aav005=='3'">
                <view class="page-section"> 
                    <view class="weui-cells__title">
                        <view class="required">*</view>
                        <view class="f36">未就业原因（可多选）</view>
                    </view>
                    <view class="radio_some_top"></view>
                    <van-checkbox-group :value="abc" @change="checkchange" class="f36">
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
                <van-field top v-if="abc.indexOf('8')>-1" :value="submitData.spname" label="其他" placeholder="请填写答案" @change="e=>submitData.spname=e.detail"/>
                <check-picker title="返乡时间" @set-param="e=>submitData.aav014=e"></check-picker>
                <check-radius title="是否有就业意向" @set-param="e=>submitData.aav015=e"></check-radius>
                <view class="page-section" v-if="submitData.aav015=='1'"> 
                    <view class="weui-cells__title">
                        <view class="required">*</view>
                        <view class="f36">具体就业意向</view>
                    </view>
                    <view class="radio_some_top"></view>
                    <van-checkbox-group :value="bcd" @change="bcd_change" class="f36">
                        <van-checkbox name="1" shape="square">自主创业</van-checkbox>
                        <van-checkbox name="2" shape="square">务农</van-checkbox>
                        <van-checkbox name="3" shape="square">务工</van-checkbox>
                        <van-checkbox name="4" shape="square">经商</van-checkbox>
                    </van-checkbox-group>  
                </view>
                

                <check-radius title="是否曾参加培训" @set-param="e=>submitData.aav019=e"></check-radius>
                
                <view v-if="submitData.aav019=='1'">
                    <van-field :value="submitData.aav020" label="参加培训工种" placeholder="请输入内容" @change="e=>submitData.aav020=e.detail"/>
                    <check-picker title="参训开始时间" @set-param="e=>submitData.aav022=e"></check-picker>
                    <check-picker title="参训结束时间" @set-param="e=>submitData.aav023=e"></check-picker>
                </view>
                <view v-if="submitData.aav019=='2'">
                    <view class="page-section"> 
                        <view class="weui-cells__title">
                            <view class="required">*</view>
                            <view class="f36">参加培训意向（可多选，[无意向]不可与其他项同时选择）</view>
                        </view>
                        <view class="radio_some_top"></view>
                        <van-checkbox-group :value="cdez" @change="cdez_change" class="f36">
                            <van-checkbox name="1" shape="square">无意向</van-checkbox>
                            <van-checkbox name="2" shape="square">育婴员</van-checkbox>
                            <van-checkbox name="3" shape="square">保育员</van-checkbox>
                            <van-checkbox name="4" shape="square">中式烹饪</van-checkbox>
                            <van-checkbox name="5" shape="square">中式面点</van-checkbox>
                            <van-checkbox name="6" shape="square">维修电工</van-checkbox>
                            <van-checkbox name="7" shape="square">电焊工</van-checkbox>
                            <van-checkbox name="8" shape="square">茶艺师</van-checkbox>
                            <van-checkbox name="9" shape="square">保安员</van-checkbox>
                            <van-checkbox name="10" shape="square">汽车维修工</van-checkbox>
                            <van-checkbox name="11" shape="square">创业培训</van-checkbox>
                            <van-checkbox name="12" shape="square">其他</van-checkbox>
                        </van-checkbox-group>  
                    </view>

                    <van-field required top v-if="submitData.cde.indexOf('12')>-1" :value="submitData.jobtest" label="其他" placeholder="请填写答案" @change="e=>submitData.jobtest=e.detail"/>
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
					aav003:'',
					aat001:'',
					aat029:'',
					aat002:'',
					aav001:'',
					aav002:'',
					aat030:'',
                    aav017:'',
                    aav018:'',
                    aav004:'',
                    aav005:'',
                    aav013:'',
                    spname:'',
                    aav015:'',
                    aav019:'',
                    aav016:'',
                    cde:'',
                    jobtest:'',
                    aav020:'',
                    aav022:'',
                    aav023:'',
                    aad002:'',
                    aad003:'',
                    aad001:'',
                    aav010:'',
                    aad007:'',
                    macklineseven:'',
                    macklifetext:'',
                    aad008:'',
                    aad004:'',
                    aad005:'',
                    aad006:'',
                    aav006:'',
                    aav007:'',
                    aav008:'',
                    lifetext:'',
                    aav009:'',
                    aav011:'',
                    aav012:'',
                    aav014:''
                },
                ccdactions:[
                    {
                        name: '选项1',
                        value:'1'
                    },
                    {
                        name: '选项2',
                        value:'2'
                    },
                    {
                        name: '选项3',
                        value:'3'
                    },
                ],
                life:[
                    {
                        name: '第一产业（□农林牧渔业）',
                        value:'1'
                    },
                    {
                        name: '第二产业（□建筑业）',
                        value:'2'
                    },
                    {
                        name: '第三产业（□交通运输业）',
                        value:'3'
                    },
                    {
                        name: '其他',
                        value:'4'
                    },
                ],
                cceactions:[
                    {
                        name: '转移就业',
                        value:'1'
                    },
                    {
                        name: '自主创业',
                        value:'2'
                    },
                    {
                        name: '暂未就业',
                        value:'3'
                    },
                ],
                monery:[
                    {
                        name: '1499以下',
                        value:'1'
                    },
                    {
                        name: '1500~2499元',
                        value:'2'
                    },
                    {
                        name: '2500~4999元',
                        value:'3'
                    },
                    {
                        name: '5000元以上',
                        value:'4'
                    },
                ],
                macklife:[
                    {
                        name: '企业',
                        value:'1'
                    },
                    {
                        name: '个体工商户',
                        value:'2'
                    },
                    {
                        name: '其他',
                        value:'3'
                    },
                ],
                mackline:[
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
                        name: '其他',
                        value:'7'
                    },
                ],
                abc:[],
                bcd:[],
                cdez:[],
			}
		},
		methods:{
            cons(){
                console.log(this.submitData)
            },
            cdez_change(e){
                if(e.detail.indexOf('1')>=0){
                    this.cdez = ['1']
                    this.submitData.cde = this.cdez.join(',')
                    return
                }
                this.cdez = e.detail
				console.log(this.cdez)
				this.submitData.cde = this.cdez.join(',')
            },
            checkchange(e){
				this.abc = e.detail
				console.log(this.abc)
				this.submitData.aav013 = this.abc.join(',')
            },
            bcd_change(e){
                this.bcd = e.detail
				console.log(this.bcd)
				this.submitData.aav016 = this.bcd.join(',')
            }
		},
    }
</script>

<style scoped>

</style>