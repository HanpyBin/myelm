import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { setLocal } from '../config/mUtils'
import { getUser } from '../service/getData'
export default new Vuex.Store({
  state: {
    userInfo: null,
    latitude: '',
    longitude: '',
    location: '',
    geohash: '31.22299,121.36025',
    login: true //FIXME:我没有办法login。。。
  },
  mutations: {
    SAVE_ADDRESS(state, {latitude, longitude}) {
      // console.log(location);
      state.latitude = latitude;
      state.longitude = longitude;
    },
    SAVE_GEOHASH(state, geohash) {
      // console.log(latitude);
      // state.latitude = latitude;
      // state.longitude = longitude;
      state.geohash = geohash;
      // console.log(state.latitude);
    },
    RECORD_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      state.login = true;
      setLocal('user_id', userInfo.user_id);
    },
    GET_USERINFO(state, info) {
      if (state.userInfo && (state.userInfo.username !== info.username)) {
        return;
      }
      if (!state.login) {
        return;
      }
      if (!info.message) {
        state.userInfo = {...info};
      } else {
        state.userInfo = null;
      }      
    }
  },
  actions: {
    async getUserInfo(context) {
      // console.log(5);
      let res = (await getUser()).data;
      // console.log(6);
      context.commit("GET_USERINFO", res);
      // console.log(7);
    }
  },
  modules: {
  }
})
