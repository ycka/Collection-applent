<template>
    <view class="content">
        <van-search
            :value="value"
            label="地址"
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
                    <view>
                        <van-tree-select
                        :items="select_tree"
                        :main-active-index="mainActiveIndex"
                        :active-id="activeId"
                        @click-nav="onClickNav"
                        @click-item="onClickItem"
                        />
                    </view>
                </van-dropdown-item>
                <van-dropdown-item id="item2" v-model="value2" :options="option2" @change="setvalue2" />
                <van-dropdown-item id="item1" title="更多" v-model="value1" @change="setvalue1" >
                    <view>
                        自定义
                    </view>
                </van-dropdown-item>
                <van-dropdown-item id="item2" v-model="value3" :options="option3" @change="setvalue3" />
            </van-dropdown-menu>
            <!-- <van-button v-if="iscode" type="default" size="small" icon="ascending"></van-button>
            <van-button v-else type="default" size="small" icon="descending"></van-button> -->
        </view>

        <view class="data-box">

            <van-swipe-cell
            v-for="obj in tabledata"
            :key="obj.id"
            class="swipe-cell"
            :right-width="65"
            async-close
            @close="onClose"
            >
                <van-cell-group>
                    <view class="item">
                        <view class="touxiang">{{obj.header}}</view>
                        <view class="name">{{obj.name}}</view>
                        <view>{{obj.mssn}}</view>
                        <van-icon name="eye-o" @tap="look(obj)"/>
                        <van-icon name="records" @tap="edit(obj)"/>
                    </view>
                </van-cell-group>
                <view slot="right" class="rights">删除</view>
            </van-swipe-cell>

        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return{
                tabledata:[
                    {id:'0',name:'王二小',mssn:'210181198711249872',header:'头像'},
                    {id:'1',name:'王二小',mssn:'210181198711249872',header:'头像'},
                    {id:'2',name:'王二小',mssn:'210181198711249872',header:'头像'},
                    {id:'3',name:'王二小',mssn:'210181198711249872',header:'头像'},
                ],
                selectData:[
                    {id:1,name:'黄渤',mssn:'210187199287672292'},
                ],
                option1: [
                    { text: '市区', value: '0' },
                    { text: '县', value: '1' },
                    { text: '社区', value: '2' },
                ],
                option2: [
                    { text: '当日', value: 'a' },
                    { text: '本周', value: 'b' },
                    { text: '七天内', value: 'c' },
                    { text: '本月', value: 'd' }
                ],
                option3: [
                    { text: '时间升序', value: '0' },
                    { text: '时间降序', value: '1' },
                ],
                value:'',
                value1:'0',
                value2:'a',
                value3:'0',
                iscode:false,
                mainActiveIndex:0,
                activeId: null,
            }
        },
        computed: mapState(['select_tree']),
        methods:{
            onChange(e) {
                this.value = e.detail
            },
            onSearch() {
                console.log('搜索' + this.value);
            },
            onClick() {
                console.log('搜索' + this.value);
            },
            setvalue1(e){
                console.log(e.detail);
                this.value1 = e.detail
            },
            setvalue2(e){
                console.log(e.detail);
                this.value2 = e.detail
            },
            setvalue3(e){
                console.log(e.detail);
                this.value3 = e.detail
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
                console.log(e)
            },
            edit(e){
                console.log(e)
                this.$store.commit('set_person_id',e.id)
                wx.switchTab({
                    url: `../main/main?id=${e.id}`
                });
            },
            onClickNav({ detail = {} }) {
                this.mainActiveIndex = detail.index || 0
            },

            onClickItem({ detail = {} }) {
                this.activeId = this.activeId === detail.id ? null : detail.id;
            },
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
</style>