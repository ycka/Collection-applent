<template>
    <view>
        <view class="page-section" :style="{'margin-top':top?'10rpx':''}">
            <view class="weui-cells__title" v-if="label.trim().length>0">
                <view class="required" v-if="!required">*</view>
                <view class="f36">{{label}}</view>
            </view>
            <view class="weui-cells weui-cells_after-title" v-if="ob">
                <view class="weui-cell weui-cell_input">
                    <input @blur="blur($event)" class="weui-input f36" :placeholder="placeholder" :type="type" placeholder-class="placeholder" @input="changemap"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props:{
            top:{
                type:Boolean,
                default:false
            },
            value:{
                type:String,
                default:''
            },
            label:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            required:{
                type:Boolean,
                default:false
            },
            ob:{
                type:Boolean,
                default:true
            },
            type:{
                type:String,
                default:'text'
            }
        },
        data(){
            return{

            }
        },
        methods:{
            changemap(e){
                // console.log(e.detail.value)
                // console.log(this.$parent)
                let obj = {}
                obj.detail = e.detail.value
                this.$emit('change',obj)
            },
            blur(e){
                this.$emit('blur',e)
            }
        }
    }
</script>

<style scoped lang="scss">
    

</style>