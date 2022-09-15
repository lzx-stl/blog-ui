import { login, getInfor, getUserList, updateUser } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
import Vue from "vue";
import { removeToken } from "../../utils/auth";


const state = {
  token: '',
  uuid: '',
  avatar: '',
  nickname: '',
  username: '',
  information: '',
  users: new Map(),
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, { uuid, nickname, avatar, username, information }) => {
    state.uuid = uuid
    state.nickname = nickname
    state.avatar = avatar
    state.username = username
    state.information = information
    window.localStorage.setItem("uuid", uuid)
    // if (state.users.has(uuid)) {
    //   state.users[uuid].nickname = nickname;
    //   state.users[uuid].avatar = avatar;
    //   window.localStorage.setItem("users", JSON.stringify(state.users));
    // }
  },
  SET_USERS (state, users) {
    let m = new Map()
    for (let o of users) {
      m.set(o.uuid, o);
    }

    window.localStorage.setItem("users", m)
    Vue.set(state, 'users', m)
  },
}

const actions = {
  init ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserList().then(res => {
        commit('SET_USERS', res.list);
      
        resolve()
      })
    })
  },
  getInfor ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfor().then(res => {
        commit('SET_TOKEN', getToken())
        commit('SET_USER', res.user);
        resolve(res.user);
      }).catch(error => {
        reject(error);
      })
    })
  }, updateInfor ({ commit }, user) {
    return new Promise((resolve, reject) => {
      updateUser(user).then(res => {
        commit('SET_USER', res.user);
        resolve(res.user);
      }).catch(error => {
        reject(error);
      })
    })
  },
  login ({ commit, user }) {

  },
  logout ({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_USER', {});
    // window.localStorageNaNpxoveItem("")
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
