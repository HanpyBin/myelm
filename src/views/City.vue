<template>
    <div class="city_container">
        <top-header :headTitle="cityName" goBack="true">
            <router-link to="/home" slot="changeCity" class="change_city">切换城市</router-link>
        </top-header>
        <form class="city_search_container" v-on:submit.prevent>
            <div>
                <input type="search" placeholder="请输入地址" class="city_input input_style" v-model="inputValue" required>
            </div>
            <div>
                <input type="submit" class="city_submit input_style" @click="searchLocationInfo">
            </div>
        </form>
        <header v-if="isHistoryTitleShow" class="searchHeader">搜索历史</header>
        <ul class="location_ul">
            <li v-for="(loc, ind) in locationList" :key="ind" @click="nextPage(ind, loc.geohash)">
                <h4 class="loc_name ellipsis">{{loc.name}}</h4>
                <p class="loc_address ellipsis">{{loc.address}}</p>
            </li>
        </ul>
        <footer v-if="isHistoryTitleShow&&locationList.length" class="footer_clearall" @click="clearAll">清空所有</footer>
    </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
import {getSingleCity, getLocal, setLocal, removeLocal} from '@/service/getData'
import { searchLocation} from '../service/getData'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            cityId: '',
            cityName: '',
            searchHistory: [],
            isHistoryTitleShow: true,
            locationList: [],
            inputValue: '',
            searchNone: false
        }
    },
    components: {
        TopHeader
    },
    mounted() {
        this.cityId = this.$route.params.cityid;
        // console.log(this.cityId);
        getSingleCity(this.cityId).then(res=>{
            this.cityName = res.data.name;
            // console.log(res.data.name);
        })
        this.getSearchHistory();
    },
    methods: {
        ...mapMutations(['SAVE_ADDRESS']),
        getSearchHistory() {
            var tempHistory = [];
            tempHistory = getLocal('locationHistory');
            if (tempHistory) {
                this.locationList = JSON.parse(tempHistory);
            } else {
                this.locationList = [];
            }
        },
        searchLocationInfo() {
            if (this.inputValue) {
                searchLocation(this.cityId, this.inputValue).then(res=>{
                    this.locationList = res.data;
                    this.isHistoryTitleShow = false;
                    this.searchNone = this.locationList.length ? false: true;
                })
            }
        },
        nextPage(index, geohash) {
            let history = getLocal('locationHistory');
            let locationChoosed = this.locationList[index];
            if (history) {
                let checkrepeat = false;
                this.searchHistory = JSON.parse(history);
                this.searchHistory.forEach(item => {
                    if (item.geohash === geohash) {
                        checkrepeat = true;
                    }
                });
                if (!checkrepeat) {
                    this.searchHistory.push(locationChoosed);
                }
            } else {
                this.searchHistory.push(locationChoosed);
            }
            setLocal('locationHistory', this.searchHistory);
            this.$router.push({path: '/index', query: {geohash}})
        },
        clearAll() {
            removeLocal('locationHistory');
            this.getSearchHistory();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.city_container{
    padding-top: 2.35rem;
}

.change_city{
    right: 0.4rem;
    @include ct;
    // position: absolute;
    @include sc(0.6rem, #fff);
}

.city_search_container{
    margin-top: 0.4rem;
    background-color: #fff;
    padding-top: 0.4rem;
    div{
        // @include center;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        .input_style{
            border-radius: 0.1rem;
            margin-bottom: 0.4rem;
            @include wh(100%, 1.4rem);
        }
        .city_input{
            border: 1px solid $bc;
            padding: 0 0.3rem;
            @include sc(0.65rem, #333);
        }
        .city_submit{
            background-color: $blue;
            @include sc(0.65rem, #fff);
        }
    }
}

.searchHeader{
    @include font(0.475rem,0.8rem);
    padding-left: 0.5rem;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
}

.location_ul{
    background-color: #fff;
    border-top: 1px solid $bc;
    li {
        padding: 0 0.4rem;
        border-bottom: 1px solid $bc;
        h4 {
            @include font(0.6rem, 1.3rem)
        }
        p {
            font-weight: 300;
            @include font(0.45rem, 0.8rem);
            color: #999;
        }
    }
}
.footer_clearall{
    background-color: #fff;
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
}
</style>