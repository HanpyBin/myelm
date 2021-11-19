<template>
    <div>
        <top-header goBack="true" headTitle="搜索"></top-header>
        <foot-guider></foot-guider>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader.vue"
import FootGuider from '../components/FootGuider.vue'
export default {
    components: { TopHeader, FootGuider},
}
</script>

<style lang="scss" scoped>

</style>