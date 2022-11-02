import { loginByThird, getInfo, getUserList, updateUser } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
import { set } from "nprogress";
import Vue from "vue";
import { removeToken } from "../../utils/auth";
import openWindow from "@/utils/open-window";
const state = {
  token: getToken(),
  id: '',
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
  SET_USER: (state, user) => {
    const { id, nickname, avatar, username, information } = user;
    state.id = id
    state.username = username
    window.localStorage.setItem("user", JSON.stringify(user))
    // if (state.users.has(id)) {
    //   state.users[id].nickname = nickname;
    //   state.users[id].avatar = avatar;
    //   window.localStorage.setItem("users", JSON.stringify(state.users));
    // }
  },
  SET_USERS (state, users) {
    let m = new Map()
    for (let o of users) {
      m.set(o.id, o);
    }

    window.localStorage.setItem("users", m)
    Vue.set(state, 'users', m)
  },
  SET_ID(state, id)
  {
    state.id = id
  },
  SET_AVATAR (state, avatar) {
    state.avatar = avatar
  },

  SET_NICKNAME (state, nickname) {
    state.nickname = nickname

  },
  SET_ROLES(state, roles)
  {
    state.roles = roles
  }
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
  loginByThird ({ commit }, source) {
    return new Promise(async (resolve, reject) => {

      const option = await loginByThird(source);
      const { url } = option;

      // const {url} 
      let son = openWindow(url, '', 600, 400);

      window.addEventListener('message', (e) => {
        if (e.data == 'closed') {
          window.location.reload();
        }
      })
      let that = this
      // var loop = setInterval(function () {
      //   if (son.closed) {
      //     clearInterval(loop)
      //     //判读登录状态
      //     window.location.reload()
      //   }
      // }, 1000)
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const data = res.user
        if(data == null)  resolve(data);
        const { role, nickname, avatar, information, id } = data
        const roles = role ? role.split(',') : [];

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_ID', id);
        commit('SET_ROLES', roles)
        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
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
