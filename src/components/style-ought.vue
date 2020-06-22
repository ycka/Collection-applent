<template>
    <view class="style_su">
        <view @tap="color(0)" class="style_one style_child"></view>
        <view @tap="color(1)" class="style_two style_child"></view>
        <view @tap="color(2)" class="style_three style_child"></view>
        <view @tap="color(3)" class="style_four style_child"></view>
    </view>
</template>

<script>
    import services from './public.js'
    export default {
        mixins:[services],
    }
</script>

<style scoped>

</style>