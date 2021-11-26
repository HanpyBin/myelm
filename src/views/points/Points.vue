<template>
    <div class="page">
        <top-header headTitle="我的积分" goBack="true"></top-header>
        <header class="points_show">
            <section class="points_content">
                <header>
                    <span class="header_left">
                        当前积分
                    </span>
                    <router-link to="/points/detail" class="header_right">
                        <img src="../../images/description.png" height="24" width="24">
                        <span>积分说明</span>
                    </router-link>
                </header>
                <p>
                    <span>0</span>
                    <span>分</span>
                </p>
                <div class="promit_button" @click="showAlert=true">积分兑换商品</div>
            </section>
        </header>
        <section class="trade_list">
            <header>
                最近30天积分记录
            </header>
            <div class="no_log">
                <img src="../../images/no-log.png">
                <p>最近30天无积分记录</p>
                <p>快去下单赚取大量积分吧</p>
            </div>
        </section>
        <alert-tip @closeTip="showAlert=false" v-if="showAlert" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>


<script>
import AlertTip from '../../components/common/AlertTip.vue'
import TopHeader from '../../components/TopHeader.vue'
export default {
    data(){
        return {
            alertText: "快去下单赚取大量积分吧",
            showAlert: false
        }
    },
    components: { TopHeader, AlertTip },

    
}
</script>


<style lang="scss" scoped>
@import '@/style/mixin';
    .page{
        padding-top: 1.95rem;
        .points_show{
            background-color: rgb(51, 153, 238);
            padding: 0.4rem;
            .points_content{
                background-color: #fff;
                border: 1px solid $bc;
                border-radius: 5px;
                padding: 0.2rem 0.4rem;
                header{
                    padding: 0.4rem;
                    @include fj;
                    align-items: center;
                    .header_left{
                        // font-size: 0.6rem;
                        @include sc(0.6rem, #666);
                    }
                    .header_right{
                        // line-height: 1.4rem;
                        // vertical-align: bottom;
                        img{
                            padding: 0 0.2rem;
                        }
                        span{
                            @include sc(0.6rem, rgb(51,153,238));
                        }
                    }
                }
                p{
                    padding-left: 0.5rem;
                    padding-bottom: 0.5rem;
                    span:nth-of-type(1){
                        font-size: 1.6rem;
                        font-weight: 500;
                    }
                }
                .promit_button{
                    @include wh(100%, 2rem);
                    @include sc(.8rem, #fff);
                    background-color: rgb(235, 105, 105);
                    text-align: center;
                    border-radius: .15rem;
                    line-height: 2rem;
                    // margin-top: 1rem;
                }
            }
            // margin: 0.4rem;
        }
        .trade_list{
            padding: 0.4rem;
            header{
                @include sc(0.6rem, #ccc);
            }
            .no_log{
                text-align: center;
                line-height: 2rem;
                img{
                    @include wh(8rem, 5rem);
                }
                p:nth-of-type(1){
                    margin-top: .5rem;
                    @include sc(.7rem, #666);
                }
                p:nth-of-type(2){
                    // margin-top: .3rem;
                    @include sc(.5rem, #666);
                }
            }
        }

    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-to {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>