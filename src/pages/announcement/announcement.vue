<template>
    <view class="content">
        <custom-header title="系统公告" child></custom-header>
        
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: mapState(['select_code', 'hasLogin', 'userName','userInfo','styleClass']),
		onShow(){
			console.log('--传参数了--',this.userInfo)
			this.$store.dispatch('getSystemPublic')
		},
    }
</script>

<style scoped>

</style>