<template>
    <div class="common_page">
        <top-header headTitle="兑换红包" goBack="true"></top-header>
        <form class="exchange_code">
            <input type="text" placeholder="请输入兑换码" v-model="exchangeCode" class="exchange_input">
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="determine" @click="exchange" :class="{active:status}">兑换</div>
        <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AlertTip from '../../../components/common/AlertTip.vue'
import TopHeader from '../../../components/TopHeader.vue'
import { getcaptchas, exchangeRedpocket } from '../../../service/getData'
export default {
    data(){
        return{
            showAlert: false,
            alertText: null,
            exchangeCode: null,
            codeNumber: '',
            captchaCodeImg: null
        }
    },
    computed:{
        ...mapState['userInfo'],
        status(){
            let status = (/^\d+$/gi.test(this.exchangeCode)) && (/^\w{4}$/gi.test(this.codeNumber));
            return status;
        }
    },
    components:{
        TopHeader,
        AlertTip
    },
    mounted(){
        this.getCaptchaCode();
    },
    methods:{
        async getCaptchaCode(){
            let res = (await getcaptchas()).data;
            this.captchaCodeImg = res.code;
        },
        async exchange(){
            if (this.status) {
                let res = (await exchangeRedpocket(this.userInfo.user_id, this.exchangeCode, this.codeNumber)).data;
                if (res.message) {
                    this.getCaptchaCode();
                    this.showAlert = true;
                    this.alertText = res.message;
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/style/mixin';
.common_page{
    @include subCover;
    background-color: #f1f1f1;
    .exchange_code{
        margin-top: .7rem;
        padding: 0 0.5rem;
        .exchange_input{
            width: 100%;
            @include sc(.7rem, #666);
            padding: .6rem .4rem;
            border-radius: 0.15rem;
        }
    }
    .captcha_code_container{
        height: 2.2rem;;
        display: flex;
        margin-top: .7rem;
        input{
            @include sc(.7rem, #666);
            padding: .4rem;
            border-radius: .15rem;
            flex: 3;
        }
        .img_change_img{
            display: flex;
            align-items: center;
            flex: 2;
            margin-left: .3rem;
            background-color: #fff;
            padding-left: .2rem;
            border-radius: .15rem;
            img{
                @include wh(3.5rem, 1.5rem);
            }
            .change_img{
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
    .determine{
        // @include wh(100%, 2rem);
        line-height: 1.8rem;
        text-align: center;
        background-color: #ccc;
        @include sc(.7rem, #fff);
        margin: 0 .7rem;
        margin-top: .7rem;
        border-radius: .15rem;
    }
}
</style>