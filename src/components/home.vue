<template>
<div class="content">
  <div class="list_content" :class="[page_list.isActive ? 'list_content' : 'errorClass']">
    <div id="warn" v-if="!page_list.isActive">
      <div class="warn_icon"><img src="../assets/search_no_data.png"></div>      
      <div class="warn_title">抱歉，未搜索到您输入的内容，换个内容试试吧</div>
    </div>
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
  <div class="block" v-show="page_list.page_show">
    <el-pagination
      element-loading-text="拼命加载中！"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      v-loading.fullscreen.lock="page_list.fullscreenLoading"
      @current-change="handleCurrentChange"
      :current-page.sync="page_list.currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :background="false"
      :total="page_list.listNum">
    </el-pagination>
  </div>
  <img v-if="page_list.error_show" src="../assets/404.png">
  <el-row v-if="page_list.error_show">
    <p>抱歉,您要访问的页面走丢了,请刷新试试！</p>
    <router-link to='/home'><el-button type="info" round>刷新</el-button></router-link>
  </el-row>
</div>
</template>

<script>
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
      isActive:true,
      fullscreenLoading: false,
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
        this.$store.commit('change_fullscreenLoading_params',true);
        this.$store.commit('change_page_show_params',false);
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
      // console.log(id);
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
          this.$store.commit('change_fullscreenLoading_params',false);
          this.$store.commit('change_page_show_params',true);
          window.scrollTo(0,0);
        }else{
          this.$store.commit('change_page_show_params',false);
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            if(error.response.status == 404){
              this.$store.commit('change_error_show_params',true);
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
          this.$store.commit('change_fullscreenLoading_params',false);
          this.$store.commit('change_page_show_params',true);
          window.scrollTo(0,0);
        }else{
          model.page_show = false;
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            if(error.response.status == 404){
                this.$store.commit('change_error_show_params',true);
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
  @width:1100px;
  .content{
    width: @width;
    margin: 50px auto;
    min-height:850px;
    .errorClass{
      background-color: #FFF;
      margin-top: 30px;
      padding:350px 0;
    }
    .list_content{
      background-color: #FFF;
      margin-top: 30px;
      #warn{
        display:flex;
        width:395px;
        margin:0 auto;
        .warn_icon{
          flex:1;
        }
        .warn_title{
          flex:9;
          font-size: 16px;
          line-height: 36px;
          color: #999;
        }
      }
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
    img{
      display:block;
      width:100%;
    }
    .el-row{
      text-align:center;
      p{
        color:#999;
        margin-bottom:30px;
      }
    }
  }
</style>
