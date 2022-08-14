
const state = {
  rootId: '',
  toId: '',
}

const mutations = {
  SET_TO: (state, toId) => {
    state.toId = toId
  },
  SET_ROOT (state, rootId) {
    state.rootId = rootId
  }
}

const actions = {
  change({ commit }, {rootId, toId}) {
    commit('SET_ROOT', rootId);
    commit('SET_TO', toId);
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

