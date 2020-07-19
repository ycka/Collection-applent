<template>
    <view class="page-section">
        <!-- 地址 -->
            <van-tree-select
            :items="data2"
            :main-active-index="mainActiveIndex"
            :mainActiveIndex_two="mainActiveIndex_two"
            :active-id="activeId"
            @click-nav="onClickNav"
            @click-item="onClickItem"
            @click-nav-two="onClickNav_two"
            />
    </view>
</template>

<script>
    import { mapState } from 'vuex' 
    export default {
        computed: mapState(['select_top_tree']),
        props:{
            title:{
                type:String,
                default:'',
			},
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
				next:1,
                dizhi:[],
                caname:[],
                address:[],
                data2:[],
                subcity:'',
                allDa:[],
            }
        },
        watch:{
            select_top_tree(){
                this.allDa = this.select_top_tree.areaList
                let min = this.allDa.sort((a,b)=>a-b)[0].floor
                this.data2 = this.select_top_tree.areaList.filter(e=>e.floor==min)
                this.data2 = this.data2.map(obj=>{
                    let arr = this.allDa.filter(e=>e.parentId == obj.id)
                    arr = arr.map(o=>{
                        this.allDa.map(objx=>{
                        })
                        let ar = this.allDa.filter(e=>e.parentId == o.id)
                        o.children = ar
                        return o
                    })
                    obj.children = arr
                    return obj
                })
            }
        },
        mounted(){
            this.dizhi = []
            this.caname = []
            this.address = []
            
            // this.$store.dispatch('getCity')
        },
        methods:{
            // 第二个
            onClickNav({ detail = {} }) {
                // console.log(detail)
                // detail.item.children =  this.allDa.filter(obj=>obj.parentId==detail.item.id)//this.select_tree.l5.filter(e=>e.parentId == detail.item.id)
                // console.log(detail.item.children)
                this.caname[0] = detail.item.id
                this.address[0] = detail.item.text
                this.mainActiveIndex = detail.index || 0
                this.mainActiveIndex_two = 0
                this.activeId = null
            },
            onClickNav_two({ detail = {} }) {
                // detail.item.children =  this.allDa.filter(obj=>obj.parentId==detail.item.id)
                this.caname[1] = detail.item.id
                this.address[1] = detail.item.text
                this.mainActiveIndex_two = detail.index || 0
                this.activeId = null

                this.homename_three = this.address.join('-')
                let para = this.caname[this.caname.length-1]
                console.log(`-----para------`,para)
                this.$emit('setParam',{all:this.address.join(''),name:this.address.join('-'),value:para})
            },

            onClickItem({ detail = {} }) {
                // console.log(detail)
                this.caname[2] = detail.id
                this.address[2] = detail.text
                this.activeId = this.activeId === detail.id ? null : detail.id;

                this.homename_three = this.address.join('-')
                let para = this.caname[this.caname.length-1]
                console.log(`-----para------`,para)
                this.$emit('setParam',{all:this.address.join(''),name:this.address.join('-'),value:para})
                
            },
			
        }
    }
</script>

<style scoped>

</style>