import { getInfor, getUserList } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
import { removeToken } from "../../utils/auth";


const state = {
  token: '',
  uuid: '',
  nickname: '',
  avatar: '',
  role: '',
  users: new Map(),
  redirectUrl: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {

    state.token = token
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid
  },
  SET_NICK_NAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }, SET_USERS (state, users) {

    for (let o of users) {
      state.users[o.uuid] = o;
    }
    window.localStorage.setItem("users", JSON.stringify(state.users));
  },
  SET_REDIRECTURL: (state, redirectUrl)=>
  {
    state.redirectUrl = redirectUrl
  }
}

const actions = {
  init ({ commit }) {
    getUserList().then(res => {
      commit('SET_USERS', res.list);
    })
  }, setRedirect ({ commit }, redirectUrl) {
    commit('SET_REDIRECTURL', redirectUrl);

  },
  getInfor ({ commit }, token) {
    return new Promise((resolve, reject) => {
      getInfor(token).then(res => {

        const { uuid, nickname, avatar, role } = res.user;

        commit('SET_TOKEN', token);
        commit('SET_UUID', uuid);
        commit('SET_NICK_NAME', nickname);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLE', role);
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  },
  logout ({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_UUID', '');
    commit('SET_NICK_Name', '');
    commit('SET_AVATAR', '');
    commit('SET_ROLE', '');
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
