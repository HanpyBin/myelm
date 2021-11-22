<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav>
            <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}" >
                <div class="header_cover_img_con">
                    <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img">
                </div>
                <section class="description_header">
                    <router-link to="/shop/shopDetail" class="description_top">
                        <section class="description_left">
                            <img :src="imgBaseUrl + shopDetailData.image_path">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                            <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟/配送费￥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                            <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </router-link>
                    <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip_icon" :style="{backgroundColor: '#'+shopDetailData.activities[0].icon_color, borderColor: '#'+shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
                            <span>{{shopDetailData.activities[0].description}}（App专享）</span>
                        </p>
                        <p>{{shopDetailData.activities.length}}个活动</p>
                        <svg class="footer_arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>
                </section>
            </header>
            <section class="change_show_type" ref="chooseType">
                <div @click="changeShowType='food'">
                    <span :class="{activity_show: changeShowType == 'food'}">商品</span>
                </div>
                <div @click="changeShowType='rating'">
                    <span :class="{activity_show: changeShowType == 'rating'}">评价</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-show="changeShowType == 'food'" class="food_container">
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li v-for="(item, index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index==menuIndex}" @click="chooseMenu(index)">
                                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index">
                                    <header class="menu_detail_header">
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{item.name}}</strong>
                                            <span class="menu_item_description">{{item.description}}</span>
                                        </section>
                                        <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                                        <p class="description_tip" v-if="index == TitleDetailIndex">
                                            <span>{{item.name}}</span>
                                            {{item.description}}
                                        </p>
                                    </header>
                                    <section v-for="(foods, foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                                        <router-link :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales:foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                                            <section class="menu_food_img">
                                                <img :src="imgBaseUrl + foods.image_path">
                                            </section>
                                            <section class="menu_food_description">
                                                <h3 class="food_description_head">
                                                    <strong class="description_foodname">{{foods.name}}</strong>
                                                    <ul v-if="foods.attributes.length" class="attributes_ul">
                                                        <li v-for="(attribute, foodindex) in isAttribute(foods.attributes)" :key="foodindex" :style="{color: '#'+attribute.icon_color, borderColor: '#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                                                            <p :style="{color:attribute.icon_name == '新'?'#fff':'#'+attribute.icon_color}">{{attribute.icon_name == '新'?'新品':attribute.icon_name}}</p>
                                                        </li>
                                                    </ul>
                                                </h3>
                                            </section>
                                        </router-link>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <section class="buy_cart_container">
                        <section @click="toggleCartList" class="cart_icon_num">
                            <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart: receiveInCart}" ref="cartContainer">
                                <span v-if="totalNum" class="cart_list_length">
                                    {{totalNum}}
                                </span>
                                <svg class="cart_icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                                </svg>
                            </div>
                            <div class="cart_num">
                                <div>￥{{totalPrice}}</div>
                                <div>配送费{{deliveryFee}}</div>
                            </div>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <loading v-show="showLoading || loadRatings"></loading>
        <section class="animation_opacity shop_back_svg_container" v-if="showLoading">
            <img src="../../images/shop_back_svg.svg">
        </section>
    </div>
</template>

