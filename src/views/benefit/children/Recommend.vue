<template>
    <div class="common_page">
        <top-header headTitle="推荐有奖" goBack="true"></top-header>
        <section class="activity_banner">
            <img src="../../../images/activity.png">
        </section>
        <section class="invite_friend">
            <div class="invite_friend_style">
                <img src="../../../images/weixin.png" @click="share">
                <p>邀请微信好友</p>
            </div>
            <div class="invite_friend_style">
                <img src="../../../images/qq.png" @click="share">
                <p>邀请QQ好友</p>
            </div>
            <div class="invite_friend_style">
                <img src="../../../images/fenxiang.png" @click="share">
                <p>面对面邀请</p>
            </div>
        </section>
        <section class="invite_num">
            <div class="invite_num_style">
                <p>累计收益</p>
                <p><span>0</span>元</p>
            </div>
            <div class="invite_num_style invite_people">
                <p>成功邀请</p>
                <p><span>0</span>人</p>
            </div>
        </section>
        <p class="income_detail">-收益明细-</p>
        <section class="incom_tips">
            <img src="../../../images/qianbao.png">
            <p>还不赶紧去邀请好友</p>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>
</template>


<script>
import AlertTip from '../../../components/common/AlertTip.vue';
import TopHeader from '../../../components/TopHeader.vue';
export default {
  components: { TopHeader, AlertTip },
    data(){
        return{
            showAlert: false,
            alertText: null
        }
    },
    methods:{
        share(){
            this.showAlert = true;
            this.alertText = "请在饿了么APP中打开";
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.common_page{
    @include subCover;
}
.activity_banner{
    img{
        @include wh(100%, 10rem);
    }
}
.invite_friend{
    display: flex;
    padding: 1rem 0;
    background-color: #fff;
    @include sc(.5rem, #666);
    .invite_friend_style{
        flex: 1;
        text-align: center;
        img{
            @include wh(2.5rem, 2.5rem);
        }
        p{
            @include sc(.5rem, #333);
        }
    }
}

.invite_num{
    display: flex;
    margin-top: 1rem;
    @include sc(.5rem, #666);
    .invite_num_style{
        flex: 1;
        text-align: center;
        p{
            color: #666;
        }
        span{
            @include sc(.8rem, #ff5633);
            font-weight: bold;
        }
    }
    .invite_people{
        border-left: 0.025rem solid #ddd;
        span{
            @include sc(.8rem, #666);
            font-weight: bold;
        }
    }
}
.income_detail{
    text-align: center;
    margin-top: 1rem;
    @include sc(.5rem, #666);
}
.incom_tips{
    text-align: center;
    margin-top: 1rem;
    img{
        @include wh(1.3rem, 1.6rem);
    }
    p{
        @include sc(.5rem, #999);
    }
}
</style>