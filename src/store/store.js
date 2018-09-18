import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
const state = {  
    page_list:{
        page:null,
        rows:null
    }
}
const getters = {  
    page_list: page_list => state.page_list
}
const actions = {  
    getPageList({ commit, state, getters, rootGetters },callback){
        Vue.http.get('/zxiao/API/findZxiaoAll', {
            params: {
                page:page_list.page,
                rows:page_list.row
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
          callback(response);   
    }
}
const mutations = { 
    change_page_list(state,{page_list}){
        state.page_list = page_list
    }
  }
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
// export default new Vuex.Store({
//     // 定义列表状态
//     state: {
//         list:{
//             page:1,
//             rows:5
//         }
//     },
//     actions: {
//         // 获取列表数据
//         getPageList (context) {
//             axios({
//             method: 'get',
//             url: '/zxiao/API/findZxiaoAll',
//             data: context.state.list
//             })
//         }
//     }
// })