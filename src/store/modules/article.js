
import {findAll} from "../../api/article";
const state = {
    list: [],
    listQuery: {
        page: 1,
        limit: 6,
        tag: null,
        keyWord: null,
        all: false,
    },
    loading: false,
    noMore: false
}

const mutations = {
    SET_LOADING : (state, loading)=>{
        state.loading = loading
    },
    SET_NOMORE : (state, noMore) => {
        state.noMore = noMore
    },
    SET_PAGE : (state, page) => {
        state.listQuery.page = page
    },
    SET_LIST : (state, list) => {
        state.list = list;
    }

}

const actions = {
    getList({commit, state}) {
        if (!state.loading) {
            commit('SET_LOADING', true);
            let {page, limit, tag, keyWord, all} = state.listQuery;
            let list = state.list;
            console.log(page)
            return new Promise((resolve, reject) => {
                findAll(page, limit, tag,keyWord, all).then(res => {
                    if (!res.list.length) {
                        commit('SET_NOMORE', true);
                        commit('SET_LOADING', false);
                        return;
                    } else {
                        setTimeout(()=>{
                            commit('SET_PAGE', page + 1)
                            commit('SET_LIST', list.concat(res.list))
                            commit('SET_LOADING', false);
                        }, 500)
                    }
                    resolve();
                }).catch(error =>{
                    reject(error);
                })
            })

        }
    },
    resetList({commit})
    {
        commit('SET_NOMORE', false);
        commit('SET_LOADING', false);
        commit('SET_PAGE', 1)
        commit('SET_LIST', [])
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

