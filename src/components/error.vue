<template>
<div class="content">
  <img src="../assets/404.png">
  <el-row>
    <p>抱歉,您要访问的页面走丢了,请刷新试试！</p>
    <router-link to='/home'><el-button type="info" round>刷新</el-button></router-link>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @width:1100px;
  .content{
    min-height:850px;
    width: @width;
    margin: 50px auto;
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