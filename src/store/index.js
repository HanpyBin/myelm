import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { getLocal, setLocal } from "../config/mUtils";
import { getUser } from "../service/getData";
export default new Vuex.Store({
    state: {
        userInfo: null,
        latitude: "",
        longitude: "",
        location: "",
        geohash: "31.22299,121.36025",
        login: true, //FIXME:我没有办法login。。。
        cartList:{},
        shopDetail: null,
        shopid: null,
        remarkText: null,    //可选备注内容
        inputText: '',  //输入备注内容
        cart_id: null,
        sig: null,
        chosedAddress: null,
        addressIndex: null,
        newAddress: [],
        searchAddress: null,
        invoice: false,
        orderParam:null,
        needValidation: null,
        cartPrice: null,
        orderMessage: null,
        orderDetail: null
    },
    mutations: {
        SAVE_ADDRESS(state, { latitude, longitude }) {
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
            setLocal("user_id", userInfo.user_id);
        },
        GET_USERINFO(state, info) {
            if (state.userInfo && state.userInfo.username !== info.username) {
                return;
            }
            if (!state.login) {
                return;
            }
            if (!info.message) {
                state.userInfo = { ...info };
            } else {
                state.userInfo = null;
            }
        },
        INIT_BUYCART(state) {
            let initCart = getLocal('buyCart');
            if (initCart){
                state.cartList = JSON.parse(initCart);
            }
        },
        RECORD_SHOPDETAIL(state, detail) {
            state.shopDetail = detail;
        },
        REDUCE_CART(state, {
           shopid,
           category_id,
           item_id,
           food_id,
           name,
           price,
           specs,
        }) {
                let cart = state.cartList;
                let shop = (cart[shopid] || {});
                let category = (shop[category_id] || {});
                let item = (category[item_id] || {});
                if (item && item[food_id]) {
                    if (item[food_id]['num'] > 0) {
                        item[food_id]['num']--;
                        state.cartList = {...cart};
                        //存入localStorage
                        setLocal('buyCart', state.cartList);
                    } else {
                        //商品数量为0，则清空当前商品的信息
                        item[food_id] = null;
                    }
                }
        },
        ADD_CART(state, {
            shopid,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
            packing_fee,
            sku_id,
            stock
        }) {
            let cart = state.cartList;
            let shop = cart[shopid] = (cart[shopid] || {});
            let category = shop[category_id] = (shop[category_id] || {});
            let item = category[item_id] = (category[item_id] || {});
            if (item[food_id]) {
                item[food_id]['num']++;
            } else {
                item[food_id] = {
                        "num" : 1,
                        "id" : food_id,
                        "name" : name,
                        "price" : price,
                        "specs" : specs,
                        "packing_fee" : packing_fee,
                        "sku_id" : sku_id,
                        "stock" : stock
                };
            }
            state.cartList = {...cart};
            //存入localStorage
            setLocal('buyCart', state.cartList);
        },
        CLEAR_CART(state, shopid){
            state.cartList[shopid] = null;
            state.cartList = {...state.cartList};
            setLocal('buyCart', state.cartList);
        },
        SAVE_SHOPID(state, shopid) {
            state.shopid = shopid;
        },
        SAVE_CART_ID_SIG(state, {cart_id, sig}) {
            state.cart_id = cart_id;
            state.sig = sig;
        },
        CHOOSE_ADDRESS(state, {address, index}) {
            state.chosedAddress = address;
            state.addressIndex = index;
        },
        CONFIRM_ADDRESS(state, newAddress){
            state.newAddress.push(newAddress);
        },
        CHOOSE_SEARCH_ADDRESS(state, place) {
            state.searchAddress = place;
        },
        CONFIRM_INVOICE(state, invoice){
            state.invoice = invoice;
        },
        CONFIRM_REMARK(state, {remarkText, inputText}) {
            state.remarkText = remarkText;
            state.inputText = inputText;
        },
        SAVE_ORDER_PARAM(state, orderParam) {
            state.orderParam = orderParam;
        },
        NEED_VALIDATION(state, needValidation){
            state.needValidation = needValidation;
        },
        ORDER_SUCCESS(state, order){
            state.cartPrice = null;
            state.orderMessage = order;
        },
        SAVE_ORDER(state, orderDetail){
            state.orderDetail = orderDetail;
        }
    },
    actions: {
        async getUserInfo(context) {
            // console.log(5);
            let res = (await getUser()).data;
            // console.log(6);
            context.commit("GET_USERINFO", res);
            // console.log(7);
        },
    },
    modules: {},
});
