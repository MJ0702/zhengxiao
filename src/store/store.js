import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
// const baseURL = process.env.API_ROOT

export default new Vuex.Store({
    state : {  
        page_list:{
            id:localStorage.getItem("id") || null,
            page:null,    //后端需要参数
            rows:null,    //后端需要参数
            title:'',     //搜索标题
            listData:[],  //列表数据
            currentPage: 1, //当前页
            pageSize:10,     //每页设置数量
            listNum:1,      //分页总条数
            listData: [],   //分页数据
            page_show:true,  //显示页码栏
            error_show:false,  //404页面
            isActive:true,    //为搜索到内容状态判断
            fullscreenLoading:false //关闭loading
        },    
    },
    // getters : {
    //     page_list: state.page_list => state.page_list
    // },
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
        //改变listData
        change_ListData_list(state,obj){
            state.page_list.listData = obj;
        },
        //改变分页的总数
        change_page_params(state,listNum){
            state.page_list.listNum = listNum;
        }, 
        //改变分页的当前页
        change_currentPage_params(state,currentPage){
            state.page_list.currentPage = currentPage;
        },
        //改变分页无数据的样式
        change_isActive_params(state,isActive){
            state.page_list.isActive = isActive;
        },
        //改变loading加载的状态
        change_page_show_params(state,page_show){
            state.page_list.page_show = page_show;
        },
        //改变分页栏是否显示状态
        change_fullscreenLoading_params(state,fullscreenLoading){
            state.page_list.fullscreenLoading = fullscreenLoading;
        },
        //改变404显示效果
        change_error_show_params(state,error_show){
            state.page_list.error_show = error_show;
        }
    },
    actions : {  
        //获取分页数据列表
        getPageList({ commit, state, getters, rootGetters }){
            return axios.get('http://www.yame.club:8081/API/findZxiaoAll', {  //axios本身就直接可以调用promise方法
                params: {
                    page:state.page_list.page,
                    rows:state.page_list.rows
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
        //根据id查询获取详情页数据
        getDetailList({ commit, state, getters, rootGetters }){
            return axios.get('http://www.yame.club:8081/zxiao/API/zxiao', {
                params: {
                    id:state.page_list.id
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
        //搜索数据
        getSearchList({ commit, state, getters, rootGetters }){
            return axios.get('http://www.yame.club:8081/API/zxiao/QueryByTitle', {
                params: {
                    page:state.page_list.page,
                    rows:state.page_list.rows,
                    title:state.page_list.title
                }
            }).then(res => res.data)  //返回异步获得的数据
        },
    }
})