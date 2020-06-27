vb<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
        
        <view class="weui-cells__title f36">
            <view class="required">* &nbsp;</view>
            <view> {{action_select[0].title}}</view>
        </view>

        <van-cell :title="makeleavetext" @click="makeleave=true"></van-cell>
        
        <van-action-sheet
        :show="makeleave"
        :actions="action_select"
        @select="onSelect"
        >
        </van-action-sheet>
    </view>
</template>

<script>
    import { mapState } from 'vuex' 
    export default {
        computed: {
            ...mapState(['select_code']),
            action_select(){
                return this.select_code[this.actions.toUpperCase()]
            }
        },
        watch:{
            default(e){
                let obj = this.action_select.find(o=>o.value==e)
                this.makeleavetext = obj.name
                // console.log(e)
            }
        },
        props:{
            top:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:'',
            },
            actions:{
                type:String,
                default:''
            },
            default:String
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