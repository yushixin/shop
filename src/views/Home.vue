<template>
  <div class="container">

    <van-nav-bar title="首页" class="nav-title">
      <van-icon name="search" slot="left"></van-icon>
      <van-icon @click="$router.push('/profile')" slot="right">{{userInfo.userName}}</van-icon>
    </van-nav-bar>
    <!--轮播图-->
    <div class="carousel">
      <van-swipe :autoplay="3000">
        <van-swipe-item  class="carousel-item" v-for="(item,index) in carouselItem" :key="index" >
          <img v-lazy="item.imgSrc" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--热门商品-->
    <div class='hot'>
      <p class="hot-title">热门商品</p>
      <swiper  class="hot-swiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) in hotProducts" :key="index">
          <div class="hot-swiper-content">
            <img :src="item.img" alt="">
            <div>{{item.name}}</div>
            <div>{{item.price}}</div>
          </div>
        </swiper-slide>
      </swiper >
    </div>
    <!--推荐商品-->
    <div class="variety">
      <p class="variety-title">推荐商品</p>
      <ul>
        <li class="variety-item" v-for="(item,index) in varietyItem" :key="index">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
          <p>{{item.price}}</p>
        </li>
      </ul>
    </div>
    <!--用来占位-->
    <div style="margin-bottom: 1rem;"></div>

  </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from "axios";
import url from "@/service.config.js";
import { mapState } from "vuex";

export default {
  data(){
    return {
      carouselItem: [
        {
          name: 'img1' ,
          imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551522780305&di=4aa2c6d6b640f03e1339ba26c2cfbb8f&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F79f0f736afc37931e35db118e5c4b74543a911cd.jpg'
        },
        {
          name: 'img2' ,
          imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551522780305&di=e6ac09b4581740b5ae4553bf7ed9149a&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa1ec08fa513d269778473e6c5bfbb2fb4316d86e.jpg'
        }
      ],
      hotProducts:[
        {
          name:"沙雕一号",
          img:
            "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4482be3a8994a4c21523e12b3ef41bac/a8773912b31bb0516a13ec1d387adab44aede0d4.jpg"
          ,
          price: "3260",
          company:" 沙雕一号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕2号",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551524458730&di=06057b2d9893ee50ef22bc98b2b45c5e&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff3d3572c11dfa9ec38b70a226cd0f703918fc16e.jpg"
          ,
          price: "3260",
          company:" 沙雕2号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕一号",
          img:
            "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4482be3a8994a4c21523e12b3ef41bac/a8773912b31bb0516a13ec1d387adab44aede0d4.jpg"
          ,
          price: "3260",
          company:" 沙雕一号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕2号",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551524458730&di=06057b2d9893ee50ef22bc98b2b45c5e&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff3d3572c11dfa9ec38b70a226cd0f703918fc16e.jpg"
          ,
          price: "3260",
          company:" 沙雕2号的公司",
          city: "沙雕城"
        },{
          name:"沙雕一号",
          img:
            "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4482be3a8994a4c21523e12b3ef41bac/a8773912b31bb0516a13ec1d387adab44aede0d4.jpg"
          ,
          price: "3260",
          company:" 沙雕一号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕2号",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551524458730&di=06057b2d9893ee50ef22bc98b2b45c5e&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff3d3572c11dfa9ec38b70a226cd0f703918fc16e.jpg"
          ,
          price: "3260",
          company:" 沙雕2号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕一号",
          img:
            "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4482be3a8994a4c21523e12b3ef41bac/a8773912b31bb0516a13ec1d387adab44aede0d4.jpg"
          ,
          price: "3260",
          company:" 沙雕一号的公司",
          city: "沙雕城"
        },
        {
          name:"沙雕2号",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551524458730&di=06057b2d9893ee50ef22bc98b2b45c5e&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff3d3572c11dfa9ec38b70a226cd0f703918fc16e.jpg"
          ,
          price: "3260",
          company:" 沙雕2号的公司",
          city: "沙雕城"
        }

      ],
      swiperOption:{
        slidesPerView:3
      },
      varietyItem:[//推荐商品
        
      ]
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  created(){
    // axios.get('https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/top250').then(res=>{
    //     console.log(res);
    // }); 

    let url1 = url.getVarietyItem;
    axios.get(url1).then(res=>{
      this.varietyItem = res.data;
    })
  },
  computed:{
    ...mapState(['userInfo'])
  }

}
</script>

<style lang="scss">
  .container{
    background:  #eee;
  }
  .nav-title{
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999!important;//important提升优先级 而且提升后一定是最高的
  }
  .carousel{
    height: 3rem;
    margin-top: 1rem;
    &-item{
      img{
        width: 100%;
        height: 3rem;
      }
    }
  }
  .hot{
    margin-top: 0.2rem;
    background: #ffffff;
    &-title{
      width: 100%;
      height: 0.5rem;
      padding-left: 0.2rem;
      line-height: 0.5rem;
      box-sizing: border-box;//设置成怪异盒模型
    }
    &-swiper{
      &-content{
        width: 2rem;
        text-align: center;
        img{
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
  .variety{
    margin-top: 0.2rem;
    background: #fff;
    text-align: center;
    
    &-title{
      width: 100%;
      height: 0.5rem;
      padding-left: 0.2rem;
      line-height: 0.5rem;
      box-sizing: border-box;//设置成怪异盒模型
    }
    ul{
      display: flex;
      flex-wrap: wrap;//弹性盒模型换行
      justify-content: space-around;//弹性盒模型水平对齐
    }
    &-item{
      flex-basis: 45%;
    }
    img{
      width: 2rem;
      height: 2rem;
    }

  }


</style>