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
}
