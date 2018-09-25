<template>
<div class="content">
  <div class="list_content">
    <h1 v-model="title">{{title}}</h1>
    <el-row>
      <div>{{publish_time}}</div>
      <router-link to="/home">
        <el-button size="small" round>返回首页</el-button>
      </router-link>
      <a :href="url" target="_blank">
        <el-button type="primary" size="small" round style="margin-left:10px">原文链接</el-button>
      </a>
    </el-row>
    <div v-html="content">{{content}}</div>
  </div>
</div>
</template>

<script>
import {formatDate} from '../common/date.js';
export default {
  name: 'detail',
  created() {
    // console.log(this);
      this.$store.dispatch("getDetailList").then(res => {
        // console.log(res);
      let model = this;
      if(res.code == '1'){
          model.content = res.data.content;
          model.url = res.data.url;
          model.title = res.data.title;
          model.source = res.data.source;
          model.publish_time = formatDate(new Date(res.data.publish_time),"yyyy-MM-dd");
      }else{
        // model.page_show = false;
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          if(error.response.status == 404){
              // model.error_show = true;
          }
        } else {
          console.log('Error', error.message);
        }
      }
    }) 
  },
  data () {
    return {
        content:'',  //正文内容
        url:'',   //原文链接
        title:'',  //标题
        source:'',  //来源
        publish_time:''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @width:1100px;
  .content{
    // min-height:1100px;
    width: @width;
    margin: 0 auto;
    .list_content{
      min-height:900px;
      padding: 60px 100px;
      background-color: #FFF;
      margin-top: 30px;
      h1{
        text-align:center;
        font-weight:normal;
        font-size:32px;
        color:#000;
      }
      .el-row{
        text-align:right;
        margin: 60px 10px 60px 0;
        display:flex;
        div{
          text-align:left;         
          flex:8;
          line-height:32px;
        }
        a{
          display:inline-block;
          flex:1
        }
      }
    }
  }
</style>