<template>
<div class="content">
  <img src="../assets/404.jpg">
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
  @width:1280px;
  .content{
    min-height:110px;
    width: @width;
    margin: 50px auto;
    img{
      display:block;
    }
  }
</style>