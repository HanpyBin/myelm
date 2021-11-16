<template>
    <div class="shoplist_container">
        <ul v-if="shopListArr.length">
            <router-link tag="li" :to="{path:'shop', query: {geohash, id: item.id}}" v-for="item in shopListArr" :key="item.id" class="shop_li">
                <section>
                    <img :src="imgBaseUrl + item.image_path" class="shop_img">
                </section>
                <hgroup class="shop_right">
                    <header class="shop_detail_header">
                        <h4 :class="item.is_premium? 'premium': ''" class="shop_title ellipsis">{{item.name}}</h4>
                        <ul class="shop_detail_ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="rating_order_num">
                        <section class="rating_order_num_left">
                            <section class="rating_section">
                                <rating-star :rating='item.rating'></rating-star>
                                <span class="rating_num">{{item.rating}}</span>
                            </section>
                            <section class="order_section">
                                月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating_order_num_right">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="inTime(item.supports)">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
							¥{{item.float_minimum_order_amount}}起送
							<span class="segmentation">/</span>
							{{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance_time">
                            <span>{{item.distance}}</span>
							<span class="segmentation">/</span>
							<span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
        </ul>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import { shopList } from '../../service/getData';
import ratingStar from '@/components/common/RatingStar';
export default {
    data() {
        return {
            offset: 0,
            shopListArr: [],
            imgBaseUrl: 'http://cangdu.org:8001/img/'
        }
    },
    computed: {
        ...mapState(['longitude', 'latitude']),
    },
    props: ['restaurantCategoryId', 'geohash', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
    components: {
        ratingStar
    },
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
            this.shopListArr = [...res.data];
            // console.log(this.shopListArr);
        },
        inTime(supports){
            let inTimeStatus;
            if (supports instanceof Array && supports.length) {
                supports.forEach(item=>{
                    if (item.icon_name === '准') {
                        inTimeStatus = true;
                    }
                })
            } else {
                inTimeStatus = false;
            }
            return inTimeStatus;
        },
        async listenPropChange() {
            let res = (await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)).data;
            // console.log(res);
            this.shopListArr = [...res]
        }
    },
    watch:{
        restaurantCategoryIds: function (value) {
            this.listenPropChange();
        },
		//监听父级传来的排序方式
		sortByType: function (value){
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value){
            // console.log('successful');
			this.listenPropChange();
		}
    }
}
</script>


<style lang="scss" scoped>
    @import '@/style/mixin';
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
        // border-top: 0;//TODO:我这里多了个border-top，不知道在哪里出现的
	}
    .shop_li{
        display: flex;
        border-bottom: 0.025rem solid $bc;
        padding: 0.7rem 0.4rem;
    }
    .shop_img{
		@include wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}

    .shop_right{
        flex: auto;
        .shop_detail_header{
            @include fj;
            align-items: center;
            .shop_title{
                @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
                font-weight: 700;
                width: 8.5rem;
                // color: #333;
            }
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
            .shop_detail_ul{
                display: flex;
                transform: scale(0.8);
                margin-right: -0.3rem;
				.supports{
					@include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
            }
        }
        .rating_order_num{
            // display: flex;
            @include fj;
            .rating_order_num_left{
                // display: flex;
                @include fj(flex-start);
                font-size: 0.4rem;
                .rating_section{
                    display: flex;
                    .rating_num{
                        color: #ff6000;
                        margin: 0 0.2rem;
                        padding-top: 0.1rem;
                    }
                }
                .order_section{
                    padding-top: 0.1rem;
                }
            }
            .rating_order_num_right{
                display: flex;
                align-items: center;
                transform: scale(.7) translateY(17%);
                // justify-content: flex-end;
                margin-right: -0.52rem;
                .delivery_style{
                    font-size: 0.4rem;
                    padding: 0.04rem 0.08rem 0;
                    border-radius: 0.08rem;
                    border: 1px;
                }
                .delivery_left{
                    // margin-left: -0.2rem;
                    background-color: $blue;
                    color: #fff;
                    border: 0.025rem solid $blue;
                }
                .delivery_right{
                    background-color: #fff;
                    color: $blue;
                    border: 0.025rem solid $blue;
                }
            }
        }
        .fee_distance{
            @include fj();
            @include sc(0.5rem, #666);
            margin-top: 0.3rem;
            // margin-right: -0.6rem;
            .fee{
                transform: scale(.9) translateX(-5%);
                color: #666;
            }
            .distance_time{
                transform: scale(.9);
                margin-right: -0.3rem;
                span{
                    color: #999;
                }
                .order_time{
                    color:$blue;
                }
                .segmentation{
                    color: #ccc;
                }
            }
        }
    }
</style>