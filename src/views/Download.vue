<template>
    <div class="download_page">
        <top-header headTitle="下载" goBack="true"></top-header>
        <section class="download_container">
            <img src='../images/elmlogo.jpeg' class="logo_img">
            <p>下载饿了么APP</p>
            <div class="determine" @click="download">下载</div>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
export default {
    components: { TopHeader },
    methods:{
        download(){
            if( this.system == 'IOS'){
                this.showAlert = true;
                this.alertText = 'IOS用户请前往AppStore下载'
            }else{
                try {
                    let elemIF = document.createElement("iframe");
                    elemIF.src = 'http://cangdu.org/files/elm.apk';
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                } catch (e) {
                    alert('下载失败')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/style/mixin';
    .download_page{
        // position: absolute;
        padding-top: 1.95rem;
        .download_container{
            padding-top: 1rem;
            text-align: center;
            img{
                border-radius: 40px;
            }
            p{
                @include sc(.8rem, #999);
                margin-bottom: 1rem;
            }
            .determine{
                // padding: 0.4rem;
                // margin-left: 0.4rem;
                // margin-right: 0.4rem;
                // vertical-align: middle;
                margin-top: 2rem;
                background-color: rgb(82, 255, 47);
                line-height: 1.8rem;
                margin: 0 .7rem;
                border-radius: 20px;
                 @include sc(.7rem, #fff);
                // @include wh(100%, 2rem);
            }
        }
    }
</style>