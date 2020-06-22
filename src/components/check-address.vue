<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
		<view class="weui-cells__title">
            <view class="required">*</view>
            <view>{{title}}(省，市)</view>
        </view>

        <van-cell :title="title" @click="homeshow=true" :value="homename">
			<view v-if="btn" slot="right-icon">
				<van-tag type="success" @tap.stop="copy(e)">复制</van-tag>
			</view>
		</van-cell>

		<view class="weui-cells__title">
            <view class="required">*</view>
            <view>{{title}}(区，街，村)</view>
        </view>

        <van-cell :title="title" @click="homeshow_three=true" :value="homename_three">
			<view v-if="btn" slot="right-icon">
				<van-tag type="success" @tap.stop="copy(e)">复制</van-tag>
			</view>
		</van-cell>
        

        <!-- 地址 -->
		<van-action-sheet
		:show="homeshow"
		>
			<van-area
			:area-list="areaList"
			:columns-num='2'
			:columns-placeholder="['请选择', '请选择', '请选择']"
			title="常驻地址"
			@confirm="homesure"
			@cancel="homecanc"
			/>
		</van-action-sheet>
		<van-action-sheet
		:show="homeshow_three"
		>
			<van-area
			:area-list="areaList_three"
			:columns-placeholder="['请选择', '请选择', '请选择']"
			title="常驻地址"
			@confirm="homesure_three"
			@cancel="homecanc_three"
			/>
		</van-action-sheet>
    </view>
</template>

<script>
    export default {
        props:{
			top:{
                type:Boolean,
                default:false
			},
			btn:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:'',
			},
			value1:{
				type:String,
				default:''
			},
			value2:{
				type:String,
				default:''
			}
		},
		watch:{
			value1(e){
				this.homename = e
			},
			value2(e){
				this.homename_three = e
			}
		},
        data(){
            return{
				homename:'',
				homename_three:'',
				homeshow:false,
				homeshow_three:false,
                areaList:{
					province_list: {
						'110000': '北京市',
						'120000': '天津市'
					},
					city_list: {
						'110100': '北京市',
						'110200': '县',
						'120100': '天津市',
						'120200': '县'
					},
					county_list: {
						'110101': '东城区',
						'110102': '西城区',
						'110105': '朝阳区',
						'110106': '丰台区',
						'120101': '和平区',
						'120102': '河东区',
						'120103': '河西区',
						'120104': '南开区',
						'120105': '河北区',
					}
				},
				areaList_three:{
					province_list:{
						'110101': '东城区',
						'110102': '西城区',
						'110105': '朝阳区',
						'110106': '丰台区',
						'120101': '和平区',
						'120102': '河东区',
						'120103': '河西区',
						'120104': '南开区',
						'120105': '河北区',
					},
					city_list: {
						'110100': '山林街',
						'110200': '山西路',
						'120100': '北京路',
						'120200': '新民县'
					},
					county_list: {
						'110101': '九天地村',
						'110102': '42号公寓',
						'110105': '九江花园',
						'120101': '临城别墅',
					},
				},
				code1:'',
				code2:'',
            }
        },
        methods:{
            homecanc(){
				this.homeshow = false
			},
			homecanc_three(){
				this.homeshow_three = false
			},
			copy(e){
				this.$emit('copy',{value1:this.homename,value2:this.homename_three})
			},
			setTwo(arr){
				let ob = arr[arr.length-1].code;
				let str = ob.substring(0,ob.length-1)
				console.log(str)
				let key = Object.keys(this.areaList_three.province_list)
				let keys = key.filter(e=>e.indexOf(str)>=0)
				console.log(keys)
				let objecs = this.areaList_three.province_list
				let art = {}
				keys.map(obj=>{
					art[obj] = objecs[obj]
				})
				this.areaList_three.province_list = art
			},
			homesure(ev){
				console.log(ev.detail.values)
				let arr = ev.detail.values
				this.setTwo(arr)
				let str1 = '',str2 = ''
				arr.map((ob,ix)=>{
					if(ix<arr.length-1){
						str1+=ob?.name||''+'-'
						str2+=ob?.code||''+','
					}else{
						str1+=ob?.name||''
						str2+=ob?.code||''
					}
				})
				this.code1 = str2
				let val = ''
				if(this.code2.length==0){
					val = this.code1
				}else{
					val = this.code1+','+this.code2
				}
                this.$emit('setParam',{name:str1,value:val})
				this.homename = str1
				this.homeshow = false
			},
			homesure_three(ev){
				if(this.code1.length==0){
					uni.showToast({
						icon: 'none',
						title: '请先选择省市'
					});
					return
				}
				console.log(ev.detail.values)
				let arr = ev.detail.values
				let str1 = '',str2 = ''
				arr.map((ob,ix)=>{
					if(ix<arr.length-1){
						str1+=ob?.name||''+'-'
						str2+=ob?.code||''+','
					}else{
						str1+=ob?.name||''
						str2+=ob?.code||''
					}
				})
				this.code2 = str2
				let val = this.code1+','+this.code2
                this.$emit('setParam',{name:str1,value:val})
				this.homename_three = str1
				this.homeshow_three = false
			}
        }
    }
</script>

<style scoped>

</style>