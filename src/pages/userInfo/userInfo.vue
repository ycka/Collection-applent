<template>
    <div class="content">
        <view>
            用户信息
        </view>
        <van-row class="btn" gutter="10">
            <van-col span="8"><van-button plain type="primary" block>停用</van-button></van-col>
            <van-col span="8"><van-button plain type="info" block>重启</van-button></van-col>
            <van-col span="8"><van-button plain type="info" block>重置密码</van-button></van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .btn{
        padding:40upx;
    }
</style>