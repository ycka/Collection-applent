<template>
    <view>
        <van-cell-group>
            <view class="page-section">
                <view class="weui-cells__title f36" style="padding-right:0;display:flex;justify-content:space-between;">
                    <view>允许录入15位身份证号数据</view>
                    <van-switch :checked="submitData.check" size="20px" @change="onChange" style="float:right;"/>
                </view>
            </view>
            
            <view class="page-section" style="margin-top:0;padding-right:0;">
                <view class="weui-cells__title f36">
                    <view>在如下日期（含）之后出生，视为不满16周岁人员，信息录入时将给出提示</view>
                </view>
            </view>
            <check-picker title="劳动力不满16周岁日期设定" top v-model="submitData.a" @set-param="setold"></check-picker>
            <view class="page-section" style="margin-top:0;padding-right:0;">
                <view class="weui-cells__title f36">
                    <view>在如下日期（含）之前出生，视为已满60周岁人员，信息录入时将给出提示</view>
                </view>
            </view>
            <check-picker title="男劳动力满60周岁日期设定" top v-model="submitData.b" @set-param="setold"></check-picker>
            <view class="page-section" style="margin-top:0;padding-right:0;">
                <view class="weui-cells__title f36">
                    <view>在如下日期（含）之前出生，视为已满55周岁人员，信息录入时将给出提示</view>
                </view>
            </view>
            <check-picker title="女劳动力满55周岁日期设定" top v-model="submitData.c" @set-param="setold"></check-picker>
            
			<!-- <check-picker title="年龄（根据出生日期计算）" :value="submitData.a" :look="true"></check-picker> -->
        </van-cell-group>
		<!-- <view class="center-clomn mt">
			<van-button plain type="info" @tap="tonext">下一页</van-button>
		</view> -->
        <view class="center-clomn mt">
            <van-button plain type="info" @tap="tonext">提交</van-button>
        </view>
    </view>
</template>

<script>
    import checkRadius from './check-radius'
    import checkPicker from './check-picker'
	import checkAddress from './check-address'
	import vanField from './van-field'
	import checkRadiusSome from './check-radius-some'
	import checkCheckbox from './check-checkbox'
	import { mapState } from 'vuex' 
    export default {
        components:{checkRadius,checkPicker,checkAddress,vanField,checkRadiusSome,checkCheckbox},
        data(){
			return{
				// 提交数据
				submitData:{
                    a:'2015-1-1',
                    b:'1960-12-31',
                    c:'1960-12-31',
                    check:false,
				},

			}
		},
		mounted(){
		},
		
		computed: mapState(['select_tree']),
		methods:{
			tonext(){

            },
			// 年龄确定
			setold(da){
                this.submitData.a=da
			},
			
			hj(e){
				this.submitData.aac009=e
				this.$emit('setParam',this.submitData.aac009)
            },
            onChange(){
                this.submitData.check = !this.submitData.check
            }
			
		},
    }
</script>

<style scoped>

</style>