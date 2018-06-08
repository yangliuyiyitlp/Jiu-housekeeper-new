import * as types from './types'

export default{
	[types.GET_TABLE_DATA](state,newData) {
		state.selectArr = newData
	},
  [types.GET_CONTROL_DATA](state,newData) {
    state.controlArr = newData
  },
	[types.GET_POWER_BTN_ARR](state,newData) {
		state.powerBtnArr = newData
//		console.log(newData,'-=-=--=-=-')
	},
//	[types.GET_MENU_ID](state,newData) {
//		state.menuId = newData
////		console.log(newData,'-=-=--=-=-')
//	},

}
