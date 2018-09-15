<template>
  <div id="app">
    <!-- <router-view/> -->
    <el-container>
      <el-header>
        <el-row style="width:1200px">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img class="logo" src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <div class="search_box">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-menu
                :default-active="activeTab"
                router
                class="el-menu-demo"
                mode="horizontal"
                background-color="#303848"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                  {{ item.navItem }}
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>
        <div id="footer">© 2018 zhengxiao</div>
      </el-footer>
      <div id="toTop" v-if="scroll" @click="toTop">
        <img src="./assets/toTop.png" title="回到顶部">
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    let path = this.$route.path;
    if(path == '/product/secondChild'){
      this.activeTab = '/product'
    }else{
      this.activeTab = path;
    }
    // console.log(path);
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      activeTab: '/home',
      navList:[
        {name:'/home',navItem:'首页'},
        {name:'/intro',navItem:'简介'},
        {name:'/product',navItem:'产品'},
        {name:'/about',navItem:'关于'},
      ],
      search: '',
      scroll:false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    //监听scroll事件
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if(scrollTop>400){
        this.scroll = true;
      }else{
        this.scroll = false;
      }
    },
    //返回顶部
    toTop(){
      this.$nextTick(() => {
        setTimeout(() => {
          window.scrollTo(0,0);
        }, 300);
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
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
  a{ 
    text-decoration:none;
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
      z-index:2;
      .el-row{
        width: 1200px;
        margin: 0 auto;
        .logo{
          height: 62px;
        }
        .search_box{
          margin:15px 0 13px 15%;
          width:70%;
          .el-input-group__append{
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
          }
          .el-input__inner{
            border:0;
            outline:none;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
          }
        }
        .el-menu--horizontal>.el-menu-item{
          height: 68px;
        }
      }
    }
    .el-main{
      margin-top: 60px;
      z-index:1;
      .v-enter,.v-leave-to{
        opacity: 0;
        transform: translateX(800px);
      }
      .v-enter-active,.v-leave-active{
        transition: all 0.3s ease;
      }
    }
    .el-footer{
      background-color:#303848;
      color:#fff;
      min-height:300px;
      #footer{
        width:1200px;
        margin:0 auto;
        // min-height:200px;
        padding: 50px 0;
      }
    }
    #toTop{
      position:fixed;
      bottom:100px;
      right:150px;
      z-index:3;
      img{
        cursor:pointer;
      }
      img:hover{
        opacity:0.7;
      }
    }
  }
}
</style>
