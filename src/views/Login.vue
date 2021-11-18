<template>
    <div class="login_container">
        <top-header :head-title="'密码登录'" goBack="true"></top-header>
        <form class="login_form">
            <section class="input_container account">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input_container password">
                <input v-if="!showPwd" type="password" placeholder="密码" v-model="userPassword">
                <input v-else type="text" placeholder="密码" v-model="userPassword">
                <div class="switch_button" :class="{showPassword:showPwd}" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{go_right:showPwd}" ></div>
                </div>
            </section>
            <section class="input_container verification">
                <input type="text"  placeholder="验证码" maxlength="4" v-model="verificationCode">
                <div class="verification_container">
                    <img v-show="verificationCodeUrl" :src="verificationCodeUrl">
                    <div class="changeCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="tips">未注册过的用户将会直接登录</p>
        <p class="tips">注册过的用户可凭账户密码登录</p>
        <div class="submit_button" @click="confirmLogin">登录</div>
        <router-link to="/forget" class="forget_pwd">重置密码</router-link>
        <alert-tip v-show="showTip" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader.vue"
import {getcaptchas, accountLogin} from '@/service/getData'
import AlertTip from '../components/common/AlertTip.vue'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            showPwd: false,
            userAccount: null,
            userPassword: null,
            verificationCode: null,
            verificationCodeUrl: null,
            showTip: false,
            alertText: '',
            userInfo: null
        }
    },
    components: { TopHeader, AlertTip},
    created() {
        this.getVerificationCode();
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        async getVerificationCode(){
            let res = (await getcaptchas()).data;
            this.verificationCodeUrl = res.code;
            // console.log(this.verificationCodeUrl);
        },
        async confirmLogin() {
            if (!this.userAccount){
                this.showTip = true;
                this.alertText = "请输入用户名";
                return;
            } else if (!this.userPassword) {
                this.showTip = true;
                this.alertText = "请输入密码";
                return;
            } else if (!this.verificationCode) {
                this.showTip = true;
                this.alertText = "请输入验证码";
                return;
            }
            this.userInfo = (await accountLogin(this.userAccount, this.userPassword, this.verificationCode)).data;
            if (!this.userInfo.user_id) {
                this.showTip = true;
                this.alertText = this.userInfo.message;
                this.getVerificationCode();
            } else {
                this.RECORD_USERINFO(this.userInfo)
                this.$router.go(-1);
            }
        },
        closeTip() {
            this.showTip = false;
        }
    }
    
}
</script>

<style lang="scss" scoped>
    @import '@/style/mixin';
    .login_container{
        padding-top: 2rem;
        // width: 100%;
        .login_form{
            background-color: #fff;
            .input_container{
                padding: 0.2rem 0.8rem;
                border-bottom: 0.025rem solid $bc;
                // vertical-align: middle;
                @include wh(100%, 1.8rem);
                @include fj;
                align-items: center;
                input{
                    @include sc(0.6rem, #666);
                }
                input[type="password"]::-ms-reveal{
                    display: none
                }
            }
            .password{
                .switch_button{
                    background-color: #ccc;
                    @include wh(1.5rem, 0.8rem);
                    border: 0.025rem solid #ccc;
                    border-radius: 0.4rem;
                    display: flex;
                    align-items: center;
                    .switch_circle{
                        background-color: #f1f1f1;
                        border: 0.025rem solid #f1f1f1;
                        border-radius: 0.6rem;
                        @include wh(1.2rem, 1.2rem);
                        transform: translateX(-33.3%);
                        // transition: all 0.3s;
                    }
                }
                .showPassword{
                    background-color: #4cd964;
                    .go_right{
                        transform: translateX(0.6rem);
                        transition: all 0.3s;
                    }
                }
            }
            .verification{
                .verification_container{
                    display: flex;
                    @include wh(5rem, 1.4rem);
                    .changeCode{
                        width: 2rem;
                        p:nth-of-type(1){
                            @include sc(0.55rem, #666);
                        }
                        p:nth-of-type(2){
                            @include sc(0.55rem, $blue);
                        }
                    }
                }
            }
        }
        .tips{
            @include sc(0.5rem, red);
            margin-left: 0.4rem;
            margin-bottom: 0.2rem;
        }
        .submit_button{
            // padding: 0 0.2rem;
            margin: 0 0.5rem;
            background-color: #4cd964;
            border: 0.025rem solid $bc;
            border-radius: 0.2rem;
            text-align: center;
            line-height: 1.8rem;
            height: 1.8rem;
            @include sc(0.7rem, #fff);
        }
        .forget_pwd{
            position: absolute;
            padding-right: 0.4rem;
            right: 0;
            @include sc(0.6rem, #3b95E9);
        }
    }
</style>