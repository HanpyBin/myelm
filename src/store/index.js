import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: false,
    latitude: '',
    longitude: '',
    location: '',
  },
  mutations: {
    SAVE_LOCATION(state, location) {
      state.location = location;
    },
    SAVE_GEOHASH(state, {latitude, longitude}) {
      state.latitude = latitude;
      state.longitude = longitude;
    }
  },
  actions: {
  },
  modules: {
  }
})
