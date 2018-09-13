<template>
  <div id="app">
    <!-- <router-view/> -->
    <el-container>
      <el-header>
        <el-row style="width:1200px">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img class="logo" src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <div style="margin:15px 0 13px 15%;width:70%;">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect(key, keyPath)"
                background-color="#303848"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">花花公子</el-menu-item>
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        666
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      search: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
@margin:0;
@padding:0;
html,body{
  margin: @margin;
  padding: @padding;
  background-color: #F5F6F7;
  li{
    list-style:none;
  }  
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    .el-header{
      background-color:#303848;
      position: fixed;
      width: 100%;
      height: 68px !important;
      .el-row{
        width: 1200px;
        margin: 0 auto;
        .logo{
          height: 62px;
        }
        .el-input-group__append{
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        .el-input-group--append .el-input__inner, .el-input-group__prepend{
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        .el-menu--horizontal>.el-menu-item{
          height: 68px;
        }
      }
    }
    .el-main{
      margin-top: 60px;
    }
  }
}
</style>
