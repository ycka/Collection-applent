export default{
    data(){
        return {
            style:[
                {
                    bg:'brown',
                    color:'#505050'
                },
                {
                    bg:'cadetblue',
                    color:'#fff'
                },
                {
                    bg:'chartreuse',
                    color:'#000'
                },
            ]
        }
    },
    methods:{
        color(param){
            console.log(`---------风格样式----------`,param)
            this.$store.commit('set_styleClass',param)
        }
    }
}