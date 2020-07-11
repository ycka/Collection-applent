<template>
    <div class="content">
        <custom-header title="用户信息" child></custom-header>
        <van-panel :title="single_user.aac003" desc="描述信息" status="状态" use-footer-slot>
            <view>
                <view class="font-box" v-for="(obj,idx) in notcode" :key="idx">
                    {{obj}}: {{single_user[obj]}}
                </view>
                <view class="font-box" v-for="(obj,idx) in names" :key="idx">
                    {{obj.title}}: {{obj.value}}
                </view>
                <!-- <view class="font-box">{{select_code['AAZ026'].find(e=>e.value==single_user.aaz026).text}}</view> -->
            </view>
            <view slot="footer">
                <!-- <van-button size="small">按钮</van-button>
                <van-button size="small" type="danger">按钮</van-button> -->
            </view>
        </van-panel>
        <van-row class="btn" gutter="10">
            <van-col span="8"><van-button plain type="primary" block @click="isover('0')">停用</van-button></van-col>
            <van-col span="8"><van-button plain type="info" block @click="isover('1')">重启</van-button></van-col>
            <van-col span="8"><van-button plain type="info" block @click="reset">重置密码</van-button></van-col>
        </van-row>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    export default {
        data(){
            return{
                notcode:[]
            }
        },
        computed: {
            ...mapState(['single_user','userInfo','select_code']),
            names(){
                return this.getname()
            }
        },
        methods:{
            getname(){
                // toLowerCase xiao
                console.log('-------------',this.single_user)
                console.log('--------',this.select_code)
                let res = Object.keys(this.single_user).filter(e=>e!='aaz026'&&e!='aac010').map(e=>e.toUpperCase())
                let arr = res.map(obj=>{
                    // console.log(obj)
                    // console.log('--------',this.select_code[obj])
                    let item = null
                    if(this.select_code[obj]!=undefined){
                        item = this.select_code[obj].find(e=>e.value==this.single_user[obj.toLowerCase()])
                    }else{
                        this.notcode.push(obj.toLowerCase())
                        return null
                    }
                    console.log(item,item.title,item.name)
                    return {
                        title:item.title,
                        value:item.name
                    }
                })
                arr = arr.filter(e=>e!=null)
                console.log(arr)
                return arr
            },
            reset(){
                let param = {
                    acc001:this.single_user['acc001'],
                    aac002:this.single_user['acc002'],
                }
                uni.showModal({  
                    title: '提示',  
                    content: '是否重置密码',  
                    success: (res)=> {  
                        if (res.confirm) {  
                            console.log('用户点击确定') 
                            this.$store.dispatch('reset',param).then(e=>{
                                if(e){
                                    uni.showToast({
                                        icon: 'none',
                                        title: '重置成功，密码重置为身份证后6位'
                                    });
                                }
                            }) 
                            // instance.close();
                        } else if (res.cancel) {  
                            console.log('用户点击取消')  
                            // instance.close();
                        }  
                    }  
                }) 
                
            },
            isover(nu){
                let param = {
                    acc001:this.single_user['acc001'],
                    aae100:nu,
                }
                uni.showModal({  
                    title: '提示',  
                    content: `是否${nu=="0"?'停用':'启用'}账户`,  
                    success: (res)=> {  
                        if (res.confirm) {  
                            console.log('用户点击确定') 
                            this.$store.dispatch('startAndStop',param).then(e=>{
                                if(e){
                                    uni.showToast({
                                        icon: 'none',
                                        title: `${nu=="0"?'停用':'启用'}成功`
                                    });
                                }
                            }) 
                            // instance.close();
                        } else if (res.cancel) {  
                            console.log('用户点击取消')  
                            // instance.close();
                        }  
                    }  
                }) 
            }
        }
    }
</script>

<style scoped>
    .btn{
        padding:40upx;
    }
    .font-box{
        padding:40upx;
        font-size:32upx;
    }
</style>