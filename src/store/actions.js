import * as types from './types'
import axios from 'axios';
import api from '../api'

export default{
	//获取导航数据
  
//	[types.SET_activityId]({ commit, state },params){
//	    commit(types.SET_activityId,params)	     
//	},
	[types.SET_SELECT_TABLE]({ commit, state },params){
	    commit(types.GET_TABLE_DATA,params)	     
	},
	[types.SET_POWER_BTN_ARR]({ commit, state },params){

  		return new Promise((resolve,reject)=>{
			api.permissionBtnPower(params).then((res)=>{
				if(res.data.code == '1'){
					 commit(types.GET_POWER_BTN_ARR,res.data.data.options)	
//					 console.log(res.data.data,888888777777)
					 resolve(res.data.data.options)
				}else{
					vm.$message({
						type: 'error',
						message: res.data.msg
					});
				}
//				resolve(res)
			}).catch((err)=>{
				console.log(err)
				reject(err)
			})
		})
	},
}
