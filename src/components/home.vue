<template>
<div class="content">
  <div class="list_content">
    <router-view></router-view>
    <li v-for="item in pageData" :key="item.id" @click="detail">
      <div class="list_left">
        <router-link to="/home/detail">
          <div :id="item.id" @click="turn($event)">{{item.title}}</div>
        </router-link>
      </div>
      <div class="list_right">
        <el-tag size="small">{{item.type}}</el-tag>
      </div>
    </li>
  </div>
  <div class="block" v-show="page_show">
    <el-pagination
      element-loading-text="拼命加载中！"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      v-loading.fullscreen.lock="fullscreenLoading"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :background="false"
      :total="listNum">
    </el-pagination>
  </div>
  <img v-if="error_show" src="../assets/404.jpg">
</div>
</template>

<script>
// import {search_list} from '../common/request_list.js'
import state from '@/store/store'
import { mapState } from 'vuex'
export default {
  name: 'home',
  created() {
    // console.log(this.listData)
    let model = this;
    // 配置当前页的路由
    this.$router.push({ path: 'home', query: { page: 1}})
    //请求分页总数据
    this.$store.commit('change_page_list', {page:1,rows:10});
    this.$store.dispatch("getPageList").then(res => {
      console.log(this);
      if(res.code == '1'){
        let total = res.data.total;
        let len = parseInt(res.data.rows);
        for(let i = 0;i<total.length;i++){
          model.listData.push(total[i]);
          model.listNum = len;
        }
        model.page_show = true;
      }else{
        model.page_show = false;
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          if(error.response.status == 404){
              model.error_show = true;
          }
        } else {
          console.log('Error', error.message);
        }
      }
    }) 
  },
  data () {
    return {
      // count: state.state.count,
      fullscreenLoading: false,
      msg: 'Welcome to Your Vue.js App',
      currentPage: 1, //当前页
      pageSize:10,     //每页设置数量
      listNum:1,      //分页总条数
      listData: [],   //分页数据
      page_show:false,  //显示页码栏
      error_show:false  //404页面
    }
  },
  methods:{
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.fullscreenLoading = true;
        this.page_show = false;
        let model = this;
        // 配置当前页的路由
        this.$router.push({ path: '/home', query: { page: val}})
        //请求当前页的数据
        this.$store.commit('change_page_list', {page:val,rows:10});
        this.$store.dispatch("getPageList").then(res => {
          if(res.code == '1'){
            let total = res.data.total;
            let len = parseInt(res.data.rows);
            for(let i = 0;i<total.length;i++){
              model.listData.push(total[i]);
              model.listNum = len;
            }
            model.fullscreenLoading = false;
            window.scrollTo(0,0);
            model.page_show = true;
          }else{
            model.page_show = false;
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              if(error.response.status == 404){
                  model.error_show = true;
              }
            } else {
              console.log('Error', error.message);
            }
          }
        })
      })
      // console.log(`当前页: ${val}`);
    },
    detail(){
      // console.log(this.$route.path);
    },
    turn(event){
      //获取当前点击的列表项id
      let id = event.currentTarget.id;
      console.log(id);
      this.$store.commit('change_id', {id:id});
    }
  },
  computed:{
    pageData(){
      let pages = Math.ceil(this.listData.length/this.pageSize);//8为每页设置数量
      // console.log(this.listData.length);
      // console.log(925);
      let newList=[];
      for (let i=0;i<pages;i++) {
        let sonList = [];
        sonList = this.listData.slice(i*this.pageSize,i*this.pageSize+this.pageSize);//8为每页设置数量
        newList.push(sonList)
      }
      return newList[this.currentPage-1 ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @width:1200px;
  .content{
    width: @width;
    margin: 50px auto;
    min-height:850px;
    .list_content{
      background-color: #FFF;
      margin-top: 30px;
      li{
        height:65px;
        border-bottom:1px solid #EBEBEB;
        margin-bottom:5px;
        // text-align:center;
        line-height:65px;
        padding: 0 30px;
        display:flex;
        .list_left{
          flex:7;
          a{
            cursor:pointer;
            color:#000;
          }
          a:hover{
            color:#FFD04B;
          }
        }
        .list_right{
          flex:3;
          text-align:right;
        }
      }
    }
    .block{
      margin-top:20px;
      .el-pagination{
        text-align:center;
        margin-top: 20px;
        background:#F5F6F7;
        .btn-prev{
          background:none;
        }
      }
    }
  }
</style>
