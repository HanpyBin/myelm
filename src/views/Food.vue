<template>
    <div class="food_container">
        <top-header :headTitle="headTitle" goBack="true"></top-header>
        <section class="sort_container">
            <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
                <div class="sort_item_container" @click="chooseType('food')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist" v-show="category">
                    <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <div v-for="(item,ind) in category" :key="ind">
                                    <li class="category_left_li" :class="{category_active:restaurant_category_id == item.id}" @click="selectCategoryName(item.id, ind)">
                                        <section>
                                            <!-- {{item.id}} -->
                                            <img :src="getImgPath(item.image_url)" class="category_icon">
                                            <span>{{item.name}}</span>
                                        </section>
                                        <section>
                                            <span class="category_count">{{item.count}}</span>
                                                <svg v-if="ind" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
                                                    <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                                                </svg>
                                        </section>
                                    </li>
                                </div>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li v-for="(item, ind) in categoryDetail" :key="ind" class="category_right_li" @click="getCategoryIds(item.id,item.name)" :class="{category_right_chosed:restaurant_category_ids == item.id ||(!restaurant_category_ids)&&ind == 0}">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <span :class="{category_title:sortBy=='sort'}">排序</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy=='sort'" class="sort_detail_type">
                        <ul class="sort_list_container" @click="sortList($event)">
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p data="0" :class="{sort_select: sortByType == 0}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                                </svg>
                                <p data="5" :class="{sort_select: sortByType == 5}">
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p data="6" :class="{sort_select: sortByType == 6}">
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                                </svg>
                                <p data="1" :class="{sort_select: sortByType == 1}">
                                    <span>起送价最低</span>
                                    <svg v-if="sortByType == 1">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sortByType == 2}">
                                    <span>配送速度最快</span>
                                    <svg v-if="sortByType == 2">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                                </svg>
                                <p data="3" :class="{sort_select: sortByType == 3}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 3">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>                                    
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
                <div @click="chooseType('activity')" class="sort_item_container">
                    <span :class="{category_title:sortBy=='activity'}">筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy=='activity'" class="sort_detail_type filter_container">
                        <section style="width: 100%">
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li v-for="(item, ind) in Delivery" :key="ind" class="filter_li" @click="selectDilveryMode(item.id)">
                                    <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                                    </svg>
                                    <span :class="{selected_filter:delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width:100%">
                            <header class="filter_header_style">商家属性（可以多选）</header>
                            <ul class="filter_ul">
                                <li v-for="(item, ind) in Activity" :key="ind" class="filter_li" @click="selectSupportIds(ind, item.id)">
                                    <svg v-show="support_ids[ind].status" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="filter_icon" :style="{color:'#' + item.icon_color, borderColor:'#' + item.icon_color}" v-show="!support_ids[ind].status">{{item.icon_name}}</span>
                                    <span :class="{selected_filter:support_ids[ind].status}">{{item.name}}</span>
                                </li>
                            </ul>
                        </section>
                        <footer class="confirm_filter">
                            <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
                            <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">{{filterNum}}</span></div>
                        </footer>
                    </section>
                </transition>
            </div>
        </section>
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy" @click="changeSortBy"></div>
        </transition>
        <section class="shop_list_container">
            <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :sortByType='sortByType' :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :supportIds="support_ids" v-if="latitude"></shop-list>
        </section>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import TopHeader from '../components/TopHeader.vue'
