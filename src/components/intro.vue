<template>
<div class="content">
  这是简介
</div>
</template>

<script>
export default {
  name: 'intro',
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
    min-height:1100px;
    width: @width;
    margin: 0 auto;
  }
</style>