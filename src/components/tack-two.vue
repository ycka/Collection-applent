<template>
    <view>
        <van-cell-group>
            <check-radius top title="是否具备技能资格" @set-param="e=>submitData.aat001=e" actions="aat001"
                :default="submitData.aat001"></check-radius>
            <view v-show="submitData.aat001=='1'">
                <van-field top :value="submitData.aat029" label=" " placeholder="请填写技能资格" required @change="e=>submitData.aat029=e.detail"/>
            </view>
            
            <check-radius title="是否具备专业技术资格" @set-param="e=>submitData.aat002=e" actions="aat002"
                :default="submitData.aat002"></check-radius>
            <view v-show="submitData.aat002=='1'">
                <van-field top :value="submitData.aat030" label=" " placeholder="请填写技能资格" required @change="e=>submitData.aat030=e.detail"/>
            </view>
            
            
            <check-radius title="是否建档立卡贫困劳动力" @set-param="e=>submitData.aav001=e" actions="aav001"
                :default="submitData.aav001"></check-radius>
            <view v-show="submitData.aav001=='1'">
                <check-radius top title="是否已脱贫" @set-param="e=>submitData.aav002=e" actions="aav002"
                    :default="submitData.aav002"></check-radius>
            </view>
            
            <check-radius title="是否异地搬迁劳动力" @set-param="e=>submitData.aav003=e" actions="aav003"
                :default="submitData.aav003"></check-radius>
            <check-radius title="是否失地农民" @set-param="e=>submitData.aav017=e" actions="aav017"
                :default="submitData.aav017"></check-radius>
            <view v-show="submitData.aav017=='1'">
                <check-radius top title="是否已转非农" @set-param="e=>submitData.aav018=e" actions="aav018"
                    :default="submitData.aav018"></check-radius>
            </view>
            
            <check-radius title="人口资源分类" @set-param="e=>submitData.aav004=e" actions="aav004"
                :default="submitData.aav004"></check-radius>
            <check-radius title="就业（转移）状态" @set-param="e=>submitData.aav005=e" actions="aav005"
                :default="submitData.aav005"></check-radius>
            <!-- 转移就业 -->
            <view v-show="submitData.aav005=='01'">
                <check-radius title="转移就业方式" @set-param="e=>submitData.aav006=e" actions="aav006"
                    :default="submitData.aav006"></check-radius>
                <check-radius title="是否有组织劳务输出" @set-param="e=>submitData.aav007=e" actions="aav007"
                    :default="submitData.aav007"></check-radius>
                <check-radius title="从事行业" @set-param="e=>submitData.aav008=e" actions="aav008"
                    :default="submitData.aav008"></check-radius>
                <view v-show="submitData.aav008=='4'">
                    <van-field top required :value="submitData.aav024" placeholder="请填写行业" @change="e=>submitData.aav024=e.detail"/>
                </view>
                
                <check-address two title="转移就业地点" @set-param="setAdd" :value1="submitData.aav009"></check-address>
                <check-picker title="转移就业时间" @set-param="e=>submitData.aav010=e" :value="submitData.aav010"></check-picker>

                <van-field :value="submitData.aav011" label="转移就业单位名称" placeholder="请输入内容" @change="e=>submitData.aav011=e.detail"/>
                <check-radius title="转移就业月收入" @set-param="e=>submitData.aav012=e" actions="aav012"
                    :default="submitData.aav012"></check-radius>
            </view>
            <!-- 自主创业 -->
            <view v-show="submitData.aav005=='02'">
                <van-field :value="submitData.aad002" label="创业项目名称" placeholder="请输入内容" @change="e=>submitData.aad002=e.detail"/>
                <check-address two title="创业项目地址" @set-param="setAdd_two" :value1="submitData.aad003"></check-address>
                <check-picker title="创业时间" @set-param="e=>submitData.aad001=e" :value="submitData.aad001"></check-picker>
                <check-radius title="创业项目所属行业" @set-param="e=>submitData.aad007=e" actions="aad007"
                    :default="submitData.aad007"></check-radius>
                <view v-show="submitData.aad007=='09'">
                    <van-field top required :value="submitData.aad009" placeholder="请填写行业" @change="e=>submitData.aad009=e.detail"/>
                </view>
                
                <check-radius title="创业单位类型" @set-param="e=>submitData.aad008=e" actions="aad008"
                    :default="submitData.aad008"></check-radius>
                <view v-show="submitData.aad008=='09'">
                    <van-field top required :value="submitData.aad010" placeholder="请填写创业单位类型" @change="e=>submitData.aad010=e.detail"/>
                </view>
                
                <van-field :value="submitData.aad004" label="创业项目投资金额（万元）" placeholder="请输入数字" @change="e=>submitData.aad004=e.detail"/>
                <van-field :value="submitData.aad005" label="创业带动就业人数" placeholder="请输入数字" @change="e=>submitData.aad005=e.detail"/>
                <van-field :value="submitData.aad006" label="带动贫困劳动力就业人数" placeholder="请输入数字" @change="e=>submitData.aad006=e.detail"/>
            </view>
            <!-- 暂未就业 -->
            	
            <view v-show="submitData.aav005=='03'">
                <check-checkbox title="未就业原因（可多选）" @set-param="e=>submitData.aav013=e" actions="aav013"
                    :default="submitData.aav013"></check-checkbox>
                <view v-show="submitData.aav013.indexOf('08')>-1">
                    <van-field top :value="submitData.aav025" placeholder="请填写未就业原因" @change="e=>submitData.aav025=e.detail"/>
                </view>
                
                <check-picker title="返乡时间" @set-param="e=>submitData.aav014=e" :value="submitData.aav014"></check-picker>
                <check-radius title="是否有就业意向" @set-param="e=>submitData.aav015=e" actions="aav015"
                    :default="submitData.aav015"></check-radius>
                <view v-show="submitData.aav015=='1'">
                    <check-checkbox title="具体就业意向" @set-param="e=>submitData.aav016=e" actions="aav016"
                        :default="submitData.aav016"></check-checkbox> 
                </view>
                               
                <check-radius title="是否曾参加培训" @set-param="e=>submitData.aav019=e" actions="aav019"
                    :default="submitData.aav019"></check-radius>                
                <view v-show="submitData.aav019=='1'">
                    <van-field :value="submitData.aav020" label="参加培训工种" placeholder="请输入内容" @change="e=>submitData.aav020=e.detail"/>
                    <check-picker title="参训开始时间" @set-param="e=>submitData.aav022=e" :value="submitData.aav022"></check-picker>
                    <check-picker title="参训结束时间" @set-param="e=>submitData.aav023=e" :value="submitData.aav023"></check-picker>
                </view>
                <view v-show="submitData.aav019=='0'">
                    <check-checkbox other="10" title="参加培训意向（[无意向]不可与其他项同时选择）" @set-param="e=>submitData.aav021=e" actions="aav021"
                        :default="submitData.aav021"></check-checkbox>
                    <view v-show="submitData.aav021.indexOf('21')>-1">
                        <van-field required top :value="submitData.aav026" placeholder="请填写答案" @change="e=>submitData.aav026=e.detail"/>
                    </view>
                    
                </view>
            </view>
        </van-cell-group>
        <!-- <view style="width:100%;background:#fff;padding:20upx;">
            <button type="primary" plain="true" style="width:70%;margin:0 auto;" @tap="cons">按钮</button>
        </view> -->
        <view class="center-clomn mt">
            <van-button plain type="info" @tap="back">上一页</van-button>
            <van-button plain type="info" @tap="next">下一页</van-button>
        </view>
    </view>
