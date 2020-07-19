<template>
    <view>
		
        <van-cell-group>
            <van-field type="number" top :value="submitData.aac002" @blur="exMssn_non" label="身份证号" placeholder="请输入18位身份证号" @change="e=>submitData.aac002=e.detail"/>
            <van-field :value="submitData.aac003" label="姓名" placeholder="请输入姓名" error-message=" " @change="e=>submitData.aac003=e.detail"/>
            <check-radius title="性别" required @set-param="e=>submitData.aac004=e" actions="aac004"
				:default="submitData.aac004"></check-radius>
            <check-picker title="出生日期" @set-param="setold" :value="submitData.aac006"></check-picker>
			<check-picker title="年龄（根据出生日期计算）" :value="submitData.aac007" :look="true"></check-picker>
			<check-radius-some title="民族" required @set-param="e=>submitData.aac005=e" actions="aac005"
				:default="submitData.aac005"
				></check-radius-some>
            <van-field :value="submitData.aae005" type='number' label="联系电话" placeholder="请输入手机号" error-message=" " @change="e=>submitData.aae005=e.detail"/>
            
			<check-address title="户籍地址" @set-param="setaddress" :value1="x1" :value2="x2"></check-address>
            <van-field :value="submitData.aaa021" top placeholder="请填写详细地址" @change="e=>submitData.aaa021=e.detail"/>

			<check-address title="常住地址" btn @fuzhi="fzfunc" :value1="address_val" :value2="address_val_two" @set-param="e=>setdddress_two"></check-address>
            <van-field :value="submitData.aac028" top placeholder="请填写详细地址" @change="e=>submitData.aac028=e.detail"/>
            <van-field :value="submitData.abc003" label="户主名字" placeholder="请输入户主姓名" error-message=" " @change="e=>submitData.abc003=e.detail"/>
            <van-field :value="submitData.abc002" label="户主身份证号" @blur="exMssn_non" placeholder="请输入户主身份证号" @change="e=>submitData.abc002=e.detail"/>
            <check-radius title="本人与户主关系" @set-param="e=>submitData.aac09w=e" actions="aac09w"
				:default="submitData.aac09w"></check-radius>
            <check-radius title="是否为13-15周岁人员" @set-param="e=>submitData.aac056=e" actions="aac056"
				:default="submitData.aac056"></check-radius>
			<view v-show="submitData.aac056=='1'">
				<van-field top :value="submitData.aac057" label="请输入就读院校" placeholder="请输入内容" required @change="e=>submitData.aac057=e.detail"/>
			</view>
            
            <check-radius title="文化程度" @set-param="e=>submitData.aac011=e" actions="aac011"
				:default="submitData.aac011"></check-radius>
            <view v-show="submitData.aac011=='90'">
				<van-field top :value="submitData.aac013" label=" " placeholder="文化水平" required @change="e=>submitData.aac013=e.detail"/>
			</view>
			
            <check-radius title="健康状况" @set-param="e=>submitData.aac033=e" actions="aac033"
				:default="submitData.aac033"></check-radius>
            <view v-show="submitData.aac033=='9'">
				<van-field top :value="submitData.aac034" label=" " placeholder="健康状况" required @change="e=>submitData.aac034=e.detail"/>
			</view>
			
            <check-radius title="户籍性质" @set-param="hj" actions="aac009"
			:default="submitData.aac009"></check-radius>
            <view v-show="submitData.aac009=='90'">
				<van-field top :value="submitData.aac058" label=" " placeholder="户籍性质" required @change="e=>submitData.aac058=e.detail"/>
			</view>
			
		
			<check-checkbox title="是否享受政府扶持政策（可多选）" @set-param="e=>submitData.aac024=e" actions="aac024"
				:default="submitData.aac024"></check-checkbox>
        </van-cell-group>
        <!-- <view style="width:100%;background:#fff;padding:20upx;">
            <button type="primary" plain="true" style="width:70%;margin:0 auto;" @tap="cons">按钮</button>
        </view> -->
		<view class="center-clomn mt">
			<van-button plain type="info" @tap="tonext">下一页</van-button>
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
					aac013:'',
					aac034:'',
					aac058:'',
					aac024:'',
					aaa020:'',
					aac027:'',
					aaz001:'1',//是否测试数据,0否1是
				},
				
				x1:'',
				x2:'',
				address_val:'',
				address_val_two:'',
				all:'',
				//临时地址
				address:'',
				address_two:'',
				default:{},
				mssn_sure:true
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
				
				this.chulidizhi(this.submitData.aaa020).then(e=>{
					this.x1 = e.shengshi
					this.x2 = e.quzhouxian
				})
				
				this.chulidizhi(this.submitData.aac027).then(e=>{
					this.address_val = e.shengshi
					this.address_val_two = e.quzhouxian
				})
			}
		},
		
		computed: mapState(['select_tree','editData']),
		methods:{
			chulidizhi(dizhi){
				let select_tree = this.select_tree
				let x='',y=''
				return new Promise((resolve, reject)=>{
					this.$store.dispatch('findroot',dizhi).then(e=>{
						e.data.map((obj,idx)=>{
							if(idx<2){
								x+=obj.label
							}else{
								y+=obj.label
							}
						})
						resolve({
							shengshi:x,
							quzhouxian:y
						})
					})
				})

			},
			// aae005
			// 给用户用的，暂时留着，过后超过去
			exPhoto(){
				// !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
				this.$store.dispatch('phtoto',{aae005:this.submitData.aae005}).then(e=>{
					if(!e){
						uni.showToast({
							icon: 'none',
							title: '此号码已有绑定账户'
						});
					}
				})
			},
			getBirth(idCard) {
				var birthday = "";
				if(idCard != null && idCard != ""){
					if(idCard.length == 15){
						birthday = "19"+idCard.slice(6,12);
					} else if(idCard.length == 18){
						birthday = idCard.slice(6,14);
					}	
					birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
					//通过正则表达式来指定输出格式为:1990-01-01
				}	
				return birthday;
			},
			// aac002
			// 给用户用的，暂时留着过后超过去
			exMssn(){
				this.$store.dispatch('mssn',{aac002:this.submitData.aac002}).then(e=>{
					if(!e){
						uni.showToast({
							icon: 'none',
							title: '此号码已注册'
						});
					}
				})
			},
			callback(param){
				// "210283198809105035"
				return new Promise((resolve, reject)=>{
					this.$store.dispatch('exMssn_non',param).then(e=>{
						console.log(e)
						if(e.data == "00"){
							this.mssn_sure = true
							let brat = this.getBirth(this.submitData.aac002)
							this.submitData.aac006 = brat
							this.submitData.aac007 = this.getAge(brat)
						}else{
							let message = {
								'00':'符合系统参数要求',
								'01':'15位身份证号不可录',
								'02':'不满16周岁（男',
								'03':'男性大于60周岁',
								'04':'不满16周岁（女',
								'05':'女性大于55周岁',
							}
							// uni.showToast({
							// 	icon: 'none',
							// 	title: `${message[e.data]}`
							// });
							wx.showModal({
								title: '提示',
								content: `${message[e.data]},是否继续录入`,
								success: (res)=>{
									if (res.confirm) {
										let brat = this.getBirth(this.submitData.aac002)
										this.submitData.aac006 = brat
										this.submitData.aac007 = this.getAge(brat)
										this.mssn_sure = true
									} else if (res.cancel) {
										this.submitData.aac002 = ''
										this.mssn_sure = false
									}
								}
							})
							
						}
						resolve(this.mssn_sure)
					})
				})
				
			},
			exMssn_non(){
				let ex18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				let ex15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
				
				if(ex18.test(this.submitData.aac002)){
					this.$store.dispatch('exMssn_data',{aac002:this.submitData.aac002}).then(e=>{
						console.log(e)
						if(e.success!='OK'){
							this.callback({aac002:this.submitData.aac002})
						}else{
							
							this.$store.commit('edit_data',e.data)
							this.$store.commit('set_person_id',e.data.aac002)
							uni.reLaunch({url:`../main/main`})
						}
						
					})
					
				}else{
					if(ex15.test(this.submitData.aac002)){
						this.$store.dispatch('exMssn_data',{aac002:this.submitData.aac002}).then(e=>{
							if(e.success!='OK'){
								this.callback({aac002:this.submitData.aac002})
							}else{
								this.$store.commit('edit_data',e.data)
								this.$store.commit('set_person_id',e.data.aac002)
								uni.reLaunch({url:`../main/main`})
							}
							
						})
						
					}else{
						uni.showToast({
							icon: 'none',
							title: `请正确输入身份证`
						});
						this.mssn_sure = false
					}
				}
				
			},
			tonext(){
				this.callback({aac002:this.submitData.aac002,birthday:this.submitData.aac006}).then(e=>{
					if(!this.mssn_sure){
						
					}else{
						this.$store.commit('setaac002',this.submitData.aac002)
						this.$store.dispatch('submitall',{key:'1',data:this.submitData}).then(e=>{
							if(this.submitData.aac009!=='10'){
								uni.navigateTo({url: '../countryside/countryside'});
							}else{
								uni.navigateTo({url: '../city/city'});
							}
						})
					}
					
				})
				
				
			},
			cons(){
                console.log(this.submitData)
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
				this.submitData.aaa020=e.value
				if(e.index==1){
					this.submitData.aac010 = e.all
					this.address = e.name
				}else{
					this.submitData.aac010 = e.all
					this.address_two = e.name
				}
				this.all = e.all
				console.log(this.submitData.aac010)
			},
			setdddress_two(e){
				this.submitData.aac027=e.value
				if(e.index==1){
					this.address = e.name
				}else{
					this.address_two = e.name
				}
				this.submitData.aac026 = e.all
			},
			fzfunc(){
				console.log(111)
				this.submitData.aac026 = this.all
				this.submitData.aac027=this.submitData.aaa020
				this.address_val = this.address
				this.address_val_two = this.address_two
			}
		},
    }
</script>

<style scoped>

</style>