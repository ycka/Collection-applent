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
                        <view class="name" @tap="select_qu">{{obj.header}}</view>
                        <view class="name">{{obj.name}}</view>
                        <view>{{obj.mssn}}</view>
						<view class="name">{{obj.item}}</view>
						<view class="name">{{obj.on}}</view>
                        <van-icon name="arrow" @tap="look(obj)"/>
                        <!-- <van-icon name="records" @tap="edit(obj)"/> -->
                    </view>
                </van-cell-group>
                <view slot="right" class="rights">删除</view>
            </van-swipe-cell>

        </view>
		<view style="margin-top:400upx;padding:40upx;">
			<van-button type="primary" @tap="toAddUser" block>新增</van-button>
		</view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return{
                tabledata:[
                    {id:'0',name:'王二小',mssn:'asdf',item:'类型2',header:'于洪区',on:'停用'},
                    {id:'1',name:'王二小',mssn:'asdf',item:'类型3',header:'沈河区',on:'停用'},
                    {id:'2',name:'王二小',mssn:'asdfasdf',item:'类型22',header:'大东区',on:'停用'},
                    {id:'3',name:'王二小',mssn:'asdfasdfas',item:'类型8',header:'铁西区',on:'停用'},
                ],
                value:'',
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
				wx.navigateTo({
                    url: `../userInfo/userInfo`
                });
            },
            edit(e){
                console.log(e)
                this.$store.commit('set_person_id',e.id)
                wx.switchTab({
                    url: `../main/main?id=${e.id}`
                });
			},
			select_qu(){
				console.log('显示区数据')
			},
			toAddUser(){
				wx.navigateTo({
                    url: `../addUser/addUser`
                });
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
            justify-content: space-between;
			height:120upx;
			font-size:32upx;
			padding:0 20upx;
			box-sizing:border-box;
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