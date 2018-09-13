<template>
  <div class="hello">
    <div class="block">
      <li v-for="item in pageData">{{item.name}}</li>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="listNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentPage: 1, //当前页
      pageSize:5,     //每页设置数量
      listNum:1,      //分页总条数
      listData: [
        {id: 1, name: 11},
        {id: 2, name: 12},
        {id: 3, name: 13},
        {id: 4, name: 14},
        {id: 5, name: 15},
        {id: 6, name: 16},
        {id: 7, name: 17},
        {id: 8, name: 18},
        {id: 9, name: 19},
        {id: 10, name: 20},
        {id: 11, name: 21},
        {id: 12, name: 22},
        {id: 13, name: 23},
        {id: 14, name: 24},
        {id: 15, name: 25},
        {id: 16, name: 26},
        {id: 17, name: 27},
        {id: 18, name: 28},
        {id: 19, name: 29},
        {id: 20, name: 30}
      
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
      console.log(`当前页: ${val}`);
    }
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
@width:80%;
  .block{
    margin-top:20px;
    li{
      width:@width;
      height:150px;
      border:1px solid #ccc;
      margin-bottom:5px;
      text-align:center;
      line-height:150px;
      margin:10px auto;
    }
    .el-pagination{
      text-align:center;
      margin-top: 20px;
    }
  }
</style>
