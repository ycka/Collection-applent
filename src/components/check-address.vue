<template>
    <view class="page-section" :style="{'margin-top':top?'10px':''}">
		<view class="weui-cells__title f36">
            <view class="required">* &nbsp;</view>
            <view> {{title}}</view>
			<view v-if="btn" @click="$emit('fuzhi')" style="text-decoration:underline;font-size:30upx;">点击可按[户籍地址]填入</view>
        </view>

        <van-cell :title="homename" @click="homeshow=true">
			<view v-if="btn" slot="right-icon">
				<!-- <van-tag type="success" @tap.stop="copy(e)">复制</van-tag> -->
			</view>
		</van-cell>
		<view style="height:10upx;" v-if="!two"></view>
        <van-cell :title="homename_three" @click="tow_show" v-if="!two">
			<view v-if="btn" slot="right-icon">
				<!-- <van-tag type="success" @tap.stop="copy(e)">复制</van-tag> -->
			</view>
		</van-cell>
        

        <!-- 地址 -->
		<van-action-sheet
		:show="homeshow"
		>
            <view style="display:flex;padding:30upx 10upx 10upx 10upx;justify-content:space-between;">
                <van-button type="default" size="small" @tap="reset_city">取消</van-button>
                <van-button type="default" size="small" @tap="sub_city">确定</van-button>
            </view>
			<van-tree-select-two
            :items="data1"
            :main-active-index="mainActiveIndex_city"
            :active-id="city"
            @click-nav="onClickNav_city"
            @click-item="onClickItem_city"
            />
		</van-action-sheet>
		<van-action-sheet
		:show="homeshow_three"
		>
			<!-- <template v-for="obj in next"> -->
                <!-- <view v-if="obj==(next-1)" :key="obj"> -->
                    <view style="display:flex;padding:30upx 10upx 10upx 10upx;justify-content:space-between;">
                        <van-button type="default" size="small" @tap="reset">取消</van-button>
                        <van-button type="default" size="small" @tap="sub">确定</van-button>
                    </view>
                    <van-tree-select
                    :items="data2"
                    :main-active-index="mainActiveIndex"
                    :mainActiveIndex_two="mainActiveIndex_two"
                    :active-id="activeId"
                    @click-nav="onClickNav"
                    @click-item="onClickItem"
                    @click-nav-two="onClickNav_two"
                    />
                <!-- </view> -->
                
			<!-- </template> -->
			
		</van-action-sheet>
    </view>
</template>

<script>
    import { mapState } from 'vuex' 
    export default {
        computed: mapState(['select_tree']),
        props:{
			top:{
                type:Boolean,
                default:false
			},
			btn:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:'',
			},
			value1:{
				type:String,
				default:''
			},
			value2:{
				type:String,
				default:''
            },
            two:{
                type:Boolean,
                default:false
            }
		},
		watch:{
			value1(e){
                this.homename = e
                console.log(`----title1-----`,this.homename)
			},
			value2(e){
				this.homename_three = e
			}
		},
        data(){
            return{
                mainActiveIndex:0,//左侧选中项的索引
                mainActiveIndex_city:0,
                city:null,
                activeId: null,//右侧选中项的 id，支持传入数组
                mainActiveIndex_two:0,
				homename:'点击选择省、市级区划',
				homename_three:'点击选择市级一下区划',
				homeshow:false,
				homeshow_three:false,
				next:1,
                dizhi:[],
                text_city:[],
                caname:[],
                address:[],
                data1:[],
                data2:[],
                subcity:'',
                subdown:''
            }
        },
        mounted(){
            this.dizhi = []
            this.text_city = []
            this.caname = []
            this.address = []
            this.$store.dispatch('getAddress').then(e=>{
                this.data1 = this.select_tree.l2
            })
            // this.$store.dispatch('getCity')
        },
        methods:{
            tow_show(){
                if(this.dizhi.length==0){
                    wx.showToast({
                        title: `请先选择省市选项`,
                        icon: 'none',
                    });
                    return
                }
                this.homeshow_three=true
                
            },
            // 第一个
            onClickNav_city({ detail = {} }) {
                // console.log(detail)
                detail.item.children =  this.select_tree.l3.filter(e=>e.parentId == detail.item.id)
                // console.log(detail.item.children)
                this.mainActiveIndex_city = detail.index || 0
                this.dizhi[0] = detail.item.id
                this.text_city[0] = detail.item.text
            },
            onClickItem_city({ detail = {} }) {
                // console.log(detail)
                this.dizhi[1] = detail.id
                this.text_city[1] = detail.text
                this.$store.dispatch('getCity',detail.id).then(e=>{
                    this.data2 =  this.select_tree.l4.filter(e=>e.parentId == detail.id)
                })
                this.city = this.city === detail.id ? null : detail.id;
            },
            // 第二个
            onClickNav({ detail = {} }) {
                // console.log(detail)
                detail.item.children =  this.select_tree.l5.filter(e=>e.parentId == detail.item.id)
                this.caname[0] = detail.item.id
                this.address[0] = detail.item.text
                this.mainActiveIndex = detail.index || 0
                this.mainActiveIndex_two = 0
                this.activeId = null
            },
            onClickNav_two({ detail = {} }) {
                detail.item.children =  this.select_tree.l6.filter(e=>e.parentId == detail.item.id)
                this.caname[1] = detail.item.id
                this.address[1] = detail.item.text
                this.mainActiveIndex_two = detail.index || 0
                this.activeId = null
            },

            onClickItem({ detail = {} }) {
                // console.log(detail)
                this.caname[2] = detail.id
                this.address[2] = detail.text
                this.activeId = this.activeId === detail.id ? null : detail.id;
            },
            reset(){
                this.homeshow_three = false
            },
            sub(){
                // this.next++
                // console.log(this.caname.join('-'),this.address.join(','),2)
                
                this.homename_three = this.address.join('-')
                let para = this.caname[this.caname.length-1]
                console.log(`-----para------`,para)
                this.$emit('setParam',{all:this.text_city.join('')+''+this.address.join(''),name:this.address.join('-'),value:para,index:2})
                this.homeshow_three = false
            },
            reset_city(){
                this.homeshow = false
            },
            sub_city(){
                this.next++
                // console.log(this.dizhi.join('-'),this.text_city.join(','),1)
                this.homename = this.text_city.join('-')
                this.subcity = this.dizhi.join(',')
                let para = this.dizhi[this.dizhi.length-1]
                console.log(`-----para------`,para)
                this.$emit('setParam',{all:this.text_city.join(''),name:this.text_city.join('-'),value:para,index:1})
                this.homeshow = false
            },

            // 原来的
			copy(e){
				this.$emit('copy',{value1:this.homename,value2:this.homename_three})
			},
			
        }
    }
</script>

<style scoped>

</style>