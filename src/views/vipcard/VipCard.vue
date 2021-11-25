<template>
    <div class="rating_page">
        <top-header headTitle="会员中心" goBack="true"></top-header>
        <section v-if="userInfo">
            <p class="buy_for">为账户<span>{{userInfo.username}}</span>购买会员</p>
            <section class="vip_privilege">
                <router-link to="/vipcard/vipDescription" class="header_style">
                    <span class="header_left">会员特权</span>
                    <section class="header_right">
                        <span>会员说明</span>
                        <svg fill="#ccc">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg> 
                    </section>
                </router-link>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../images/sheng.jpeg" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../images/jifen.jpeg" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
            </section>
            <section class="subscribe_vip">
                <header>开通会员</header>
                <section class="subscribe_content">
                    <section class="content_left">
                        <span>一个月</span>
                        <span>￥20</span>
                    </section>
                    <section class="content_right" @click="buyVip">
                        购买
                    </section>
                </section>
            </section>
            <router-link to="/vipcard/redeemvip" class="common_style">
                <span class="header_left">兑换会员</span>
                <section class="header_right">
                    <span>使用卡号卡密</span>
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg> 
                </section>
            </router-link>
            <router-link to="/vipcard/invoiceRecord" class="common_style">
                <span class="header_left">购买记录</span>
                <section class="header_right">
                    <span>开发票</span>  
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg> 
                </section>
            </router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TopHeader from '../../components/TopHeader.vue'
export default {
    computed:{
        ...mapState(['userInfo'])
    },
    components: { TopHeader },
    methods:{
        buyVip(){
            console.log('buy');
        }
    }    
}
</script>


<style lang="scss" scoped>
    @import '@/style/mixin';
    .rating_page{
        padding-top: 1.95rem;
    }
    .buy_for{
        @include sc(.6rem, #666);
        line-height: 2rem;
        padding-left: 0.7rem;
        span{
            font-weight: bold;
        }
    }
    .vip_privilege{
        background-color: #fff;
        .header_style{
            // display: flex;
            @include fj;
            align-items: center;
            padding: 0.4rem 0.4rem;
            // height: 1rem;
            .header_left{
                @include sc(.7rem, #333);
            }
            .header_right{
                align-items: center;
                display: flex;
                span{
                    @include sc(.6rem, #999);
                    margin-right: .2rem;
                }
                svg{
                    @include wh(.5rem, .5rem);
                }
            }
        }
        .vip_detail{
            display: flex;
            padding: 0.4rem;
            .vip_detail_left{
                padding: 0 0.4rem;
            }
            .vip_detail_right{
                h4{
                    font-size: 0.8rem;
                }
                p{
                    @include sc(0.5rem, #666);
                }
            }
        }
    }

    .subscribe_vip{
        margin-top: 0.2rem;
        background-color: #fff;
        padding: 0 0.4rem;
        // display: flex;
        // @include fj;
        header{
            border-bottom: 0.025rem solid $bc;
            font-size: 0.8rem;
            font-weight: 400;
            padding: 0.5rem 0;
        }
        .subscribe_content{
            // display: ;
            @include fj;
            align-items: center;
            padding: 0.4rem 0;
                // vertical-align: middle;
            .content_left{
                transform: translateY(-15%);
                span:nth-of-type(1){
                    font-size: 0.6rem;
                }
                span:nth-of-type(2){
                    @include sc(0.6rem, rgb(255, 81, 0));
                    font-weight: 800;
                }
            }
            .content_right{
                border: 1px solid rgb(255, 81, 0);
                border-radius: 10%;
                // font-size: 0.6rem;
                @include sc(.6rem, rgb(255, 81, 0));
                text-align: center;
                @include wh(2rem, 1rem);
                // vertical-align: middle;
            }
        }
    }
    .common_style{
        // display: flex;
        background-color: #fff;
        margin-bottom: 0.3rem;
        margin-top: .3rem;
        // vertical-align: middle;
        line-height: 2rem;
        padding: 0 0.4rem;
        @include fj;
        .header_left{
            // display: inline-block;
            font-size: .6rem;
            // vertical-align: middle;
        }
        .header_right{
            // display: inline-block;
            span{
                @include sc(.6rem, #777);
            }
            svg{
                @include wh(0.6rem, 0.6rem);
                transform: translateY(20%);
            }
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>