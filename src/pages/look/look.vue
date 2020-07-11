<template>
    <view class="content page_main">
        <custom-header title="信息查看" child></custom-header>
        <view v-for="(obj,idx) in persionKey" :key="idx" class="font-box">
            <view class="fontTitle">{{obj.name}}:</view>
            <view class="fontVal">{{obj.value}}</view>
        </view>
        <view class="center-clomn mt">
            <van-button plain type="info" @tap="dele">修改</van-button>
            <van-button plain type="info" @tap="edit">删除</van-button>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        // computed: mapState(['select_code', 'hasLogin', 'userName','userInfo','styleClass']),
        data(){
            return{
                persion:{},
                persionKey:[]
            }
        },
        computed: mapState(['select_code','userInfo','setSelect']),
        onShow(){
			console.log('--传参数了--',this.userInfo)
        },
        onLoad(e){
            this.persion = JSON.parse(e.data)
            console.log(this.persion)
            let key = Object.keys(this.persion).map(obj=>{
                console.log(obj)
                let a = this.select_code[obj.toUpperCase()]
                let name = '',value=''
                console.log(a)
                if(a){
                    name = a[0].title
                    if(this.persion[obj]!=null){
                        value = a.find(e=>e.value==this.persion[obj]).text
                    }else{
                        value = null
                    }
                }else{
                    name = obj
                    value = this.persion[obj]
                }
                return {name,value}
            })
            this.persionKey = key
        },
        methods:{
            dele(){
                console.log('delete')
            },
            edit(){
                this.$store.commit('edit_data',this.persion)
                uni.switchTab({
                    url:'../main/main'
                })
            }
        },
        // onHide(){
        //     this.$store.commit('edit_data',null)
        // }
    }
</script>

<style scoped lang="scss">
    .font-box{
        width:720upx;
        padding:15upx;
        display:flex;
        border-bottom:1px solid #ebebeb;
        .fontTitle{
            font-size:32upx;
            width:350upx;
        }
        .fontVal{
            font-size:30upx;
            width:370upx;
        }
    }
</style>