import * as types from '../types'
const state = {
    user: 123,
    a:'kkk'
};
const actions = {
    clickChangesBtn({ commit,state}) {
        commit(types.clickChange);
    }
};

const mutations = {
    [types.clickChange](state) {
        state.user = '====hello====' + parseInt(Math.random()*100);
    }
};
const getters = {
    user: (state,getters,c) => {
//  	console.log(state)
//  	console.log(getters)
//  	console.log(c)
		return state.user;
	},
};
export default {
    state,
    actions,
    mutations,
    getters
};