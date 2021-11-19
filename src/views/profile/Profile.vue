<template>
    <div id="profile_container">
        <top-header :goBack="true" headTitle="我的"></top-header>
        <section class="main_container">
            <router-link :to="'/profile/info'">
                <section class="profile_header">
                    <img :src="avatar">
                    <div class="profile_info_container">
                        <p>{{username}}</p>
                        <p>暂无绑定手机号</p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </section>
            </router-link>
            <section class="profile_footer">
                <ul>
                    <router-link :to="'/balance'" tag="li" class="info_data">
                        <p class="footer_top">
                            <b>{{balance.toFixed(2)}}</b>元
                        </p>
                        <p class="footer_bottom">
                            我的余额
                        </p>
                    </router-link>
                    <router-link :to="'/benefit'" tag="li" class="info_data">
                        <p class="footer_top">
                            <b>{{discount}}</b>个
                        </p>
                        <p class="footer_bottom">
                            我的优惠
                        </p>
                    </router-link>
                    <router-link :to="'/points'" tag="li" class="info_data">
                        <p class="footer_header">
                            <b>{{points}}</b>分
                        </p>
                        <p class="footer_bottom">
                            我的积分
                        </p>
                    </router-link>
                </ul>
            </section>
            <section class="other_pages">
                    <router-link to="/order" class="my_pages">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                    </aside>
                    <span>我的订单</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    </router-link>
                    <a href="https://home.m.duiba.com.cn/#/chome/index" class="my_pages">
                    <aside>
                        <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                    </aside>
                    <span>积分商城</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    </a>
                    <router-link to="/vipcard" class="my_pages">
                    <aside>
                        <svg fill="#ffc636">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                    </aside>
                    <span>饿了么会员卡</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    </router-link>
                    <router-link to="/service" class="my_pages">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                        </svg>
                    </aside>
                    <span>服务中心</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    </router-link>
                    <router-link to="/download" class="my_pages">
                    <aside>
                        <svg fill="#3cabff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                        </svg>
                    </aside>
                    <span>下载饿了么APP</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    </router-link>
            </section>
        </section>
        <foot-guider></foot-guider>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TopHeader from '../../components/TopHeader.vue'
import FootGuider from '../../components/FootGuider.vue'
export default {
    data(){
        return {
            username: '登录|注册',
            imgBaseUrl: '/img/',
            avatar: '',
            balance: 0,
            discount: 0,
            points: 0
        }
    },
    computed:{
        ...mapState(['userInfo']),
    },
    components: { TopHeader, FootGuider},
    mounted() {
        this.initData();

    },
    methods:{
        initData() {
            if (this.userInfo) {
                this.username = this.userInfo.username;
                this.avatar = this.imgBaseUrl + this.userInfo.avatar;
                this.balance = this.userInfo.balance;
                this.discount = this.userInfo.gift_amount;
                this.points = this.userInfo.point;
            }
        console.log(this.userInfo);
        }
    },
    watch:{
        userInfo: function(value){
            this.initData();
        }
    }
}
</script>


<style lang="scss" scoped>
    @import "@/style/mixin";
    #profile_container{
        // top: ;
        .main_container{
            padding-top: 1.95rem;
            .profile_header{
                flex: 1;
                background-color: $blue;
                display: flex;
                // @include fj;
                align-items: center;
                @include wh(100%, 4rem);
                img{
                    margin: 0 .5rem;
                    border-radius: 50%;
                    // transform: scale(.5);
                    @include wh(2.5rem, 2.5rem);
                }
                .profile_info_container{
                    p:nth-of-type(1){
                        @include sc(0.8rem, #fff);
                        font-weight: 800;
                    }
                    p:nth-of-type(2){
                        @include sc(0.6rem, #fff);
                    }
                }
                .arrow{
                    padding-left: 7rem;
                    .arrow-svg{
                        @include wh(0.5rem, 0.5rem);
                    }
                }
            }
            .profile_footer{
                @include wh(100%, 4rem);
                background-color: #fff;
                // display: inline-block;
                ul{
                    height: 100%;
                    
                    .info_data{
                        float: left;
                        @include wh(33.3%, 100%);
                        text-align: center;
                        border-right: 0.025rem solid $bc;
                        font-size: 0.6rem;
                        p{
                            padding: 0.3rem 0;
                        }
                        b{
                            font-weight: 800;
                            @include sc(1.2rem, orange)
                        }
                    }
                    .info_data:nth-of-type(2){
                        b{
                            color: rgba(248, 113, 51, 0.904);
                        }
                    }
                    .info_data:nth-of-type(3){
                        b{
                            color:rgb(147, 224, 31)
                        }
                    }
                }
            }
            .other_pages{
                margin-top: 1rem;
                background-color: #fff;
                .my_pages{
                    display: flex;
                    align-items: center;
                    border-bottom: 0.025rem solid $bc;
                    aside{
                        @include wh(.7rem, .7rem);
                        margin-left: 0.87rem;
                        margin-right: 0.27rem;
                        display: flex;
                        align-items: center;
                        svg{
                            @include wh(100%, 100%);
                        }
                    }
                    span:nth-of-type(1){
                        display: inline-block;
                        padding: 0.3rem 0;
                        font-size: 0.8rem;
                    }
                    span:nth-of-type(2){
                        position: absolute;
                        right: 0.2rem;
                        svg{
                            @include wh(.7rem, 0.7rem);
                        }
                    }
                }
            }
        }
        .router-slid-enter-active, .router-slid-leave-active{
            transition: all .4s;
        }
        .router-slid-enter, .router-slid-leave-to{
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }

    }
</style>