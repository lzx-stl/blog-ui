import { constantRoutes,userRoutes } from "@/router"
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {

  generateRoutes ({ commit }, roles) {
    // return new Promise(resolve => {
    //   let accessedRoutes
    //   if (roles.includes('admin')) {
    //     accessedRoutes = asyncRoutes || []
    //   } else {
    //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    //   }
    //   commit('SET_ROUTES', accessedRoutes)
    //   resolve(accessedRoutes)
    // })
    let res = []
    for (let route of constantRoutes)
      if (!route.hidden) res.push(route)
    commit('SET_ROUTES', res)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

