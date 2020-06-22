import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		person_id:'',
		styleClass:{
			style_is:'style_one',
		},
		select_tree:[
			{
				// 导航名称
				text: '一层',
				id: 0,
				// 禁用选项
				// 该导航下所有的可选项
				children: [
					{
						// 名称
						text: '二层1',
						// id，作为匹配选中状态的标识
						id: 1,
					},
					{
						text: '二层2',
						id: 2,
						children: [
							{
								// 名称
								text: '三层1',
								// id，作为匹配选中状态的标识
								id: 12,
							},
							{
								text: '三层2',
								id: 22,
							},
						],
					},
				],
			},
		]
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
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
		}
	}
})

export default store
