import Vue from 'vue'
import Vuex from 'vuex'
import {post,fetch,patch,put} from '@/config/http'
Vue.use(Vuex)

const state = {
    count: 321
}

const mutations = {
    add(state) {
        state.count++
    },
    queryAuthorityByUserRank(){
        return new Promise((resolve, reject) => {
            fetch('/djy-szbureau/szbureau/partyBranchTree/queryAuthorityByUserRank', {}, {
                headers: {
                    'X-Auth0-Token': '104f0b4205c20b14e04b3b80161a7659',
                }
            }).then(res => {
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
}

export default new Vuex.Store({
    state,
    mutations
})
