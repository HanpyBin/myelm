<template>
  <header id="top_header">
    <slot name="home"></slot>
    <section class="head_goback" v-if="goBack" @click=$router.go(-1)>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
    </section>
    <slot name="changeCity"></slot>
    <router-link :to="userInfo ? '/profile' : '/login'" class="head_login" v-if="signin">
      <svg class="user_avatar" v-if="userInfo">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#user"
        ></use>
      </svg>
      <span class="login_span" v-else> 登录|注册 </span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">
        {{ headTitle }}
      </span>
    </section>
    <slot name="search"></slot> 
    <slot name="index"></slot>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["signin", "headTitle", "goBack"],
  mounted() {
    // console.log(this.userInfo);
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>


<style lang="scss" scoped>
@import "../style/mixin";

$blue: #3190e8;

#top_header {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 1.95rem);
}

.head_login {
  right: 0.55rem;
  @include sc(0.65rem, #fff);
  @include ct;
  .login_span {
    color: #fff;
  }
  .user_avatar {
    fill: #fff;
    @include wh(0.8rem, 0.8rem);
  }
}
.head_goback{
    position: absolute;
    left: 0.4rem;
    top: 50%;
    @include wh(0.6rem, 50%);
    transform: translateY(-30%)
}
.title_head {
    @include center;
    .title_text{
        @include sc(0.8rem, #fff);
        font-weight: 800;
    }
}
</style>