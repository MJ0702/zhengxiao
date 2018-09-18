import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {  
        page_list:{
            page:null,
            rows:null
        }
    },
    getters : {  
        page_list: page_list => state.page_list
    },
    mutations : { 
        //改变分页数据列表参数
        change_page_list(state,obj){
            state.page_list.page = obj.page;
            state.page_list.rows = obj.rows;
        }
    },
    actions : {  
        //获取分页数据列表
        getPageList({ commit, state, getters, rootGetters },callback){
            axios.get('/zxiao/API/findZxiaoAll', {
                params: {
                    page:state.page_list.page,
                    rows:state.page_list.rows
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            //   callback(response);   
        }
    }
})