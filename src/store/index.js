import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: false,
    latitude: '',
    longitude: '',
    location: '',
    geohash: '31.22299,121.36025'
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
    }
  },
  actions: {
  },
  modules: {
  }
})