</template>

<script>
    import checkRadius from './check-radius'
    import checkPicker from './check-picker'
    import checkAddress from './check-address'
    import vanField from './van-field'
    import checkCheckbox from './check-checkbox'
    import { mapState } from 'vuex' 
    export default {
        components:{checkRadius,checkPicker,checkAddress,vanField,checkCheckbox},
        computed: mapState(['select_tree','aac002','editData']),
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
                    aav025:'',
                    aav015:'',
                    aav019:'',
                    aav016:'',
                    aav026:'',
                    aav020:'',
                    aav022:'',
                    aav023:'',
                    aad002:'',
                    aad003:'',
                    aad001:'',
                    aav010:'',
                    aad007:'',
                    aad009:'',
                    aad010:'',
                    aad008:'',
                    aad004:'',
                    aad005:'',
                    aad006:'',
                    aav006:'',
                    aav007:'',
                    aav008:'',
                    aav024:'',
                    aav009:'',
                    aav011:'',
                    aav012:'',
                    aav014:'',
                    aav021:'',
                    aac002:'',
                },
                default:''
			}
        },
        mounted(){
			this.default = Object.assign({},this.submitData)
			if(this.editData!=null){
				// console.log(`-----tack-two-----`,this.editData)
				Object.keys(this.submitData).map(obj=>{
					if(this.editData[obj]){
						this.submitData[obj] = this.editData[obj]
					}
                })
                // console.log(`-----tack-two-----`,this.submitData)
			}
		},
		methods:{
            next(){
                this.submitData.aac002 = this.aac002
				this.$store.dispatch('submitall',{key:'2',data:this.submitData}).then(e=>{
					uni.navigateTo({url: '../train/train'});
				})
			},
            back(){
                uni.navigateBack();
            },
            cons(){
                console.log(this.submitData)
            },
            setAdd(e){
                this.submitData.aav009 = e.all
				if(e.index==1){
					this.address = e.name
				}else{
					this.address_two = e.name
				}
            },
            setAdd_two(e){
                this.submitData.aad003=e.all
				if(e.index==1){
					this.address = e.name
				}else{
					this.address_two = e.name
				}
			},
		},
    }
</script>

<style scoped>

</style>