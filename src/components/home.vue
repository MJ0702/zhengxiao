<template>
<div class="content">
  <div class="list_content">
    <router-view></router-view>
    <li v-for="item in page_list.listData" :key="item.id">
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
      :current-page.sync="page_list.currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :background="false"
      :total="page_list.listNum">
    </el-pagination>
  </div>
  <img v-if="error_show" src="../assets/404.jpg">
</div>
</template>

<script>
import state from '@/store/store'
import { mapState } from 'vuex'
export default {
  name: 'home',
  created() {
    this.$nextTick(() => {
      let model = this;
      // 配置当前页的路由
      this.$router.push({ path: 'home', query: { page: 1}})
      //请求分页总数据
      this.$store.commit('change_page_list', {page:1,rows:10});
      this.chage_page();
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
      error_show:false,  //404页面
    }
  },
  methods:{
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.fullscreenLoading = true;
        this.page_show = false;
        let title = this.page_list.title;
        if(title == ''){
          // 配置当前页的路由
          this.$router.push({ path: '/home', query: { page: val}});
          this.$store.commit('change_currentPage_params', val);
          this.$store.commit('change_page_list', {page:val,rows:10});
          // console.log(this);
          this.chage_page();
        }else{
          this.$router.push({ path: '/home', query: { title:title,page:val}});
          this.$store.commit('change_currentPage_params', val);
          this.$store.commit('change_search_list', {page:val,rows:10,title:title});
          this.search_chage_page();
        }
      })
      // console.log(`当前页: ${val}`);
    },
    turn(event){
      //获取当前点击的列表项id
      let id = event.currentTarget.id;
      console.log(id);
      this.$store.commit('change_id', {id:id});
    },
    //分页跳转
    chage_page(){
      let model = this;
      let arr = [];
      this.$store.dispatch("getPageList").then(res => {
        if(res.code == '1'){
          let total = res.data.total;
          let len = parseInt(res.data.rows);
          for(let i = 0;i<total.length;i++){
            arr.push(total[i]);   
          }
          model.listNum = len;
          this.$store.commit('change_page_params', len);
          this.$store.commit('change_ListData_list', arr);
          model.listData = this.page_list.listData;
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
    },
    //含搜索条件分页跳转
    search_chage_page(){
      this.$store.dispatch("getSearchList").then(res => {
      let model = this;
      var arr = [];
        if(res.code == '1'){
          let total = res.data.total;
          let len = parseInt(res.data.rows);
          for(let i = 0;i<total.length;i++){
            arr.push(total[i]);
          }
          model.listNum = len;
          this.$store.commit('change_page_params', len);
          this.$store.commit('change_ListData_list', arr);
          model.listData = this.page_list.listData;
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
    },
  },
  computed:{
    ...mapState([
      'page_list'
    ])
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
