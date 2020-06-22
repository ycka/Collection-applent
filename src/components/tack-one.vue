<template>
    <view>
        <van-cell-group>
            <van-field top :value="submitData.aac002" label="身份证号" placeholder="请输入18位身份证号" @change="e=>submitData.aac002=e.detail"/>
            <van-field :value="submitData.aac003" label="姓名" placeholder="请输入姓名" error-message=" " @change="e=>submitData.aac003=e.detail"/>
            <check-radius title="性别" required @set-param="e=>submitData.aac004=e" :actions="actions"></check-radius>
            <check-picker title="出生日期" @set-param="setold"></check-picker>
			<check-picker title="年龄（自动计算）" :value="submitData.aac007" :look="true"></check-picker>
            <!-- <van-cell title="年龄" :value="old"></van-cell> -->
			<check-radius-some title="民族" required @set-param="e=>submitData.aac005=e"></check-radius-some>
            <!-- <check-radius title="民族" @set-param="e=>submitData.minzu=e" :actions="minzuactions"></check-radius> -->
            <van-field :value="submitData.aae005" label="联系电话" placeholder="请输入手机号" error-message=" " @change="e=>submitData.aae005=e.detail"/>
            
			<check-address title="户籍地址" :btn="true" @copy="copyData" @set-param="setaddress"></check-address>
            <van-field :value="submitData.aaa021" label="详细地址" placeholder="请填写详细地址" @change="e=>submitData.aaa021=e.detail"/>

			<check-address title="常住地址" :value1="address_val" :value2="address_val_two" @set-param="e=>submitData.aac026=e"></check-address>
            <van-field :value="submitData.aac028" label="详细地址" placeholder="请填写详细地址" @change="e=>submitData.aac028=e.detail"/>
            <van-field :value="submitData.abc003" label="户主名字" placeholder="请输入户主姓名" error-message=" " @change="e=>submitData.abc003=e.detail"/>
            <van-field :value="submitData.abc002" label="户主身份证号" placeholder="请输入户主身份证号" @change="e=>submitData.abc002=e.detail"/>
            <check-radius title="本人与户主关系" @set-param="e=>submitData.aac09w=e" :actions="fromaction"></check-radius>
            <check-radius title="是否为13-15周岁人员" @set-param="e=>submitData.aac056=e" :actions="yearactions"></check-radius>
            <van-field top v-if="submitData.aac056=='1'" :value="submitData.aac057" label="现就读学校" placeholder="请输入内容" required @change="e=>submitData.aac057=e.detail"/>
            <check-radius title="文化程度" @set-param="e=>submitData.aac011=e" :actions="aactions"></check-radius>
            <van-field top v-if="submitData.aac011=='3'" :value="submitData.stname" label=" " placeholder="文化水平" required @change="e=>submitData.stname=e.detail"/>
            <check-radius title="健康状况" @set-param="e=>submitData.aac033=e" :actions="bactions"></check-radius>
            <van-field top v-if="submitData.aac033=='3'" :value="submitData.haname" label=" " placeholder="健康状况" required @change="e=>submitData.haname=e.detail"/>
            <check-radius title="户籍性质" @set-param="hj" :actions="cactions"></check-radius>
            
			<van-field top v-if="submitData.aac009=='3'" :value="submitData.huname" label=" " placeholder="户籍性质" required @change="e=>submitData.huname=e.detail"/>
		
			<!-- <van-field label="是否享受政府扶持政策（可多选）" :ob="false"/> -->
			
			<view class="page-section"> 
				<view class="weui-cells__title">
					<view class="required">*</view>
					<view class="f36">是否享受政府扶持政策（可多选）</view>
				</view>
				<view class="radio_some_top"></view>
				<van-checkbox-group :value="result" @change="checkchange" class="f36">
					<van-checkbox name="ca" shape="square">公益性岗位（乡村公益性岗位）</van-checkbox>
					<van-checkbox name="cb" shape="square">灵活就业人员社保补贴</van-checkbox>
					<van-checkbox name="cc" shape="square">居民最低生活保障（低保）</van-checkbox>
					<van-checkbox name="cd" shape="square">创业担保贷款（小微贷）</van-checkbox>
				</van-checkbox-group>  
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
	import checkRadiusSome from './check-radius-some'
    export default {
        components:{checkRadius,checkPicker,checkAddress,vanField,checkRadiusSome},
        data(){
			return{
				result: ['ca', 'cb'],
				// 提交数据
				submitData:{
					aac002:'',
					aac003:'',
					aac004:'',
					aac006:'',
					aac007:'',
					aac005:'',
					aae005:'',
					aac028:'',
					aac026:'',
					aaa021:'',
					aac010:'',
					abc003:'',
					abc002:'',
					aac09w:'',
					aac056:'',
					aac057:'',
					aac011:'',
					aac033:'',
					aac009:'',
					stname:'',
					haname:'',
					huname:'',
					aac024:''
				},
				// 性别
				sexshow:false,
				sexname:'',
				actions: [
					{
						name: '男',
						value:'1'
					},
					{
						name: '女',
						value:'2'
					}
				],
				aactions: [
					{
						name: '博士研究生',
						value:'1'
					},
					{
						name: '硕士研究生',
						value:'2'
					},
					{
						name: '其他',
						value:'3'
					}
				],
				bactions: [
					{
						name: '健康或良好',
						value:'1'
					},
					{
						name: '一般或较弱',
						value:'2'
					},
					{
						name: '其他',
						value:'3'
					}
				],
				cactions: [
					{
						name: '农村户口',
						value:'1'
					},
					{
						name: '非农业户口',
						value:'2'
					},
					{
						name: '其他',
						value:'3'
					}
				],
				// 岁数
				old:'',
				// 民族
				minzuactions:[
					{
						name: '1-汉族',
						value:'1'
					},
					{
						name: '2-蒙古族',
						value:'2'
					}
				],
				fromaction:[
					{
						name: '父母',
						value:'1'
					},
					{
						name: '子女',
						value:'2'
					}
				],
				yearactions:[
					{
						name: '是',
						value:'1'
					},
					{
						name: '否',
						value:'2'
					}
				],
				address_val:'',
				address_val_two:'',

			}
		},
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
				this.submitData.aac026=e.value
				// this.submitData.aac010=e.value
				// this.address_val = e.name
			},
			copyData(name){
				this.submitData.aac010=this.submitData.aac026
				this.address_val = name.value1
				this.address_val_two = name.value2
			}
		},
    }
</script>

<style scoped>

</style>