<template>
    <view>
        <van-cell-group>
            <van-field :value="submitData.aaz024" label="账户" placeholder="请输入账户" error-message=" " @change="e=>submitData.aaz024=e.detail"/>
			<van-field :value="submitData.aaz025" type="password" label="密码" placeholder="请输入密码" error-message=" " @change="e=>submitData.aaz025=e.detail"/>
            <!-- <van-field :value="submitData.abc002" label="姓名" placeholder="请输入姓名" @change="e=>submitData.abc002=e.detail"/> -->
            <van-field type="number" top :value="submitData.aac002" label="身份证号" placeholder="请输入18位身份证号" @change="e=>submitData.aac002=e.detail"/>
            <van-field :value="submitData.aac003" label="姓名" placeholder="请输入姓名" error-message=" " @change="e=>submitData.aac003=e.detail"/>
            <van-field :value="submitData.aae005" label="联系电话" placeholder="请输入手机号" error-message=" " @change="e=>submitData.aae005=e.detail"/>
            <!-- <check-picker title="账户类型" :value="submitData.aaz026" :look="true" actions="aaz026"></check-picker> -->
			<check-radius title="账户类型" :default="submitData.aaz026" @set-param="e=>submitData.aaz026=e" actions="aaz026"></check-radius>
            <check-address :data1="select_tree" :data2="select_tree" title="负责区域" @set-param="setaddress"></check-address>
			<check-radius title="是否是测试账户" :default="submitData.aaz001" @set-param="e=>submitData.aaz001=e" actions="aaz001"></check-radius>
            <check-radius title="账号状态" :default="submitData.aae100" @set-param="e=>submitData.aae100=e" actions="aae100"></check-radius>
			<van-field :value="submitData.aae013" label="备注" placeholder="请输入" error-message=" " @change="e=>submitData.aae013=e.detail"/>
            <check-radius title="账号属性" :default="submitData.aac004" required @set-param="e=>submitData.aac004=e" actions="aac004"></check-radius>

        </van-cell-group>
		<view class="center-clomn mt">
			<van-button plain type="info" @tap="cons">提交</van-button>
		</view>
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
					updateType:'01',
                    aac002:'',
                    aac003:'',
                    aac004:'',
                    aaz026:'',
                    aae005:'',
                    aac010:'',
					aaz024:'',
					aaz025:'',
					aae100:'',
					aaa020:'',
					aaz001:'',
					aae013:'',
					aae011:'',
					aae022:'',
					aae036:'',
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
				address_two:'',
				default:{}

			}
		},
		computed: {
            ...mapState(['single_user','userInfo','select_code','select_tree']),
        },
        mounted(){

            // setTimeout(e=>{
            //     this.submitData.aac004 = '1'
            //     this.submitData.aae100 = '1'
			// },500)
			Object.assign(this.default,this.submitData);

        },
		methods:{
			cons(){
				this.submitData.aae036 = this.getNowFormatDate()
				this.submitData.aae011 = this.userInfo.aae011
				this.submitData.aae022 = this.userInfo.aac010
				console.log(this.submitData)
				this.$store.dispatch('setUserAdt',this.submitData).then(e=>{
					if(e.success == "OK"){
						Object.assign(this.submitData,this.default);
						uni.navigateBack({
							 delta: 1
						});
					}else{
						console.log('保存失败')
					}
				})
            },
			checkchange(e){
				this.result = e.detail
				console.log(this.result)
				this.submitData.aac024 = this.result.join(',')
			},
			// 年龄确定
			setold(da){
                this.submitData.aac006=da
				this.submitData.aaz026 = this.getAge(da)
				console.log(this.submitData.aaz026)
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
				this.submitData.aaa020=e.value
				if(e.index==1){
					this.submitData.aac010 = e.all
					this.address = e.name
				}else{
					this.submitData.aac010 = e.all
					this.address_two = e.name
				}
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