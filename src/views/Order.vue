<template>
    <div>
        <top-header goBack="true" headTitle="订单列表"></top-header>
        <foot-guider></foot-guider>
    </div>
</template>

<script>
import FootGuider from "../components/FootGuider.vue"
import TopHeader from '../components/TopHeader.vue'
export default {
    components: {
        FootGuider,
        TopHeader
    },
}
</script>

<style lang="scss" scoped>

</style>