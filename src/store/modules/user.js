import {getInfor} from "@/api/user";
import {getToken} from "@/utils/auth";
import {removeToken} from "../../utils/auth";


const state = {
    token: '',
    uuid: '',
    name: '',
    avatar: '',
    role: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_UUID: (state, uuid) =>{
        state.uuid = uuid
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
        state.role = role
    }
}

const actions = {
    getInfor({commit}, token){
        console.log("获取信息")
        return new Promise((resolve, reject) => {
            getInfor(token).then(res => {
                const {uuid, name, avatar, role} = res.user;
                console.log(res.user)
                commit('SET_TOKEN', token);
                commit('SET_UUID', uuid);
                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                commit('SET_ROLE', role);
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout({commit}){
        commit('SET_TOKEN', '');
        commit('SET_UUID', '');
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');
        commit('SET_ROLE', '');
        removeToken();
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}


// import Vue from "vue";
// import Vuex from "vuex";
// import {getToken} from "../utils/auth";
//
// Vue.use(Vuex);
// const state = {
//     img: '',
//     config: {},
//     sum: 0,
//     commentForm: {},
//     replySelected: '',
//     user: {
//         token: getToken(),
//         username: '',
//         avatar: '',
//     }
// }
//
// const mutations = {
//     SET_USER(state, user) {
//         state.user = user
//     },
//     SET_CONFIG(state, config) {
//         state.config = config
//     },
//     CHANGE(state, replySelected) {
//         state.replySelected = replySelected
//     }
// }
//
//
// const actions = {
//     setUser(context, user) {
//         context.commit('SET_USER', user)
//     },
//     uploadnfig(context, config) {
//         context.commit('SET_CONFIG', config)
//     }
//     ,
//     change(context, replySelected) {
//         context.commit('CHANGE', replySelected)
//     },
// }
//
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions
// });
