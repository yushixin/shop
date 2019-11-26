<template>
  <div>
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="card">
      <van-card v-for="(item, index) in pruductList" :key="index" :price="item.price" :desc="item.company" :title="item.name" :thumb="item.img"> 
        <div slot="footer">
          <van-button size="mini"  @click="delCart(item._id, index)">删除</van-button>
        </div>
      </van-card>

    </div> 
    <van-submit-bar class="submit-bar"  :price="totalPrice"  button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import axios from 'axios'
import url from "@/service.config.js";
import { mapState } from "vuex";


  export default {
    data(){
      return{
        pruductList: [],
        cart:{}//用来存返回的cart集合中的信息

      }
    },
    computed:{//计算属性
      ...mapState(['userInfo']),
      totalPrice(){
        return this.pruductList.reduce((sum, elem)=>{
            sum += elem.price;
            return sum;
        }, 0) * 10 * 10;
      }
   },
    created(){
      //验证是否登录
      if(JSON.stringify(this.userInfo) === '{}'){
        this.$toast.fail('请先登录');
        setTimeout(()=>{
          this.$router.push('/profile');
        },1000)
      }else{
        console.log(this.userInfo._id);
        axios({
          url:url.getCart,
          method: "get",
          params:{
            userId:this.userInfo._id
          }
        }).then(res=>{
          console.log(res);
          this.cart= res;
          for (let item of res.data) {
            this.pruductList.push(item.productId);
          }
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    methods:{
      onSubmit(){

      },
      delCart(id, index){
          // console.log(this.cart.data[index]._id);
          // 删除数据库中的数据(同学自己完成)，如果删除成功，进入回调函数，在回调函数中，如下代码
          this.pruductList.splice(index, 1);
          axios({
            url:url.deleteCart,
            method:"get",
            params:{
              _id:this.cart.data[index]._id
            }
          }).then(res=>{
            console.log(res);
          }).catch(err=>{
            console.log(err);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .submit-bar{
      margin-bottom: 1rem;
  }
</style>