import { getFoodActivity, getFoodCategory, getFoodDelivery, getLocationByGeohash } from '../service/getData';
import {getImgPath} from '@/service/mixin';
import ShopList from '../components/common/ShopList.vue';
export default {
    data() {
        return {
            headTitle: "",
            foodTitle: "",
            sortBy: "",
            category: [],
            restaurant_category_id: "",
            restaurant_category_ids: "",
            geohash: "",
            categoryDetail: null,
            Delivery: null,
            Activity: null,
            support_ids: [],
            sortByType: null,
            delivery_mode: null,
            confirmStatus: false,
            filterNum: 0
        }
    },
    components: { TopHeader, ShopList },
    computed: {
        ...mapState(['latitude', 'longitude'])
    },
    mixins: [getImgPath],
    created() {
        this.initData();
    },
    methods: {
        ...mapMutations(['SAVE_ADDRESS']),
        async initData(){
            this.headTitle = this.$route.query.title;
            this.foodTitle = this.headTitle;
            this.restaurant_category_id = this.$route.query.restaurant_category_id;
            this.geohash = this.$route.query.geohash;
            if (!this.latitude) {
                let res = await getLocationByGeohash(this.geohash);
                this.SAVE_ADDRESS(res.data);
            }
            let temp = (await getFoodCategory(this.latitude, this.longitude)).data;

            // console.log(this.category);
            temp.forEach((item, index)=>{
                if (index != temp.length - 2) {
                    this.category.push(item);
                }
                if (this.restaurant_category_id == item.id) {
                    this.categoryDetail = item.sub_categories.slice(1);
                }
            })
            // console.log(this.category.length);
            // console.log(this.categoryDetail);
            this.Delivery = (await getFoodDelivery(this.latitude, this.longitude)).data;
            this.Activity = (await getFoodActivity(this.latitude, this.longitude)).data;
            this.Activity.forEach((item, index)=>{
                this.support_ids[index] = {status: false, id: item.id}
            })
            console.log(this.Activity);
        },
        async chooseType(type){
            if (this.sortBy !== type) {
                this.sortBy = type;
                if (type == 'food') {
                    this.foodTitle = '分类';
                } else {
                    this.foodTitle = this.headTitle;
                }
            } else {
                this.sortBy = "";
                if (type == 'food') {
                    this.foodTitle = this.headTitle;
                }
            }
        },
        selectCategoryName(id, index) {
            // if (!index) {
            //     this.restaurant_category_ids = null;
            //     this.sortBy = "";
            // }
            this.restaurant_category_id = id;
            this.categoryDetail = this.category[index].sub_categories.slice(1);
        },
        getCategoryIds(id, name) {
            this.restaurant_category_ids = id;
            this.sortBy = "";
            this.foodTitle = this.headTitle = name;
        },
        sortList(event){
            let node;
            let upperName = event.target.nodeName.toUpperCase();
            // console.log(event);
            if ( upperName == "SPAN") {
                node = event.target.parentNode;
            } else if (upperName == 'SVG') {    // 修复了源码的bug，即点击svg图标时
                node = event.target.parentNode.childNodes[1];
            } else {
                node = event.target;
            }
            console.log(node);
            this.sortByType = node.getAttribute("data");
            // console.log(this.sortByType);
            this.sortBy = "";
        },
        selectDilveryMode(id) {
            if (!this.delivery_mode) {
                this.filterNum++;
                this.delivery_mode = id;
            } else if (this.delivery_mode == id) {
                this.delivery_mode = null;
                this.filterNum--;
            } else {
                this.delivery_mode = id;
            }
        },
        selectSupportIds(index, id) {
            this.filterNum = !this.support_ids[index].status? this.filterNum+1 : this.filterNum-1;
            this.support_ids.splice(index, 1, {status: !this.support_ids[index].status, id});
        },
        clearSelect() {
            this.filterNum = 0;
            this.delivery_mode = null;
            this.support_ids.map(item=>(item.status=false));
        },
        confirmSelectFun() {
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = "";
        },
        changeSortBy(){
            this.sortBy = "";
            this.foodTitle = this.headTitle;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/style/mixin";
    .food_container{
        padding-top: 3.6rem;
    }
    .sort_container{
        background-color: #fff;
        top: 1.95rem;
        position: fixed;
        right: 0;
        width: 100%;
        border-bottom: 0.025rem solid #f1f1f1;
        box-sizing: border-box;
        z-index: 13;
        display: flex;
        .sort_item{
            @include sc(0.55rem, #444);
            @include wh(33.3%, 1.6rem);
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                @include wh(100%, 100%);
                z-index: 14;
                // border-right: 0.025rem solid $bc;
                // position: absolute;
                position: relative;
                padding-top: 0.3rem;
                background-color: #fff;
                // box-sizing: border-box;
                .sort_item_border{
                    // height: 1rem;
                    border-right: 0.025rem solid $bc;
                }
            }
            .sort_icon{
                transition: all 0.3s;
            }
        }
        .choose_type{
            .sort_item_container{
                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill: $blue;
                }
            }
        }

        .showlist-enter-active, .showlist-leave-active {
            transition: all 0.3s;
            transform: translateY(0);
        }
        .showlist-enter, .showlist-leave-to{
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type{
            width: 100%;
            position: absolute;
            display: flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
            // z-index: 9;
        }
        .category_container{
            // overflow-y: auto;
            .category_left{
                background-color: #f1f1f1;;
                flex: 1;
                height: 14.4rem;
                overflow-y: auto;
                span{
                    @include sc(0.5rem, #666);
                    line-height: 1.8rem;
                }
                .category_left_li{
                    @include fj;
                    padding: 0 0.5rem;
                    .category_icon{
                        vertical-align: middle;
                        @include wh(.8rem, .8rem);
                        margin-right: 0.2rem;
                    }
                    .category_count{
                        background-color: #ccc;
                        @include sc(0.4rem, #fff);
                        border-radius: 0.8rem;
                        border: 0.025rem solid #ccc;
                        margin-right: 0.25rem;
                        padding: 0 0.1rem;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                height: 14.4rem;
                overflow-y: auto;
                padding-left: 0.5rem;
                .category_right_li{
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span{
                        color: #666;
                    }
                }
                .category_right_chosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg{
                    @include wh(0.7rem, 0.7rem);
                    margin: 0 0.3rem 0 0.8rem;
                }
                p {
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span{
                        color: #666;
                    }
                }
                .sort_select {
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .filter_container {
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style {
                @include sc(0.4rem,#333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: 0.5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid $bc;
                    border-radius: 0.125rem;
                    @include wh(4.7rem, 1.5rem);
                    margin-right: 0.25rem;
                    padding: 0 0.25rem;
                    margin-bottom: 0.25rem;
                    svg{
                        @include wh(0.8rem, 0.8rem);
                    }
                    span{
                        @include sc(0.4rem, #333);
                    }
                    .filter_icon{
                        @include wh(0.8rem, 0.8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        line-height: 0.8rem;
                        margin-right: 0.25rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: 0.25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: 0.3rem 0.2rem;
                .filter_button_style{
                    @include wh(50%, 1.8rem);
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all{
                    background-color: #fff;
                    margin-right: 0.5rem;
                    border: 0.025rem solid #fff;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span {
                        color: #fff;
                    }
                }
            }
        }
    }
    .showcover-enter-active, .showcover-leave-active{
        transition: opacity 0.3s;
    }
    .showcover-enter, .showcover-leave-to{
        opacity: 0;
    }
    .back_cover{
        position: fixed;
        @include wh(100%, 100%);
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>