<template>
<div class="content">
  <div class="list_content">
    <li v-for="item in pageData" :key="item.id">
    <div class="list_left">
    <a href="http://localhost:8080/#/">{{item.name}}</a>
    </div>
    <div class="list_right">
      <el-tag size="small">标签一</el-tag>
      <el-tag type="success" size="small">标签二</el-tag>
      <el-tag type="info" size="small">标签三</el-tag>
      <el-tag type="warning" size="small">标签四</el-tag>
      <el-tag type="danger" size="small">标签五</el-tag>
    </div>
    </li>
  </div>
  <div class="block">
    <el-pagination
      element-loading-text="拼命加载中！"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      v-loading.fullscreen.lock="fullscreenLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :background="false"
      :total="listNum">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      fullscreenLoading: false,
      msg: 'Welcome to Your Vue.js App',
      currentPage: 1, //当前页
      pageSize:15,     //每页设置数量
      listNum:1,      //分页总条数
      listData: [
        {id: 1, name: '当你打算怎算好'},
        {id: 2, name: '当我打算怎算好'},
        {id: 3, name: '是谁定了即定元素'},
        {id: 4, name: '是谁定设计地图'},
        {id: 5, name: '此际的我感觉到'},
        {id: 6, name: '一切因你决定乐与怒'},
        {id: 7, name: '若然没有快乐情操'},
        {id: 8, name: '淡然让我继续投诉'},
        {id: 9, name: '看似你看似你不理会投诉'},
        {id: 10, name: '快要我快要快封了路'},
        {id: 11, name: '纵得不得到'},
        {id: 12, name: '我默然哀悼 要为谁改造'},
        {id: 13, name: '都愿顾及形象最好'},
        {id: 14, name: '我默然哀悼 要为谁改造'},
        {id: 15, name: '纵得不得到'},
        {id: 16, name: '都顾及形象'},
        {id: 17, name: '说话时候说知道'},
        {id: 18, name: '此际的我感觉到'},
        {id: 19, name: '一切因你决定乐与怒'},
        {id: 20, name: '若然没有快乐情操'},
        {id: 21, name: '淡然让我继续投诉'},
        {id: 22, name: '看似你看似你不理会投诉'},
        {id: 23, name: '快要我快要快封了路'},
        {id: 24, name: '我默然哀悼 要为谁改造'},
        {id: 25, name: '纵得不得到'},
        {id: 26, name: '我默然哀悼 要为谁改造'},
        {id: 27, name: '说话时候说知道'},
        {id: 28, name: '因你改变可算好'},
        {id: 29, name: '改变不了怎算好'},
        {id: 30, name: '纵得不得到'},
        {id: 31, name: '说话时候说知道'},
        {id: 32, name: '我默然哀悼 要为谁改造'},
        {id: 33, name: '说话时候说知道'},
        {id: 34, name: '都愿顾及形象最好'},
        {id: 35, name: '改变不了怎算好'},
        {id: 36, name: '我默然哀悼 要为谁改造'},
        {id: 37, name: '看似你看似你不理会投诉'},
        {id: 38, name: '快要我快要快封了路'},
        {id: 39, name: '因你改变可算好'},
        {id: 40, name: '改变不了怎算好'} 
      ]
    }
  },
  mounted () {
    this.listNum=this.listData.length;
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          window.scrollTo(0,0);
        }, 2000);
      })
      console.log(`当前页: ${val}`);
    },
  },
  computed:{
    pageData(){
      let pages = Math.ceil(this.listData.length/this.pageSize);//8为每页设置数量
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
    margin: 0 auto;
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
