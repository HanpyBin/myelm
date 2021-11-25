<template>
    <div class="page_container">
        <top-header headTitle="购买记录" goBack="true"></top-header>
        <section class="invoice_contianer">
            <img src="../../../images/no-log.png">
            <p>没有购买记录</p>    
        </section>
    </div>    
</template>


<script>
import TopHeader from '../../../components/TopHeader.vue'
export default {
    components:{
        TopHeader
    }
}
</script>


<style lang="scss" scoped>
    @import '@/style/mixin';
    .page_container{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding-top: 1.95rem;
        background-color: #fff;
        z-index: 202;
    }
    .invoice_contianer{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            @include wh(8rem, 5rem);
            margin-top: 5rem;
        }
        p{
            @include sc(.6rem, #999);
            margin-top: .8rem;
        }
    }
</style>