<script>
import { mapMutations, mapState} from 'vuex';
import Loading from '@/components/common/Loading';
import {getLocationByGeohash, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '@/service/getData';
import BScroll from 'better-scroll'
export default {
    
    data() {
        return {
            geohash: "",
            shopId: null,
            showLoading: true,
            changeShowType: 'food',
            shopDetailData: null,
            showActivities: false,
            menuList: [],
            menuIndex: 0,
            menuIndexChange: true,
            shopListTop: [],
            TitleDetailIndex: null,
            categoryNum: [],
            totalPrice: 0,
            cartFoodList: [],
            showCartList: false,
            receiveInCart: false,
            ratingList: null,
            imgBaseUrl: '/img/',
            //
            ratingOffset: 0,
            ratingScoresData: null,
            ratingTagsList: null,
            windowHeight: null,
            loadRatings: false,
            foodScroll: null
        }
    },
    computed:{
        ...mapState(['latitude', 'longitude']),
        promotionInfo(){
            return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。';
        },
        totalNum(){
            let num = 0;
            this.cartFoodList.forEach(item=>{
                num += item.num;
            });
            return num;
        },
        deliveryFee() {
            if (this.shopDetailData) {
                return this.shopDetailData.float_delivery_fee;
            } else{
                return null;
            }
        }
    },
    components:{
        Loading
    },
    created(){
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.id;
        this.INIT_BUYCART();
    },
    mounted() {
        this.initData();
        this.windowHeight = window.innerHeight;
    },
    methods:{
        ...mapMutations(['INIT_BUYCART', 'SAVE_ADDRESS', 'RECORD_SHOPDETAIL']),
        async initData(){
            if (!this.latitude) {
                let res = (await getLocationByGeohash(this.geohash)).data;
                this.SAVE_ADDRESS(res);
            }
            this.shopDetailData = (await shopDetails(this.shopId, this.latitude, this.longitude)).data;
            this.menuList = (await foodMenu(this.shopId)).data;
            // console.log(this.menuList);
            this.ratingList = (await getRatingList(this.shopId, this.ratingOffset)).data;
            this.ratingScoresData = (await ratingScores(this.shopId)).data;
            this.ratingTagsList = (await ratingTags(this.shopId)).data;
            this.RECORD_SHOPDETAIL(this.shopDetailData);
            this.hideLoading();
        },
        isAttribute(attributes){
            return attributes.filter(attr=>{
                if (attr){
                    return attr;
                }
            })
        },
        chooseMenu(index){
            // console.log(index);
            this.menuIndex = index;
            this.menuIndexChange = false;
            // console.log(-this.shopListTop[index]);
            this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
            this.foodScroll.on('scrollEnd', () => {
                this.menuIndexChange = true;
                // console.log(111);
            })
        },
        getFoodListHeight(){
            const listContainer = this.$refs.menuFoodList;
            if (listContainer) {
                const listArr = Array.from(listContainer.children[0].children);
                // console.log(listArr);
                listArr.forEach((item, index)=>{
                    this.shopListTop[index] = item.offsetTop;
                    // console.log(this.shopListTop[index]);
                });
                this.listenScroll(listContainer);
            }    
        },
        listenScroll(element){
            this.foodScroll = new BScroll(element, {
                probeType: 3,
                deceleration: 0.001,
                bounce: false,
                swipeTime: 2000,
                click: true
            });
            const wrapperMenu = new BScroll('#wrapper_menu', {
                click: true
            });

            const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
            // console.log(wrapMenuHeight);
            this.foodScroll.on('scroll', (pos)=>{
                if (!this.$refs.wrapperMenu) {
                    return;
                }
                // console.log('111');
                // console.log(pos);
                this.shopListTop.forEach((item, index)=>{
                    if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item){
                        this.menuIndex = index;
                        const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                        const el = menuList[0];
                        wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2-50));
                    }
                })
            })
        },
        initCategoryNum(){

        },
        toggleCartList(){
            this.cartFoodList.Length ? this.showCartList = !this.showCartList : true;
        },
        hideLoading(){
            this.showLoading = false;
        },
        goback(){
            this.$router.go(-1);
        },
        temp(){
            this.foodScroll.scrollTo(0, -500, 4000);
        }
    },
    watch:{
        showLoading: function (value){
            if (!value){
                // console.log('xxx');
                this.$nextTick(()=>{
                    this.getFoodListHeight();
                    this.initCategoryNum();
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/style/mixin';
    .shop_container{
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 11;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
    }
    .shop_detail_header{
        position: relative;
        .header_cover_img_con {
            height: 100%;
            overflow: hidden;
            position: absolute;
            width: 100%;
            .header_cover_img{
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9;
                filter: blur(10px);
            }
        }
        .description_header{
            position: relative;
            z-index: 10;
            background-color: rgba(119, 103, 137, .43);
            padding: 0.4rem 0 0.4rem 0.4rem;
            width: 100%;
            overflow: hidden;
            .description_top{
                display: flex;
                .description_left{
                    margin-right: 0.3rem;
                    img{
                        @include wh(2.9rem, 2.9rem);
                        display: block;
                        border-radius: 0.15rem;
                    }
                }
                .description_right{
                    flex: 1;
                    .description_title{
                        @include sc(.8rem, #fff);
                        font-weight: bold;
                        width: 100%;
                        margin-bottom: 0.3rem;
                    }
                    .description_text{
                        @include sc(.5rem, #fff);
                        margin-bottom: 0.3rem;
                    }
                    .description_promotion{
                        @include sc(.5rem, #fff);
                        width: 11.5rem;
                    }
                }
                .description_arrow{
                    @include ct;
                    right: 0.3rem;
                    z-index: 11;
                }
            }
        }
    }
    .change_show_type{
        display: flex;
        background-color: #fff;
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
        div{
            flex: 1;
            // width: 50%;
            text-align: center;
            span{
                @include sc(.65rem, #666);
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show{
                color: #3190e8;
                border-color: #3190e8;
            }
            border-right: 0.025rem solid $bc;
        }
    }

    .food_container{
        display: flex;
        flex: 1;
        padding-bottom: 2rem;
        overflow: hidden;
    }

    .menu_container{
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
        .menu_left{
            width: 3.8rem;
            .menu_left_li{
                padding: .7rem .3rem;
                border-bottom: 0.025rem solid #ededed;
                box-sizing: border-box;
                border-left: 0.15rem solid #f8f8f8;
                position: relative;
                img{
                    @include wh(.5rem, .6rem);
                }
                span{
                    @include sc(.6rem, #666);
                }
                .category_num{
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    background-color: #ff461d;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .6rem;
                    @include sc(.5rem,#fff);
                    font-family: Helvetica Neue, Tahoma, Arial;
                }
            }
            .activity_menu{
                border-left: 0.15rem solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1){
                    font-weight: bold;
                }
            }
        }
        .menu_right{
            flex: 4;
            overflow-y: auto;
            .menu_detail_header{
                width: 100%;
                padding: .4rem;
                position: relative;
                @include fj;
                align-items: center;
                .menu_detail_header_left{
                    width: 11rem;
                    white-space: nowrap;
                    overflow: hidden;
                    .menu_item_title{
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    .menu_item_description{
                        @include sc(.5rem, #999);
                        width: 30%;
                        overflow: hidden;
                    }
                }
                .menu_detail_header_right{
                    @include wh(.5rem, 1rem);
                    display: block;
                    @include bis('../../images/icon_point.png');
                    background-size: 100% .4rem;
                    background-position: left center;
                }
                .description_tip{
                    background-color: #39373a;
                    opacity: 0.95;
                    @include sc(.5rem, #fff);
                    position: absolute;
                    top: 1.5rem;
                    z-index: 14;
                    width: 8rem;
                    right: .2rem;
                    padding: .5rem .4rem;
                    border: 1px;
                    border-radius: .2rem;
                    span{
                        color: #fff;
                        line-height: .6rem;
                        font-size: .55rem;
                    }
                }
                .description_tip::after{
                    content: '';
                    position: absolute;
                    @include wh(.4rem, .4rem);
                    background-color: #39373a;
                    top: -.5rem;
                    right: .7rem;
                    transform: rotate(-45deg) translateY(.41rem);
                }
            }
            .menu_detail_list{
                background-color: #fff;
                padding: .6rem .4rem;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    .menu_food_img{
                        margin-right: .4rem;
                        img{
                            @include wh(2rem, 2rem);
                            display: block;
                        }
                    }
                    .menu_food_description{
                        width: 100%;
                        .food_description_head{
                            @include fj;
                            margin-bottom: .2rem;
                            .description_foodname{
                                @include sc(.7rem, #333);
                            }
                            .attributes_ul{
                                display: flex;
                                li{
                                    font-size: .3rem;
                                    height: .6rem;
                                    line-height: .35rem;
                                    padding: .1rem;
                                    border: 1px solid #666;
                                    border-radius: 0.3rem;
                                    margin-right: .1rem;
                                    transform: scale(.8);
                                    p{
                                        white-space: nowrap;
                                    }
                                }
                                .attribute_new{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background-color: #4cd964;
                                    @include wh(2rem, 2rem);
                                    display: flex;
                                    align-items: flex-end;
                                    transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                    border: none;
                                    border-radius: 0;
                                    p{
                                        @include sc(.4rem, #fff);
                                        text-align: center;
                                        flex: 1;
                                        transform: scale(0.8) translate(0.1rem, -.1rem);
                                    }
                                }
                            }
                        }
                        .food_description_content{
                            @include sc(.5rem, #999);
                            line-height: .6rem;
                        }
                        .food_description_sale_rating{
                            line-height: .8rem;
                            span{
                                @include sc(.5rem, #333);
                            }
                        }
                        .food_activity{
                            line-height: .4rem;
                            span{
                                font-size: .3rem;
                                border: 1px solid currentColor;
                                border-radius: 0.3rem;
                                padding: .08rem;
                                display: inline-block;
                                transform: scale(.8);
                                margin-left: -0.35rem;

                            }
                        }
                    }
                }
                .menu_detail_footer{
                    margin-left: 2.4rem;
                    font-size: 0;
                    margin-top: .3rem;
                    @include fj;
                    .food_price{
                        span{
                            font-family: 'Helvetica Neue',Tahoma,Arial;
                        }
                        span:nth-of-type(1){
                            @include sc(.5rem, #f60);
                            margin-right: .05rem;
                        }
                        span:nth-of-type(2){
                            @include sc(.7rem, #f60);
                            font-weight: bold;
                            margin-right: .3rem;
                        }
                        span:nth-of-type(3){
                            @include sc(.5rem, #666);
                        }
                    }
                }
            }
        }
    }




    .shop_back_svg_container{
        position: fixed;
        @include wh(100%, 100%);
        img{
            @include wh(100%, 100%);
        }
    }
</style>