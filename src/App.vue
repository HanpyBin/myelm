<template>
<div>
    <transition name="router-fade" mode="out-in">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </transition>
    <transition name="router-fade">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
</div>
</template>

<script>
import svgIcon from './components/common/svg';
export default {
	components:{
        svgIcon
    },
}
</script>

<style lang="scss">
    @import './style/common.scss';
    .route-fade-enter-active, .route-fade-leave-active{
        transition: opacity 0.3s;
    }
    .route-fade-enter, .route-fade-leave-active{
        opacity: 0;
    }
</style>