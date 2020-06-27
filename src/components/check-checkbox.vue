<template>
    <view class="page-section"> 
        <view class="weui-cells__title">
            <view class="required">*</view>
            <view class="f36">{{action_select[0].title}}</view>
        </view>
        <view class="radio_some_top"></view>
        <van-checkbox-group :value="cdez" @change="checkchange" class="f36">
            <van-checkbox v-for="obj in action_select" :key="obj.value" :name="obj.value" shape="square">{{obj.name}}</van-checkbox>
        </van-checkbox-group>  
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
        data(){
            return{
                cdez:[]
            }
        },
        watch:{
            default(e){
                this.cdez = e.split(',')
                console.log(e)
            }
        },
        props:{
            title:{
                type:String,
                default:'',
            },
            actions:{
                type:String,
                default:''
            },
            default:String,
            other:{
                type:String,
                default:''
            }
        },
        mounted(){
            // console.log(this.actions)
            // console.log(this.action_select)
            // let a = this.action_select.length-1
            // console.log(`----${this.action_select[a].name}----`,this.action_select[a].value)
        },
        methods:{
            checkchange(e){
                if(this.other==''){
                    this.cdez = e.detail
                    // console.log(this.cdez)
                    this.$emit('setParam',this.cdez.join(','))
                }else{
                    if(e.detail.indexOf(this.other)>=0){
                        this.cdez = [this.other]
                        this.$emit('setParam',this.cdez.join(','))
                        return
                    }
                    this.cdez = e.detail
                    // console.log(this.cdez)
                    this.$emit('setParam',this.cdez.join(','))
                }
                
            },
        }
    }
</script>

<style scoped>

</style>