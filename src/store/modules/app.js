
import { getBannerList } from '@/api/config'
const state = {
  bannerList: [],
}

const mutations = {
  SET_BANNER_LIST: (state, bannerList) => {
    state.bannerList = bannerList
  }
}

const actions = {
  getConfig ({ commit }) {
    return new Promise((reslove, reject) => {
      getBannerList().then(res => {
        const { bannerList } = res;
        commit('SET_BANNER_LIST', bannerList)
        reslove();
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

