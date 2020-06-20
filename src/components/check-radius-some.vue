vb<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
        
        <view class="weui-cells__title">
            <view class="required">*</view>
            <view>{{title}}</view>
        </view>

        <van-cell :title="title" @click="makeleave=true" :value="makeleavetext"></van-cell>
        
        <van-action-sheet
        :show="makeleave"
        :actions="actions"
        @select="onSelect"
        >
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
            },
            actions:{
                type:Array,
                default:e=>{
                    return [
                        {
                            name: '汉族',
                            value:'1'
                        },
                        {
                            name: '满足',
                            value:'2'
                        },
                        {
                            name: '维吾尔族',
                            value:'3'
                        },
                    ]
                }
            }
        },
        data(){
            return{
                makeleave:false,
                makeleavetext:'',
            }
        },
        methods:{
            onSelect(event) {
                this.makeleave = false
                this.makeleavetext = event.detail.name
                this.$emit('setParam',event.detail.value)
            },
        }
    }
</script>

<style>
</style>