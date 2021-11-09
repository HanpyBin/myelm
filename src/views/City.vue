<template>
    <div class="city_container">
        <top-header :headTitle="cityName" goBack="true">
            <router-link to="/home" slot="changeCity" class="change_city">切换城市</router-link>
        </top-header>
        <form class="city_search_container" v-on:submit.prevent>
            <div>
                <input type="search" placeholder="请输入地址" class="city_input input_style" required>
            </div>
            <div>
                <input type="submit" class="city_submit input_style">
            </div>
        </form>
    </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
import {getSingleCity} from '@/service/getData'
export default {
    data() {
        return {
            cityId: '',
            cityName: '',
            searchHistory: [],
        }
    },
    components: {
        TopHeader
    },
    mounted() {
        this.cityId = this.$route.params.cityid;
        console.log(this.cityId);
        getSingleCity(this.cityId).then(res=>{
            this.cityName = res.data.name;
            // console.log(res.data.name);
        })
        this.getSearchHistory();
    },
    methods: {
        getSearchHistory() {

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
</style>