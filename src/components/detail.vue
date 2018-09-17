<template>
<div class="content">
  <div class="list_content">
  这是详情页
  </div>
</div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @width:1200px;
  .content{
    min-height:1000px;
    width: @width;
    margin: 0 auto;
    .list_content{
      background-color: #FFF;
      margin-top: 30px;
    }
  }
</style>