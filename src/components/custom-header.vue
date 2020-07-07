<template>
    <view>
        <view :class="{'custom':true,actionv:color}" :style="{'height':screenHeight+'px','position':'fixed','top':0,'left':0,'z-index':9999}">
            <view :style="{'width':'100%','height':(screenHeight-45)+'px'}"></view>
            <view v-show="!child" class="title_main">{{title}}</view>
            <view v-show="child" class="title_child">
                <span>
                    <van-icon @tap="backs" size="18px" style="position:relative;top:10upx;" name="arrow-left" :style="{'visibility':back?'hidden':'visile'}"/>
                </span>
                {{title}}
            </view>
        </view>
        <view :class="{'custom':true,actionv:color}" :style="{'height':screenHeight+'px'}"></view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: mapState(['screenHeight']),
        methods:{
            backs(){
                uni.navigateBack();
            },
        },
        props:{
            child:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:''
            },
            color:{
                type:Boolean,
                default:false
            },
            back:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return{
                // statusBarHeight:0
            }
        },
        onLoad: function (options) {
            console.log(121020)
            var that = this
            
        }, 
    }
</script>

<style scoped lang="scss">
    .actionv{
        background:#5f70ff!important;
    }
    .custom{
        width: 100%;
        background: #1d659e;
        .title_main{
            text-align:center;
            color:#fff;
            line-height:45px;
            text-indent: 20upx;
            font-size:34upx;
            font-weight:700;
        }
        .title_child{
            text-align:left;
            color:#fff;
            line-height:45px;
            // text-indent: 20upx;
            font-size:32upx;
            font-weight:400;
        }
  }
</style>