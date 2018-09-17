<template>
<div class="content">
  这是产品
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
  @width:1200px;
  .content{
    min-height:1000px;
    width: @width;
    margin: 0 auto;
  }
</style>