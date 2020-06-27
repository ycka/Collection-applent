<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
        <!-- <van-cell :title="title" @click="ccashow=true" required></van-cell> -->
        <view class="weui-cells__title f36" v-if="title.trim().length>0">
            <view class="required">* &nbsp;</view>
            <view class="f36"> {{action_select[0].title}}</view>
        </view>
        <view>
            <van-radio-group v-if="action_select.length>2" v-model="radio" @change="onChange">
                <view class="radio_some_top"></view>
                <van-radio custom-class="radio_some" v-for="(obj,idx) in action_select" checked-color="var(--radio-checked-icon-color,#2589FF)" :name="obj.value" :key="idx" style="padding:10upx 0;">
                    <span class="f36">{{obj.name}}</span>
                </van-radio>
            </van-radio-group>
            <view v-else class="radio-two">
                <van-radio-group v-model="radio" @change="onChange" class="center-clomn">
                    <van-radio custom-class="radio_two" v-for="(obj,idx) in action_select" checked-color="var(--radio-checked-icon-color,#2589FF)" :name="obj.value" :key="idx" style="padding:10upx 0;">
                        <span class="f36">{{obj.name}}</span>
                    </van-radio>
                </van-radio-group>
            </view>
            
        </view>
        <!-- a -->
		<!-- <van-action-sheet
		:show="ccashow"
		:actions="actions"
		@select="aSelect"
		/> -->
    </view>
</template>

<script>
    import { mapState } from 'vuex' 
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
            actions:{
                type:String,
                default:''
            },
            default:String
        },
        computed: {
            ...mapState(['select_code']),
            action_select(){
                return this.select_code[this.actions.toUpperCase()]
            }
        },
        mounted(){
            // console.log(this.actions)
            // console.log(this.action_select)
            // let a = this.action_select.length-1
            // console.log(`----${this.action_select[a].name}----`,this.action_select[a].value)
        },
        watch:{
            default(e){
                this.radio = e
                // console.log(e)
            }
        },
        data(){
            return{
                ccaname:'',
                ccashow:false,
                radio:''
            }
        },
        methods:{
            // aSelect(event) {
			// 	this.ccaname = event.detail.name
            //     this.ccashow = false
            //     this.$emit('setParam',event.detail.value)
            // },
            onChange(event) {
                // console.log(event)
                this.radio = event.detail
                let ob = this.action_select.find(e=>e.value==event.detail)
                this.ccaname = ob.name
                this.$emit('setParam',this.radio)
            },
            onChangeTwo(event){
                // console.log(event.detail.value)
                this.radio = event.detail.value
                let ob = this.action_select.find(e=>e.value==event.detail.value)
                this.ccaname = ob.name
                this.$emit('setParam',event.detail.value)
            }
        }
    }
</script>

<style>
    
</style>