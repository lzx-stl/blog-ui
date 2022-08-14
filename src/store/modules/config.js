import { getConfig, updateConfig } from "../../api/config";

const state = {
  id: '',
  topImg: '',
  mainImg: '',
  eventImg: '',
}

const mutations = {
  SET_TOP_IMG: (state, topImg) => {
    state.topImg = topImg
  },
  SET_MAIN_IMG: (state, mainImg) => {
    state.mainImg = mainImg
  },
  SET_EVENT_IMG: (state, eventImg) => {
    state.eventImg = eventImg
  }
}

const actions = {
  getConfig ({ commit }, id) {
    console.log(id)
    return new Promise((resolve, reject) => {
      getConfig(id).then(res => {
        const { topImg, mainImg, eventImg } = res.config;
        commit('SET_TOP_IMG', topImg);
        commit('SET_MAIN_IMG', mainImg);
        commit('SET_EVENT_IMG', eventImg);
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  },
  setConfig ({ commit }, form) {
    const id = form.id;
    return new Promise((resolve, reject) => {

      updateConfig(form).then(res => {
        this.dispatch('config/getConfig', id);
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

