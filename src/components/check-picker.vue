<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
        
        <view class="weui-cells__title f36">
            <view class="required">* &nbsp;</view>
            <view> {{title}}</view>
        </view>
        <view v-show="look">
            <van-cell :title="value"></van-cell>
        </view>
        <view v-show="!look">
           <van-cell :title="makeleavetext" @click="makeleave=true"></van-cell>
        </view>
        
        
        <van-action-sheet
        :show="makeleave"
        >
            <van-datetime-picker
                type="date"
                :value="currentDate"
                :max-date="maxDate"
                :min-date="minDate"
                :formatter="formatter"
                @confirm="makeleavesubms"
                @cancel="makeleavecancs"
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
            look:Boolean,
            value:{
                type:String,
                default:''
            }
        },
        created(){
            this.makeleavetext = this.value
            console.log(this.value)
        },
        watch:{
            value(e){
                this.makeleavetext = e
                console.log(e)
            }
        },
        data(){
            return{
                maxDate: new Date().getTime(),
                minDate:new Date(1960, 1, 1).getTime(),
                currentDate: new Date().getTime(),
                makeleave:false,
                makeleavetext:'',
				formatter(type, value) {
					if (type === 'year') {
						return `${value}年`;
					} else if (type === 'month') {
						return `${value}月`;
					}
					return value;
                },
            }
        },
        methods:{
            aSelect(event) {
				this.ccaname = event.detail.name
                this.ccashow = false
                this.$emit('setParam',event.detail.value)
            },
            makeleavesubms(da){
                this.$emit('setParam',this.getData(da.detail))
                this.makeleavetext = this.getDatas(da.detail)
				this.makeleave = false
			},
            makeleavecancs(){
				this.makeleave = false
            },
            // 格式化时间戳
			getData(param){
				let datetime = new Date(param);
				console.log(param)
				// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
				let year = datetime.getFullYear(),
				month = ("0" + (datetime.getMonth() + 1)).slice(-2),
				date = ("0" + datetime.getDate()).slice(-2),
				hour = ("0" + datetime.getHours()).slice(-2),
				minute = ("0" + datetime.getMinutes()).slice(-2),
				second = ("0" + datetime.getSeconds()).slice(-2);
				// 拼接
		        let result = year + "-"+ month +"-"+ date //+" "+ hour +":"+ minute +":" + second;
				// 返回
				return result;
            },
            getDatas(param){
				let datetime = new Date(param);
				console.log(param)
				// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
				let year = datetime.getFullYear(),
				month = ("0" + (datetime.getMonth() + 1)).slice(-2),
				date = ("0" + datetime.getDate()).slice(-2),
				hour = ("0" + datetime.getHours()).slice(-2),
				minute = ("0" + datetime.getMinutes()).slice(-2),
				second = ("0" + datetime.getSeconds()).slice(-2);
				// 拼接
		        let result = year + "年"+ month +"月"+ date+"日" //+" "+ hour +":"+ minute +":" + second;
				// 返回
				return result;
			},
        }
    }
</script>

<style>
</style>