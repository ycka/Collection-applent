<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
		<view class="weui-cells__title">
            <view class="required">*</view>
            <view>{{title}}</view>
        </view>

        <van-cell :title="title" @click="homeshow=true" :value="homename"></van-cell>
        

        <!-- 地址 -->
		<van-action-sheet
		:show="homeshow"
		>
			<van-area
			:area-list="areaList"
			:columns-placeholder="['请选择', '请选择', '请选择']"
			title="常驻地址"
			@confirm="homesure"
			@cancel="homecanc"
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
            title:{
                type:String,
                default:'',
			},
			value:{
				type:String,
				default:''
			}
		},
		watch:{
			value(e){
				this.homename = e
			}
		},
        data(){
            return{
                homename:'',
                homeshow:false,
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
            }
        },
        methods:{
            homecanc(){
				this.homeshow = false
			},
			homesure(ev){
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
                this.$emit('setParam',{name:str1,value:str2})
				this.homename = str1
				this.homeshow = false
            },
        }
    }
</script>

<style scoped>

</style>