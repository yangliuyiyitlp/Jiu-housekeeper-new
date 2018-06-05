import * as types from './types'

export default{
	[types.GET_TABLE_DATA](state,newData) {
		state.selectArr = newData
	},
	[types.GET_POWER_BTN_ARR](state,newData) {
		state.powerBtnArr = newData
//		console.log(newData,'-=-=--=-=-')
	},
	

}
