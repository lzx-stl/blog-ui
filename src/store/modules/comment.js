import {getConfig, updateConfig} from "../../api/config";

const state = {
    target: '',
}

const mutations = {
    SET_TARGET : (state, target) => {
        state.target = target
    }
}

const actions = {
    change({commit}, uuid){
        commit('SET_TARGET', uuid);
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

