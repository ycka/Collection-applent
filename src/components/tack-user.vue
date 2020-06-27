<template>
    <view>
        <van-cell-group>
            <van-field :value="submitData.abc003" label="账户" placeholder="请输入账户" error-message=" " @change="e=>submitData.abc003=e.detail"/>
            <van-field :value="submitData.abc002" label="姓名" placeholder="请输入姓名" @change="e=>submitData.abc002=e.detail"/>
            <van-field type="number" top :value="submitData.aac002" label="身份证号" placeholder="请输入18位身份证号" @change="e=>submitData.aac002=e.detail"/>
            <van-field :value="submitData.aac003" label="姓名" placeholder="请输入姓名" error-message=" " @change="e=>submitData.aac003=e.detail"/>
            <van-field :value="submitData.aae005" label="联系电话" placeholder="请输入手机号" error-message=" " @change="e=>submitData.aae005=e.detail"/>
            <check-picker title="账户类型" :value="submitData.aac007" :look="true"></check-picker>
            <check-address :data1="select_tree" :data2="select_tree" title="负责区域" @set-param="setaddress"></check-address>
            <check-radius title="账号状态" :default="submitData.aac033" @set-param="e=>submitData.aac033=e" actions="aac033"></check-radius>
            <check-radius title="账号属性" :default="submitData.aac004" required @set-param="e=>submitData.aac004=e" actions="aac004"></check-radius>

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
	import checkRadiusSome from './check-radius-some'
	import { mapState } from 'vuex' 
    export default {
        components:{checkRadius,checkPicker,checkAddress,vanField,checkRadiusSome},
        data(){
			return{
				// 提交数据
				submitData:{
                    aac002:'',
                    aac003:'',
                    aac004:'',
                    aac007:'',
                    aae005:'',
                    aac026:'',
                    abc003:'',
                    abc002:'',
                    aac033:'',
				},
				// 性别
				sexshow:false,
                sexname:'',
                
                bactions: [
					{
						name: '正常',
						value:'1'
					},
					{
						name: '停用',
						value:'2'
					}
                ],
				actions: [
					{
						name: '正式',
						value:'1'
					},
					{
						name: '测试',
						value:'2'
					}
                ],
                
                
				address_val:'',
				address_val_two:'',
				//临时地址
				address:'',
				address_two:''

			}
        },
        mounted(){
            setTimeout(e=>{
                this.submitData.aac004 = '1'
                this.submitData.aac033 = '1'
            },500)
        },
		computed: mapState(['select_tree']),
		methods:{
			cons(){
                console.log(this.submitData)
            },
			// abc(e){
			// 	let da = e.detail.value
            //     console.log(da)
			// 	this.submitData.as = da.join(',')
			// },
			checkchange(e){
				this.result = e.detail
				console.log(this.result)
				this.submitData.aac024 = this.result.join(',')
			},
			// 年龄确定
			setold(da){
                this.submitData.aac006=da
				this.submitData.aac007 = this.getAge(da)
				console.log(this.submitData.aac007)
			},
			// 计算岁数
			getAge(birthday){
				//出生时间 毫秒
				var birthDayTime = new Date(birthday).getTime(); 
				//当前时间 毫秒
				var nowTime = new Date().getTime(); 
				//一年毫秒数(365 * 86400000 = 31536000000)
				return Math.ceil((nowTime-birthDayTime)/31536000000);
			},
			hj(e){
				this.submitData.aac009=e
				this.$emit('setParam',this.submitData.aac009)
			},
			setaddress(e){
				if(e.index==1){
					this.submitData.aac026=e.value
					this.address = e.name
				}else{
					this.submitData.aac026+=','+e.value
					console.log(this.submitData.aac026)
					this.address_two = e.name
				}
				
				// this.submitData.aac010=e.value
				// this.address_val = e.name
			},
			fzfunc(){
				this.submitData.aac010=this.submitData.aac026
				this.address_val = this.address
				this.address_val_two = this.address_two
			}
		},
    }
</script>

<style scoped>

</style>