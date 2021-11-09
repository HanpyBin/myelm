<template>
    <div>
        <top-header signin="home">
            <span slot="home" class="head_logo" @click="reload">虚假的饱了么</span>
        </top-header>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>
        <section class="hot_cities">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="li" v-for="data in hotCities" :to="'/city/'+data.id" :key="data.id">
                    {{data.name}}
                </router-link>
            </ul>
        </section>
        <section class="all_cities">
            <ul class="city_letter">
                <li v-for="(value, key, index) in sortedAllCities" :key="key" class="letter_classify_li">
                    <h4 class="city_title">
                        {{key}}
                        <span v-if="index===0">（按字母排序）</span>
                    </h4>
                    <ul class="all_city_name_container citylistul clear">
                        <router-link tag="li" v-for="city in value" :to="'/city/'+city.id" :key="city.id">
                            {{city.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import {cityGuess, hotcity, allcity} from '../service/getData'

export default {
    data() {
        return {
            guessCity: '',
            guessCityid: '',
            hotCities: [],
            allCities: {}
        }
    },
    components: {
        TopHeader
    },
    methods: {
        reload() {
            window.location.reload();
        }
    },
    mounted() {
        cityGuess().then(res=>{
            this.guessCity = res.data.name;
            this.guessCityid = res.data.id;
            // console.log(this.cityGuess);
        })

        hotcity().then(res=>{
            this.hotCities = res.data;
            // console.log(this.hotCities);
        })

        allcity().then(res=>{
            this.allCities = res.data;
            // console.log(this.allCities);
        })
    },
    computed: {
        sortedAllCities() {
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.allCities[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.allCities[String.fromCharCode(i)];
                }
            }
            return sortobj;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/mixin';
    .head_logo {
        left: 0.4rem;
        font-weight: 400;   // 400 == normal
        @include sc(0.65rem,#fff);
        @include wh(5rem, 0.7rem);
        @include ct;
    }
    .city_nav{
        background-color: #fff;
        padding-top: 2.35rem;
        border-top: 1px solid $bc;
        margin-bottom: 0.4rem;
        .city_tip{
            @include fj;
            line-height: 1.45rem;
            padding: 0 0.45rem;
            span:nth-of-type(1) {
                @include sc(0.55rem, #666)
            }
            span:nth-of-type(2) {
                @include sc(0.475rem, #9f9f9f);
                font-weight: 900
            }
        }

        .guess_city{
            @include fj;
            align-items: center;
            height: 1.8rem;
            border-top: 1px solid $bc;
            border-bottom: 2px solid $bc;
            padding: 0 0.45rem;
            @include font(0.75rem, 1.8rem);

            span:nth-of-type(1) {
                color: $blue;
            }

            .arrow_right {
                @include wh(0.6rem, 0.6rem);
                fill: #999;
            }
        }
    }
    .hot_cities{
        background-color: #fff;
        margin-bottom: 0.4rem
    }

    .city_title{
        @include font(0.55rem, 1.45rem);
        text-indent: 0.4rem;
        font-weight: 400;
        border-bottom: 1px solid $bc;
        border-top: 2px solid $bc;
    }
    .citylistul {
        li{
            float: left;
            text-align: center;
            color: $blue;
            border-right: 0.025rem solid $bc;
            border-bottom: 0.025rem solid $bc;
            @include wh(25%, 1.75rem);
            @include font(0.6rem,1.75rem);
        }
        li:nth-of-type(4n) {
            border-right: none;
        }
    }

    .letter_classify_li {
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 1px solid $bc;
        .all_city_name_container{
            li{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #666;
            }
        }
    }
</style>