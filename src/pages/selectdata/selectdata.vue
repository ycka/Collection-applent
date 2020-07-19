<template>
    <view class="content">
        <custom-header title="数据查询"></custom-header>
        <van-search
            :value="submitData.accountName"
            label="姓名"
            placeholder="请输入搜索关键词"
            use-action-slot
            @change="onChange"
            @search="onSearch"
            >
            <view slot="action" @tap="onClick">搜索</view>
        </van-search>
        <view class="btn-group">
            <!-- <van-button type="default" size="small" icon="search">全部</van-button> -->
            <van-dropdown-menu style="flex:1;">
                <van-dropdown-item id="item1" title="区域" v-model="value1" @change="setvalue1" >
                    <view style="display:flex;">
                        <view style="width:80%">
                            <select-address title="常住地址" @set-param="setdddress_two"></select-address>
                        </view>
                        <view style="width:20%;">
                            <view style="width:100%;height:80upx;"></view>
                            <view :class="{redactive:kkey==idx}" v-for="(obj,idx) in persions" :key="obj.aaz025" @click="setSelectQu(obj,idx)">{{obj.aac003}}</view>
                        </view>
                    </view>
                    <view style="display:flex;padding:30upx 10upx 10upx 10upx;background:#fff;border-top:2upx solid #ebebeb;">
                        <view style="width:200upx;"><van-button icon="/static/img/cz.png" type="default" size="large" @tap="reset">重置</van-button></view>
                        <view style="flex:1;padding-left:10upx;"><van-button type="info" size="large" @tap="sub">确定</van-button></view>
                    </view>
                </van-dropdown-item>
                <van-dropdown-item id="item2" v-model="value2" :options="select_code['TIME']" @change="setvalue2"/>
                <van-dropdown-item id="item3" title="更多" v-model="value1" @change="setvalue1" >
                    <view style="padding:40upx;max-height:440upx;overflow:auto;">
                        <h3 style="padding:40upx 0;">性别</h3>
                        <view>
                            <van-button v-for="obj in select_code['AAC0041']" :key="obj.value" style="margin-right:40upx;" :type="submitData.sex!==obj.value?'default':'info'" @tap="sexfunc(obj)" size="small">{{obj.text}}</van-button>
                            <!-- <van-button :type="submitData.sex==1?'default':'info'" @tap="submitData.sex=2" size="small">女</van-button> -->
                        </view>
                        <h3 style="padding:40upx 0;">年龄</h3>
                        <view>
                            <van-button v-for="obj in select_code['AAC0071']" :key="obj.value" style="margin-right:40upx;" :type="submitData.ageFlg!==obj.value?'default':'info'" @tap="agefunc(obj)" size="small">{{obj.text}}</van-button>
                            <!-- <van-button :type="submitData.ageFlg==1?'default':'info'" @tap="submitData.ageFlg=2" size="small">15岁以上</van-button> -->
                        </view>
                        <h3 style="padding:40upx 0;">户口性质</h3>
                        <view class="btn-groups">
                            <van-button v-for="ob in select_code['AAC009']" :key="ob.value" :type="submitData.accountNature!==ob.value?'default':'info'" @tap="hujifunc(ob)" size="small">{{ob.text}}</van-button>
                            <!-- <van-button :type="submitData.accountNature!==2?'default':'info'" @tap="submitData.accountNature=2" size="small">非农村户口</van-button>
                            <van-button :type="submitData.accountNature!==3?'default':'info'" @tap="submitData.accountNature=3" size="small">居民户口</van-button>
                            <van-button :type="submitData.accountNature!==4?'default':'info'" @tap="submitData.accountNature=4" size="small">港澳台人员</van-button>
                            <van-button :type="submitData.accountNature!==5?'default':'info'" @tap="submitData.accountNature=5" size="small">外籍人员</van-button> -->
                            <!-- <van-button :type="submitData.accountNature!==6?'default':'info'" @tap="submitData.accountNature=6" size="small">其他</van-button> -->
                        </view>
                        <view style="display:flex;padding:30upx 10upx 10upx 10upx;background:#fff;border-top:2upx solid #ebebeb;">
                            <view style="width:200upx;"><van-button icon="/static/img/cz.png" type="default" size="large" @tap="reset_on">重置</van-button></view>
                            <view style="flex:1;padding-left:10upx;"><van-button type="info" size="large" @tap="sub_on">确定</van-button></view>
                        </view>
                    </view>
                </van-dropdown-item>
                <van-dropdown-item id="item2" v-model="value3" :options="select_code['REORDER']" @change="setvalue3" />
            </van-dropdown-menu>
            <!-- <van-button v-if="iscode" type="default" size="small" icon="ascending"></van-button>
            <van-button v-else type="default" size="small" icon="descending"></van-button> -->
        </view>

        <view class="data-box">
            
            <van-swipe-cell
            v-for="(obj,idx) in select_page_data"
            :key="obj.aac003"
            class="swipe-cell"
            :right-width="0"
            async-close
            @close="onClose"
            >
                <van-cell-group>
                    <view class="item">
                        <view class="name">{{idx+1}}</view>
                        <view class="name">{{obj.aac003}}</view>
                        <view>{{obj.aac002}}</view>
                        <van-icon name="arrow" @click="look(obj)"/>
                    </view>
                </van-cell-group>
                <view slot="right" class="rights">删除</view>
            </van-swipe-cell>

        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    import selectAddress from '@/components/select-address'
    export default {
        components:{
            selectAddress
        },
        data(){
            return{
                selectData:[
                    {id:1,name:'黄渤',mssn:'210187199287672292'},
                ],
                
                value:'',
                value1:'0',
                value2:'',
                value3:'0',
                iscode:false,
                mainActiveIndex:0,
                activeId: null,
                demo:{
                    "currentPage":"1",	//当前页   
                    "pageSize":"10",     // 每页数据条数
                    "areaId":"460031000000",        // 区域
                    "timeCode":"1",      // 时间代码项
                    "sex":"1",           // 性别
                    "ageFlg":"1",        // 年龄（是否在13 -- 15岁）
                    "accountNature":"2", // 户口性质
                    "orderCode":"desc"     // 排序代码项
			    },
                submitData:{
                    currentPage:'1',
                    areaId:'',
                    pageSize:'10',
                    sex:1,
                    ageFlg:1,
                    accountNature:1,
                    orderCode:'desc',
                    timeCode:'0',
                    accountName:''
                },
                address_id:'',
                kkey:''
            }
        },
        onShow(){
            this.$store.commit('edit_data',null)
        },
        onLoad(){
            this.init()
            let as = this.userInfo['acc001']
            console.log(as)
            if(this.setSelect.length==0){
                this.$store.dispatch('getSelect',as)
            }
        },
        computed: {
            ...mapState(['select_code','userInfo','setSelect','select_top_tree','select_page_data']),
            persions(){
                if(this.address_id=='') return []
                let rs = this.select_top_tree.operationMap[this.address_id]
                if(rs!=undefined){
                    return rs
                }else{
                    return []
                }
            }
        },
        methods:{
            setSelectQu(data,idx){
                console.log(data)
                this.kkey = idx
                this.submitData.areaId = data.aaa020
            },
            setdddress_two(e){
                this.address_id = e.value
                console.log(e)
            },
            init(){
                this.value2 = this.select_code['TIME'][0].value
                this.value3 = this.select_code['REORDER'][0].value
                this.submitData.orderCode = this.select_code['REORDER'][0].value
                this.submitData.timeCode = this.select_code['TIME'][0].value
                this.submitData.accountNature = this.select_code['AAC009'][0].value
                this.submitData.sex = this.select_code['AAC0041'][0].value
                this.submitData.ageFlg = this.select_code['AAC0071'][0].value
                this.submitData.areaId = this.userInfo['aaa020']
                this.selectDa()
            },
            sexfunc(obj){
                this.submitData.sex = obj.value
            },
            hujifunc(e){
                this.submitData.accountNature=e.value
            },
            agefunc(e){
                this.submitData.ageFlg=e.value
            },
            onChange(e) {
                this.submitData.accountName = e.detail
            },
            onSearch() {
                console.log('搜索' + this.value);
            },
            selectDa(){
                this.$store.dispatch('getList',this.submitData)
            },
            onClick() {
                this.selectDa()
            },
            setvalue1(e){
                console.log(e.detail);
                this.value1 = e.detail
            },
            setvalue2(e){
                console.log(e.detail);
                this.value2 = e.detail
                this.submitData.timeCode = e.detail
            },
            setvalue3(e){
                console.log(e.detail);
                this.value3 = e.detail
                this.submitData.orderCode = e.detail
            },
            onClose(event) {
                const { position, instance } = event.detail;
                switch (position) {
                case 'left':
                case 'cell':
                    instance.close();
                    break;
                case 'right':
                    uni.showModal({  
                        title: '提示',  
                        content: '是否删除',  
                        success: function(res) {  
                            if (res.confirm) {  
                                console.log('用户点击确定')  
                                instance.close();
                            } else if (res.cancel) {  
                                console.log('用户点击取消')  
                                instance.close();
                            }  
                        }  
                    })  
                    break;
                }
            },
            look(e){
                console.log(e.aac003)
                wx.navigateTo({
                    url: `../look/look?data=${JSON.stringify(e)}`
                });
            },
            edit(e){
                console.log(e.aac003)
                this.$store.commit('edit_data',e)
                this.$store.commit('set_person_id',e.id)
                uni.reLaunch({url:`../main/main`})
                // wx.switchTab({
                //     url: `../main/main?id=${e.id}`
                // });
            },
            reset(){
                this.mainActiveIndex = 0
                this.activeId = null
            },
            sub(){
                this.selectComponent('#item1').toggle(false);
                this.selectDa()
            },
            sub_on(){
                this.selectComponent('#item3').toggle(false);
                this.selectDa()
            },
            reset_on(){
                Object.assign(this.submitData,{
                    sex:this.select_code['AAC0041'][0].value,
                    ageFlg:this.select_code['AAC0071'][0].value,
                    accountNature:this.select_code['AAC009'][0].value
                })

            }
        }
    }
</script>
<style>
    .van-dropdown-item--down{
        z-index:1!important;
    }
</style>
<style scoped lang="scss">
    .btn-group{
        display:flex;
        width:100%;
        padding:5upx 10upx;
        align-items:center;
        box-sizing:border-box;
        border:1upx solid #ebebeb
    }
    .data-box{
        width:100%;
        margin-top:10upx;
        .item{
            width:100%;
            display:flex;
            align-items: center;
            justify-content: space-around;
            height:120upx;
            font-size:36upx;
            .touxiang{
                width:100upx;
                height:100upx;
                border-radius: 50%;
                display:flex;
                align-items: center;
                justify-content: center;
                font-size:22upx;
                border:1px solid #ebebeb;
            }
            .name{
                max-width:120upx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
            .item-child{
                flex:1;
            }
        }
        .swipe-cell{
            width:100%;
            height:120upx;
            .rights{
                background:#ee0a24;
                width:180upx;
                height:100%;
                display:flex;
                align-items: center;
                justify-content: space-around;
                color:#fff;
                font-size:24upx;
            }
        }
    }
    .redactive{
        color:red;
    }
</style>