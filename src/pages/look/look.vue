<template>
    <view class="content page_main">
        <custom-header title="信息查看" child></custom-header>
        <view class="font-box">
            <view class="fontTitle">姓名:</view>
            <view class="fontVal">
                <span>{{persion.aac003}}</span>
            </view>
        </view>
        <view class="font-box">
            <view class="fontTitle">身份证:</view>
            <view class="fontVal">
                <span>{{persion.aac002}}</span>
            </view>
        </view>
        
        <view v-for="(obj,idx) in persionKey" :key="idx" class="font-box" v-if="obj.name!=undefined&&obj.value!=null">
            <view class="fontTitle">{{obj.name}}:</view>
            <view class="fontVal">
                <span v-for="o in obj.value" :key="o.text">{{o.text}}</span>
            </view>
        </view>
        <view class="center-clomn mt">
            <van-button plain type="info" @tap="edit">修改</van-button>
            <van-button plain type="info" @tap="dele">删除</van-button>
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
                persionKey:[],
                xt:{
					aac003:'姓名',
					aac004:'性别',
					aac002:'身份证号',
					aac006:'出生日期',
					aac007:'年龄',
					aac005:'民族',
					aae005:'联系电话',
					aac028:'常住地址',
					aac026:'常住地址',
					aaa021:'户籍地址',
					aac010:'户籍地址',
					abc003:'户主名字',
					abc002:'户主身份证号',
					aac09w:'本人与户主关系',
					aac056:'是否为13-15周岁人员',
					aac057:'请输入就读院校',
					aac011:'文化程度',
					aac033:'健康状况',
					aac009:'户籍性质',
					aac013:'文化水平',
					aac034:'健康状况',
					aac058:'户籍性质',
					aac024:'是否享受政府扶持政策',
					aaa020:'户籍地址代码',
					aac027:'常住地址代码',
                    aaz001:'是否市测试用户',
                    aas008:'其他希望培训天数',
                    aas004:'参加培训时间',
                    aae036:'采集日期',
                    aae022:'是采集人的区域',
                    aae013:'备注',
                    acc001:'采集人',
                    aae011:'采集人id',
                    

                    aav003:'是否异地搬迁劳动力',
					aat001:'是否具备技能资格',
					aat029:'技能资格',
					aat002:'是否具备专业技术资格',
					aav001:'是否建档立卡贫困劳动力',
					aav002:'是否已脱贫',
					aat030:'技能资格',
                    aav017:'是否失地农民',
                    aav018:'是否已转非农',
                    aav004:'人口资源分类',
                    aav005:'就业（转移）状态',
                    aav013:'未就业原因',
                    aav025:'未就业原因',
                    aav015:'是否有就业意向',
                    aav019:'是否曾参加培训',
                    aav016:'具体就业意向',
                    aav026:'参加培训意向',
                    aav020:'参加培训工种',
                    aav022:'参训开始时间',
                    aav023:'参训结束时间',
                    aad002:'创业项目名称',
                    aad003:'创业项目地址',
                    aad001:'创业时间',
                    aav010:'转移就业时间',
                    aad007:'创业项目所属行业',
                    aad009:'行业',
                    aad010:'创业单位类型',
                    aad008:'创业单位类型',
                    aad004:'创业项目投资金额',
                    aad005:'创业带动就业人数',
                    aad006:'带动贫困劳动力就业人数',
                    aav006:'转移就业方式',
                    aav007:'是否有组织劳务输出',
                    aav008:'从事行业',
                    aav024:'行业',
                    aav009:'转移就业地点',
                    aav011:'转移就业单位名称',
                    aav012:'转移就业月收入',
                    aav014:'返乡时间',
                    aav021:'参加培训意向',


                    aat001:'是否具备技能资格',
                    aat019:'失业原因',
                    aat029:'技能资格',
                    aat002:'是否具备专业技术资格',
                    aat030:'专业技术资格',
                    aat005:'被调查人目前是否就业',
                    aat003:'家庭人口数量',
                    aat004:'家庭就业人口数量',
                    aat015:'是否已登记失业',
                    aat016:'原单位名称',
                    aat017:'原职业（工种）',
                    aat018:'失业时间',
                    aat032:'失业原因',
                    aat014:'主要原因',
                    aat033:'主要原因',
                    aat020:'主要原因',
                    aat006:'被调查人就业情况',
                    aat007:'就业形式',
                    aat031:'就业形式',
                    aat008:'就业单位',
                    aat009:'职业（工种）',
                    aat010:'单位详细地址',
                    aat011:'是否签订劳动合同',
                    aat012:'现工作单位就业时间（月数）',
                    aad009:'所属行业',
                    aad007:'所属行业',
                    aad008:'创业类型',
                    aad010:'创业类型',
                    aat013:'灵活就业状态',
                    aat028:'自由职业者',
                    aat034:'自由职业者',

                    aas002:'技术等级',
                    aas003:'参加培训情况',
                    aas001:'参保情况',
                    aas005:'想参加职业技能培训吗？',
                    aas006:'想参加的工种1',
                    aas009:'想参加的工种2',
                    aas010:'想参加的工种3',
                    aas007:'希望培训的时间',
				},

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
                let a = this.select_code[obj.toUpperCase()]
                let name = '',value=''
                if(a){
                    name = a[0].title
                    if(this.persion[obj]!=null){
                        value = a.filter(e=>e.value==this.persion[obj])
                    }else{
                        value = null
                    }
                }else{
                    // console.log(this.persion[obj])
                    name = this.xt[obj]
                    
                    value = [{text:this.persion[obj]}]
                    if(this.persion[obj]==null) value=null
                }
                // console.log(obj,name)
                return {name,value}
            })
            key = key.filter(e=>e.name!='姓名'&&e.name!='身份证号'&&e.name!=undefined)
            console.log(key)
            this.persionKey = key
        },
        methods:{
            dele(){
                this.$store.dispatch('getList',this.persion.aac001).then(e=>{
                    if(e.success=="OK") this.$store.dispatch('getList',this.submitData)
                })
            },
            edit(){
                // console.log(this.persion)
                this.$store.commit('edit_data',this.persion)
                // switchTab
                uni.reLaunch({
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