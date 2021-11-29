<template>
    <div class="common_page">
        <top-header headTitle="搜索" goBack="true"></top-header>
        <form class="search_form">
            <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="searchValue">
            <button @click.prevent="searchPlace()">搜索</button>
        </form>
        <ul class="address_list" v-if="searchData">
            <li v-for="(item, index) in searchData" :key="index" @click="chooseAddress(item)">
                <h4>{{item.name}}</h4>
                <p>{{item.address}}</p>
            </li>
        </ul>
        <div v-else class="empty_tips">
            <p>找不到地址？</p>
            <p>尝试输入小区、写字楼或学校名</p>
            <p>详细地址（如门牌号等）可稍后输入哦</p>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TopHeader from '../../../../../components/TopHeader.vue'
import { searchNearby } from '../../../../../service/getData'
export default {
    data(){
        return {
            searchValue: null,
            searchData: null
        }
    },
    components:{
        TopHeader
    },
    methods:{
        ...mapMutations(['CHOOSE_SEARCH_ADDRESS']),
        async searchPlace(){
            this.searchData = (await searchNearby(this.searchValue)).data;
        },
        chooseAddress(item){
            this.CHOOSE_SEARCH_ADDRESS(item);
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.common_page{
    @include subCover($zi:204);
    overflow-y: auto;
}
.search_form{
    display: flex;
    padding: .7rem;
    input{
        @include sc(.65rem, #999);
        flex: 4;
        background-color: #f1f1f1;
        margin-right: .6rem;
        height: 1.5rem;
        border-radius: 0.15rem;
        padding: 0 0.4rem;
    }
    button{
        flex: 1;
        @include sc(.65rem, #fff);
        background-color: $blue;
        border-radius: .15rem;
    }
}
.address_list{
    padding: .7rem;
    li{
        padding: .7rem 0;
        border-bottom: 0.025rem solid #f5f5f5;
        line-height: 1rem;
        h4{
            @include sc(.75rem, #555);
        }
        p{
            @include sc(.65rem, #999);
        }
    }
}
.empty_tips{
    @include center;
    width: 100%;
    p{
        @include sc(.5rem, #aaa);
        line-height: .7rem;
        text-align: center;

    }
}
</style>