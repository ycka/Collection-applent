import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'
import service from '@/service'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		select_code:{},
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		sessionid:'',
		userInfo:{},
		imgurl:'',
		userName: "",
		person_id:'',
		styleClass:{
			style_is:'style_two',
		},
		at:1,
		select_tree:{
			l2:[],
			l3:[],
			l4:[],
			l5:[],
			l6:[]
		},
		submitDefaultData:{
			sub1:{},
			sub2:{},
			sub3:{},
			sub4:{}
		},
		aac002:'',
		screenHeight:0,
		userList:[],
		single_user:{},
		dbdata:[],
		setSelect:[],
		editData:null,
		select_top_tree:{},
		select_page_data:[]
	},
	mutations: {
		set_select_page_data(state,param){
			state.select_page_data = param
		},
		set_top_select_tree(state,param){
			param.areaList = param.areaList.map(obj=>{
				return {...obj,text:obj.label,value:obj.id}
			})
			
			state.select_top_tree = param
		},
		set_at(state,param){
			state.at = param
		},
		edit_data(state,param){
			state.editData = param
		},
		set_db(state,param){
			state.dbdata = param
		},
		set_single_user(state,param){
			console.log('single_user',param)
			state.single_user = param
		},
		set_userlist(state,param){
			state.userList = param
		},
		set_userInfo(state,param){
			console.log(param)
			Object.assign(state.userInfo,param.userInfo)
			console.log(state.userInfo)
			service.addUser(state.userInfo)
			store.commit('set_isLogin',service.getUsers())
		},
		init_userInfo(state,param){
			state.userInfo = param
		},
		set_isLogin(state,param){
			if(param.length>0){
				state.hasLogin = true
			}else{
				state.hasLogin = false
			}
			
		},
		set_sessionid(state,param){
			state.sessionid = param.sessionid
			state.imgurl = param.url
		},
		setHeight(state,param){
			state.screenHeight = param
		},
		setaac002(state,param){
			state.aac002 = param
		},
		set_submitDefaultData(state,param){
			state.submitDefaultData[param.key] = param.data
		},
		login(state, param) {
			state.hasLogin = param;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		set_person_id(state,data){
			state.person_id = data
		},
		set_styleClass(state,data){
			let color = ['style_one','style_two','style_three','style_four']
			state.styleClass.style_is = color[data]
		},
		set_select_code(state,data){
			console.log(data)
			let res = {}
			Object.keys(data).map(ob=>{
				res[ob] = data[ob].map(e=>({name:e.aaa103,value:e.aaa102,title:e.aaa101,keys:e.aaa100,text:e.aaa103,}))
			})
			console.log(res)
			state.select_code = res
		},
		set_select_tree(state,data){
			state.select_tree.l2 = data.filter(e=>e.floor=='2').map(o=>({...o,text:o.label,value:o.id}))
			state.select_tree.l3 = data.filter(e=>e.floor=='3').map(o=>({...o,text:o.label,value:o.id}))
			// console.log(state.select_tree)
			// state.select_tree = data
		},
		set_select_tree_2(state,data){
			state.select_tree.l4 = data.filter(e=>e.floor=='4').map(o=>({...o,text:o.label,value:o.id}))
			state.select_tree.l5 = data.filter(e=>e.floor=='5').map(o=>({...o,text:o.label,value:o.id}))
			state.select_tree.l6 = data.filter(e=>e.floor=='6').map(o=>({...o,text:o.label,value:o.id}))
			// state.select_tree = data
		},
		setSelect(state,data){
			state.setSelect = data
		}
	},
	actions:{
		async single_persion(store,param){
			let params = {aac002:param}
			console.log(params)
			let res = await http.post('/statistics/getCollectInfo',params)
			return res
		},
		// 删除
		// /systemSettings/deleteCollectById
		async delete_data(store,param){
			let params = {
				aac001:param
			}
			let res = await http.post('/systemSettings/deleteCollectById',params)
			return res
		},
		async exMssn_non(store,param){
			// /collectData/getPersonInfoByIdCard
			console.log(param)
			let res = await http.post('/collectData/judge',param)
			return res
		},
		async exMssn_data(store,param){
			// /collectData/getPersonInfoByIdCard
			console.log(param)
			let res = await http.post('/collectData/getPersonInfoByIdCard',param)
			return res
		},
		async setUserAdt(store,param){
			let res = await http.post('/account/update',param)
			return res
		},
		async getMockAddress(store,param){
			console.log(param)
			let res = await http.post('/statistics/getCollectForPublic',{aaa020:param})
			if(res.success == "OK"){
				console.log(`-----位置----`,res)
				return res.data
			}
			
		},
		async getSelect(store,params){
			let param = {
				accountId:params
			}
			let res = await http.post('/account/search/condition',param)
			console.log(`------查询页面四级数据-----`,res)
			store.commit('set_top_select_tree',res.data)
			// store.commit('setSelect',res)
		},
		async getSystemPublic(){
			let param = {
				"currentPage":"1",
				"pageSize":"10"
			}
			let res = await http.post('/systemSettings/getSysNoticeList',param)
			console.log(`------系统公告-----`,res)
		},
		async phtoto(store,param){
			let res = await http.post('/account/mobileUnique',param)
			console.log(res)
			if(res.success == "OK") return res.data
			return false
		},
		async mssn(store,param){
			let res = await http.post('/account/idCardUnique',param)
			console.log(res)
			if(res.success == "OK") return res.data
			return false
		},
		async db(store,param){
			console.log(param)
			let res = await http.post('/statistics/getInfo',param)
			if(res.success == "OK"){
				console.log(res)
				store.commit('set_db',res.data)
				return res.data
			}
		},
		async dbDown(store,param){
			let res = await http.post('/statistics/getDrillDownInfo',param)
			if(res.success == "OK"){
				console.log(res)
				return res.data
			}
		},
		async clear(param){
			let res = await http.post('/systemSettings/deleteCollectById',param)
			console.log(res)
			if(res.success == "OK") return true
			return false
		},
		async islive(store,param){
			let res = await http.post('/account/usedLoginName',param)
			console.log(res)
			if(res.success == "OK") return res.data
			return false
		},
		async startAndStop(store,param){
			let res = await http.post('/account/onOrOff',param)
			if(res.success == "OK") return res.data
			return false
		},
		async reset(store,param){
			let res = await http.post('/account/passwordReset',param)
			if(res.success == "OK") return true
			return false
		},
		async get_userlist(store,param){
			console.log(param)
			let res = await http.post('/account/getList',param)
			console.log(res)
			if(res.success == "OK") store.commit('set_userlist',res.data.dataList)
			return res.data.dataList
		},
		// 除了地址外所有代码项
		async getData(store,param){
			let res = await http.post('/code/allCode')
			store.commit('set_select_code',res.data)
		},
		async submitall(store,param){
			console.log(param.data)
			await http.post(`/collectData/savePage${param.key}`,param.data)
		},
		// 地址 省市
		async getAddress(store,param){
			// let address = await http.get('/area/allArea')
			let address = await http.post('/area/provinceAndCity')
			store.commit('set_select_tree',address.data)
		},
		// 
		async findroot(store,param){
			let params = {
				areaId:param
			}
			let res = await http.post('/area/findAreaToRoot',params)
			return res
		},
		// 地址 市下级单位
		async getCity(store,param){
			let params = {
				"areaId":param
			}
			let address = await http.post('/area/findAreaFromAreaId',params)
			store.commit('set_select_tree_2',address.data)
		},
		// 查询页面接口
		async getList(store,param){
			let params = {
				"currentPage":"1",	//当前页   
				"pageSize":"10",     // 每页数据条数
				"areaId":"460031000000",        // 区域
				"timeCode":"1",      // 时间代码项
				"sex":"1",           // 性别
				"ageFlg":"1",        // 年龄（是否在13 -- 15岁）
				"accountNature":"2", // 户口性质
				"orderCode":"desc"     // 排序代码项
			}
			console.log(param)
			let list = await http.post('/account/search/list',param)
			store.commit('set_select_page_data',list.data.dataList)
			console.log(list)
			return list
		},
		async regPassword(state,param){
			let list = await http.post('/account/passwordModify',param)
			return list
		},
		// 查询页面下钻
		async getDown(store,param){
			let params = {
				"aac001":"2"		  // 主键，接口No.9中返回数据中的一个字段
			}
			let list = await http.get('/account/search/one',params)
			console.log(list)
		},
		// No.11 查看
		async getDown(store,param){
			let params = {
				"aac001":"2"		  // 主键，接口No.9中返回数据中的一个字段
			}
			let list = await http.get('/account/search/modify')
			console.log(list)
		},
		// No.11 删除
		async remove(store,param){
			let params = {
				"aac001":"2"          // 主键，接口No.9中返回数据中的一个字段
			}
			let list = await http.post('/account/search/remove',params)
			console.log(list)
		},
		// No.14 
		async remove(store,param){
			let params = {
				"accountId":"6"				// 登录用户信息中的主键   数据库对应字段名：ACC001
			}
			let list = await http.post('/account/search/condition',params)
			console.log(list)
		},
		// 登陆接口 
		async login(store,param){
			console.log(param)
			let res = await http.post('/login/check',param)
			return res
		},
		// 定位接口
		async location(store,param){
			// let res = await http.post('/dingwei',param)
			// console.log(res)
			console.log(param)
		},
		// 验证码
		verifyCode(store,param){
			return new Promise((resolve, reject) => {
				wx.request({
					url:'http://223.100.130.116:7171/ahiru/login/verifyCode',
					method:'get',
					responseType:'arraybuffer',
					success(res){
						let img = 'data:image/png;base64,'+wx.arrayBufferToBase64(res.data);
						let sessionid = res.header['Set-Cookie'];
						service.setSessionId(sessionid)
						store.commit('set_sessionid',{url:img,sessionid:sessionid})
						resolve(img)
					}
				});
			})
			
		}
	}
})

export default store
