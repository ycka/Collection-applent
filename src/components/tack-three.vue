<template>
    <view>
        <van-cell-group>
            <check-radius top title="是否具备技能资格" @set-param="e=>submitData.aat001=e" actions="aat001"
                :default="submitData.aat001"></check-radius>
            <view v-show="submitData.aat001=='1'"> 
                <van-field :value="submitData.aat029" label=" " placeholder="请填写技能资格" required @change="e=>submitData.aat029=e.detail"/>
            </view>
            
            <check-radius title="是否具备专业技术资格" @set-param="e=>submitData.aat002=e" actions="aat002"
                :default="submitData.aat002"></check-radius>
            
            <view v-show="submitData.aat002=='1'">
                <van-field :value="submitData.aat030" label=" " placeholder="请填写专业技术资格" required @change="e=>submitData.aat030=e.detail"/>
            </view>
            <van-field :value="submitData.aat003" label="家庭人口数量" placeholder="请输入数字" @change="e=>submitData.aat003=e.detail"/>
            <van-field :value="submitData.aat004" label="家庭就业人口数量" placeholder="请输入数字" @change="e=>submitData.aat004=e.detail"/>
            <check-radius title="被调查人目前是否就业" @set-param="e=>submitData.aat005=e" actions="aat005"
                :default="submitData.aat005"></check-radius>
            <view v-show="submitData.aat005=='1'">
                <check-radius title="被调查人就业情况" @set-param="e=>submitData.aat006=e" actions="aat006"
                    :default="submitData.aat006"></check-radius>
                <view v-show="submitData.aat006=='01'">
                    <check-radius title="就业形式" @set-param="e=>submitData.aat007=e" actions="aat007"
                        :default="submitData.aat007"></check-radius>
                    
                    <view v-show="submitData.aat007=='04'">
                        <van-field top required :value="submitData.aat031" placeholder="请填写就业形式" @change="e=>submitData.aat031=e.detail"/>
                    </view>
                    <van-field required :value="submitData.aat008" label="就业单位" placeholder="请输入内容" @change="e=>submitData.aat008=e.detail"/>
                    <van-field required :value="submitData.aat009" label="职业（工种）" placeholder="请输入内容" @change="e=>submitData.aat009=e.detail"/>
                    <check-address two title="单位详细地址" @set-param="setAdd" :value1="submitData.aat010"></check-address>
                    <check-radius title="是否签订劳动合同" @set-param="e=>submitData.aat011=e" actions="aat011"
                        :default="submitData.aat011"></check-radius>
                    <van-field required :value="submitData.aat012" label="现工作单位就业时间（月数）" placeholder="请输入数字" @change="e=>submitData.aat012=e.detail"/>
                </view>
                <view v-show="submitData.aat006=='02'">
                    <check-radius title="所属行业" @set-param="e=>submitData.aad007=e" actions="aad007"
                        :default="submitData.aad007"></check-radius>
                    <view v-show="submitData.aad007=='09'">
                        <van-field top required :value="submitData.aad009" placeholder="请填写所属行业" @change="e=>submitData.aad009=e.detail"/>
                    </view>
                    
                    <check-radius title="创业类型" @set-param="e=>submitData.aad008=e" actions="aad008"
                        :default="submitData.aad008"></check-radius>
                    <view v-show="submitData.aad008=='09'">
                        <van-field top required :value="submitData.aad010" placeholder="请填写创业类型" @change="e=>submitData.aad010=e.detail"/>
                    </view>
                    
                </view>
                <view v-show="submitData.aat006=='03'">
                    <check-radius title="灵活就业状态" @set-param="e=>submitData.aat013=e" actions="aat013"
                        :default="submitData.aat013"></check-radius>
                    <view v-show="submitData.aat013=='01'">
                        <check-checkbox title="自由职业者（可多选）" @set-param="e=>submitData.aat028=e" actions="aat028"
                            :default="submitData.aat028"></check-checkbox>
                        <view v-show="submitData.aat028.indexOf('09')>-1">
                            <van-field top required :value="submitData.aat034" placeholder="请填写职业" @change="e=>submitData.aat034=e.detail"/>
                        </view>
                        
                        
                    </view>
                </view>
            </view>
            <view v-show="submitData.aat005=='0'">
                <check-radius title="是否已登记失业" @set-param="e=>submitData.aat015=e" actions="aat015"
                    :default="submitData.aat015"></check-radius>
                <view v-show="submitData.aat015=='0'">
                    <van-field :value="submitData.aat016" label="原单位名称" placeholder="请输入内容" @change="e=>submitData.aat016=e.detail"/>
                    <van-field :value="submitData.aat017" label="原职业（工种）" placeholder="请输入内容" @change="e=>submitData.aat017=e.detail"/>
                    <check-picker title="失业时间" @set-param="e=>submitData.aat018=e"></check-picker>
                    <check-radius title="失业原因" @set-param="e=>submitData.aat019=e" actions="aat019"
                        :default="submitData.aat002"></check-radius>
                    <view v-show="submitData.aat019=='05'">
                        <van-field top required :value="submitData.aat032" placeholder="请填写失业原因" @change="e=>submitData.aat032=e.detail"/>
                    </view>
                    
                </view>
                <view v-show="submitData.aat015=='1'">
                    <check-checkbox title="主要原因（可多选）" @set-param="e=>submitData.aat014=e" actions="aat014"
                        :default="submitData.aat014"></check-checkbox>
                    <view v-show="submitData.aat014.indexOf('19')>-1">
                        <van-field top required :value="submitData.aat033" placeholder="请填写主要原因" @change="e=>submitData.aat033=e.detail"/>
                    </view>
                    
                    <check-checkbox other="05" title="主要原因（可多选）" @set-param="e=>submitData.aat020=e" actions="aat020"
                        :default="submitData.aat020"></check-checkbox>
                    
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
                    aat001:'',
                    aat019:'',
                    aat029:'',
                    aat002:'',
                    aat030:'',
                    aat005:'',
                    aat003:'',
                    aat004:'',
                    aat015:'',
                    aat016:'',
                    aat017:'',
                    aat018:'',
                    aat032:'',
                    aat014:'',
                    aat033:'',
                    aat020:'',
                    aat006:'',
                    aat007:'',
                    aat031:'',
                    aat008:'',
                    aat009:'',
                    aat010:'',
                    aat011:'',
                    aat012:'',
                    aad009:'',
                    aad007:'',
                    aad008:'',
                    aad010:'',
                    aat013:'',
                    aat028:'',
                    aat034:'',
                    aac002:'',
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
            next(){
                this.submitData.aac002 = this.aac002
				this.$store.dispatch('submitall',{key:'3',data:this.submitData}).then(e=>{
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
                this.submitData.aat010=e.all
				if(e.index==1){
					this.address = e.name
				}else{
					this.address_two = e.name
				}
            },
		}
    }
</script>

<style scoped>

</style>