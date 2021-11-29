<template>
    <div class="common_page">
        <top-header headTitle="选择发票抬头" goBack="true"></top-header>
        <section class="choose_invoice">
            <span>不需要开发票</span>
            <svg @click="chooseInvoice" :class="{choosed: invoice}">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
        </section>
        <div class="determine" @click="confrimInvoice">确定</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TopHeader from "../../../components/TopHeader.vue"

export default{
    data(){
        return{
            invoice: false
        }
    },
    components:{
        TopHeader
    },
    methods:{
        ...mapMutations(['CONFIRM_INVOICE']),
        chooseInvoice(){
            this.invoice = !this.invoice;
        },
        confrimInvoice(){
            this.CONFIRM_INVOICE(this.invoice);
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.common_page{
    @include subCover($zi:204);
}
    .choose_invoice{
		@include fj;
		align-items: center;
		background-color: #fff;
		line-height: 2.5rem;
		margin-top: 0.5rem;
		padding: 0 .7rem;
		span{
			@include sc(.75rem, #333);
		}
		svg{
			@include wh(.8rem, .8rem);
            fill: #999;
		}
		.choosed{
			fill: #4cd964;
		}
    }
    .determine{
        background-color: #4cd964;
        @include sc(.7rem, #fff);
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
    }
</style>