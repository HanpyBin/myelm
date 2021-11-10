<template>
    <div>
        <top-header signin="index">
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </router-link>
            <router-link :to="'/home'" class="index_location" slot="index">
                <span class="location_text ellipsis">{{currentLocation}}</span>
            </router-link>
        </top-header>
        <nav class="index_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, ind) in foodTypes" :key="ind">
                        <router-link class="food_category_link" :to="{path: '/food', query:{geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id">
                            <figure>
                                <img :src="imgBaseUrl + foodItem.image_url">
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
    </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import {getLocationByGeohash} from '@/service/getData'
import { cityGuess, getFoodTypes } from '../service/getData'
import { mapMutations } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
    data() {
        return {
            currentLocation: '',
            geohash: '',
            foodTypes: [],
            imgBaseUrl: 'https://fuss10.elemecdn.com'
        }
    },
    components: {
        TopHeader
    },
    async beforeMount() {
        if (!this.$route.query.geohash) {
            //如果没有提供geohash的查询参数，则获取城市的
            const address = await cityGuess();
            this.geohash = address.data.latitude + ',' + address.data.longitude;
        } else {
            this.geohash = this.$route.query.geohash;
        }
        // console.log(this.geohash);
        // this.SAVE_GEOHASH(this.geohash);
        // 获取当前位置信息
        let res = await getLocationByGeohash(this.geohash);
        this.currentLocation = res.data.name;
        this.SAVE_GEOHASH(res.data.latitude, res.data.longitude);
        this.SAVE_LOCATION(res.data);
        // console.log(this.currentLocation);
    },
    mounted() {
        getFoodTypes(this.geohash).then(res=>{
            let result = res.data;
            let resLength = result.length;
            let foodArr = [];
            for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                foodArr[j] = result.splice(0, 8);
            }
            this.foodTypes = foodArr;
        }).then(()=>{
            this.$nextTick(()=>{
                new Swiper('.swiper-container', {
                    pagination:{
                        el: '.swiper-pagination',
                    },
                    loop: true,
                });
            })
        })
    },
    methods: {
        ...mapMutations(['SAVE_GEOHASH', 'SAVE_LOCATION']),
        getCategoryId(url){
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
            if (/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id
            } else{
                return ''
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/style/mixin';
    .link_search{
        left: 0.8rem;
        @include ct;
        @include wh(.9rem, .9rem);
    }

    .index_location {
        @include center;
        width: 50%;
        text-align: center;
        margin-left: -0.5rem;
        .location_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
    }

    .index_nav{
        padding-top: 2.1rem;
        background-color: #fff;
        border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
        .swiper-container {
            @include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
                // display: block;
				bottom: 0.2rem;
                // height: 60%;
			}
        }
    }
    .food_types_container {
        display: flex;
        flex-wrap: wrap;
        .food_category_link {
            width: 25%;
            padding: 0.3rem 0;
            @include fj(center);
            figure{
                img {
                    margin-bottom: 0.3rem;
                    @include wh(1.8rem, 1.8rem);
                }
            }
            figcaption {
                text-align: center;
                @include sc(0.55rem, #666);
            }
        }
    }
</style>