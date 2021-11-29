<template>
    <div class="common_page">
        <top-header headTitle="添加地址" goBack="true"></top-header>
        <section class="page_text_container">
            <section class="section_list">
                <span class="section_left">联系人</span>
                <section class="section_right">
                    <input type="text" name="name" placeholder="你的名字" v-model="name" class="input_style">
                    <div class="choose_sex">
                        <span class="choose_option">
                            <svg class="address_empty_right" @click="chooseSex(1)" :class="{choosed: sex == 1}">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <span>先生</span>
                        </span>
                        <span class="choose_option">
                            <svg class="address_empty_right" @click="chooseSex(2)" :class="{choosed: sex == 2}">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <span>女士</span>
                        </span>
                    </div>
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">联系电话</span>
                <section class="section_right">
                    <div class="phone_add">
                        <input type="text" name="phone" placeholder="你的手机号" v-model="phone" class="input_style">
                        <img src="../../../../images/add_phone.png" height="20" width="20" @click="phone_bk = true">
                    </div>
                    <input v-if="phone_bk" type="text" name="anotherPhoneNumber" placeholder="备选电话" v-model="anotherPhoneNumber" class="input_style phone_bk">
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">送餐地址</span>
                <section class="section_right">
                    <router-link to="/confirmOrder/chooseAddress/addAddress/searchAddress" tag="div" class="choose_address">{{searchAddress? searchAddress.name : '小区/写字楼/学校等'}}</router-link>
                    <input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="address_detail" class="input_style">

                </section>
            </section>
            <section class="section_list">
                <span class="section_left">标签</span>
                <section class="section_right">
                    <input type="text" name="tag" placeholder="无/家/学校/公司" v-model="tag" class="input_style">
                </section>
            </section>
        </section>
        <div class="determine" @click="addAddress">确定</div>
        <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AlertTip from '../../../../components/common/AlertTip.vue'
import TopHeader from '../../../../components/TopHeader.vue'
import { postAddAddress } from '../../../../service/getData'
export default {
    data(){
        return {
            name: null,
            sex: 1,
            phone: null,
            address_detail: null,
            tag: '',
            tag_type:1,
            phone_bk: false,
            anotherPhoneNumber: '',
            showAlert: false,
            alertText: null,
            poi_type: 0
        }
    },
    computed:{
        ...mapState(['searchAddress', 'geohash', 'userInfo'])
    },
    components:{
        TopHeader,
        AlertTip
    },
    methods:{
        ...mapMutations(['CONFIRM_ADDRESS']),
        chooseSex(sex){
            this.sex = sex;
        },
        async addAddress(){
            if (!(this.userInfo && this.userInfo.user_id)) {
                this.showAlert = true;
                this.alertText = '请登录'
            }else if(!this.name){
                this.showAlert = true;
                this.alertText = '请输入姓名'
            }else if(!this.phone){
                this.showAlert = true;
                this.alertText = '请输入电话号码'
            }else if(!this.searchAddress){
                this.showAlert = true;
                this.alertText = '请选择地址'
            }else if(!this.address_detail){
                this.showAlert = true;
                this.alertText = '请输入详细地址'
            }
            if (this.tag == '家') {
                this.tag_type = 2;
            }else if(this.tag == '学校'){
                this.tag_type = 3;
            }else if(this.tag == '公司'){
                this.tag_type = 4;
            }
            let res = (await postAddAddress(this.userInfo.user_id, this.searchAddress.name, this.address_detail, this.geohash, this.name, this.phone, this.anntherPhoneNumber, 0, this.sex, this.tag, this.tag_type)).data;
            if (res.message) {
                this.showAlert = true;
                this.alertText = res.message;
            }else {
                this.CONFIRM_ADDRESS(1);
                this.$router.go(-1);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.common_page{
    @include subCover($zi:204);
}
.page_text_container{
    background-color: #fff;
    padding: 0 .7rem;
}
.section_list{
    display: flex;
    border-bottom: 0.025rem solid #f5f5f5;
    .section_left{
        @include sc(.7rem, #333);
        flex: 2;
        line-height: 2.5rem;
    }
    .section_right{
        flex: 5;
        .input_style{
            width: 100%;
            height: 2.5rem;
            @include sc(.7rem, #999);
        }
        .phone_bk{
            border-top: 0.025rem solid #f5f5f5;
        }
        .phone_add{
            @include fj;
            align-items: center;
        }
        .choose_sex{
            display: flex;
            line-height: 2.5rem;
            border-top: 0.025rem solid #f5f5f5;
            .choose_option{
                @include sc(.7rem, #333);
                display: flex;
                align-items: center;
                margin-right: .8rem;
                svg{
                    margin-right: .3rem;
                    @include wh(.8rem, .8rem);
                    fill: #ccc;
                }
                .choosed{
                    fill: #4cd964;
                }
            }
        }
        .choose_address{
            @include sc(.7rem, #999);
            line-height: 2.5rem;
            border-bottom: 0.025rem solid #f5f5f5;
        }
    }
}
.determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: .6rem;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-to {
    transform: translateX(2rem);
    opacity: 0;
}
</style>