// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push(userInfo);
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const removeUser = function(userInfo) {
	let users = getUsers();
	users = []
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const getSessionId = ()=>{
	let ret = uni.getStorageSync('sessinoId');
	if(!ret){
		ret = ''
	}
	return ret
}
const setSessionId = (data)=>{
	uni.setStorageSync('sessinoId',data);
}

const userforget = (data)=>{
	uni.setStorageSync('FORGET',JSON.stringify(data));
}

const getuser = ()=>{
	let ret = '';
	ret = uni.getStorageSync('FORGET');
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

export default {
	getUsers,
	addUser,
	getSessionId,
	setSessionId,
	removeUser,
	userforget,
	getuser

}
