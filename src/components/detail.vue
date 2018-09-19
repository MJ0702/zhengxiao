<template>
<div class="content">
  <div class="list_content">
    <h1 v-model="title">{{title}}</h1>
    <el-row>
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
export default {
  name: 'detail',
  created() {
    console.log(this);
    // this.$store.commit('change_id', {id:id});
    this.$store.dispatch("getDetailList").then(res => {
      // console.log(res);
      let model = this;
      if(res.code == '1'){
          model.content = res.data.content;
          model.url = res.data.url;
          model.title = res.data.title;
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
        content:'',
        url:'',
        title:''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @width:1200px;
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
        margin: 30px 10px 30px 0;
        a{
          display:inline-block;
        }
      }
    }
  }
</style>