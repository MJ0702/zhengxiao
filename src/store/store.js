import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {  
        page_list:{
            id:localStorage.getItem("id") || null,  //这里使用JSON.parse是因为我localStorage中保存的是一个对象字符串
            page:null,
            rows:null,
            title:''
        },    
    },
    getters : {
        page_list: page_list => state.page_list
    },
    mutations : { 
        //改变分页数据列表参数
        change_page_list(state,obj){
            state.page_list.page = obj.page;
            state.page_list.rows = obj.rows;
        },
        //改变当前的列表选择id
        change_id(state,obj){
            localStorage.setItem('id',obj.id); //将传递的数据先保存到localStorage中
            state.page_list.id = obj.id;
        },
        //改变搜索参数
        change_search_list(state,obj){ 
            state.page_list.page = obj.page;
            state.page_list.rows = obj.rows;
            state.page_list.title = obj.title;
        },
    },
    actions : {  
        //获取分页数据列表
        getPageList({ commit, state, getters, rootGetters }){
            return axios.get('/zxiao/API/findZxiaoAll', {  //axios本身就直接可以调用promise方法
                params: {
                    page:state.page_list.page,
                    rows:state.page_list.rows
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
        //根据id查询获取详情页数据
        getDetailList({ commit, state, getters, rootGetters }){
            return axios.get('/zxiao/API/zxiao', {
                params: {
                    id:state.page_list.id
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
        //根据id查询获取详情页数据
        getSearchList({ commit, state, getters, rootGetters }){
            return axios.get('/zxiao/API/zxiao/QueryByTitle', {
                params: {
                    page:state.page_list.page,
                    rows:state.page_list.rows,
                    title:state.page_list.title
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
    }
})