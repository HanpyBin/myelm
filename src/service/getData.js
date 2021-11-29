import axios from 'axios';
import { getLocal } from '../config/mUtils';
// axios.defaults.withCredentials = true;
const BASE_URL = '';


export const cityGuess = () => {
    return axios({
        url: 'https://elm.cangdu.org' + '/v1/cities',
        params:{
            type: 'guess'
        }
    })
}

export const hotcity = () => {
    return axios({
        url: BASE_URL + '/v1/cities',
        params:{
            type: 'hot'
        }
    })
}

export const allcity = () => {
    return axios({
        url: BASE_URL + '/v1/cities',
        params:{
            type: 'group'
        }
    })
}

export const getSingleCity = (id) => {
    // console.log(BASE_URL + '/v1/cities/' + id);
    return axios({
        url: BASE_URL + '/v1/cities/' + id
    })
}



export const searchLocation = (loc, name) => {
    return axios({
        url: `${BASE_URL}/v1/pois`,
        params: {
            city_id: loc,
            keyword: name
        }
    })
}

export const getLocationByGeohash = geoHash =>{
    return axios(BASE_URL+"/v2/pois/"+geoHash)
}

export const getFoodTypes = (geoHash) => {
    return axios({
        url: `${BASE_URL}/v2/index_entry`,
        params: {
            geoHash,
            group_type: 1,
            'flag[]': 'F'
        }
    })
}

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
    let url = BASE_URL + '/shopping/restaurants?';
    // console.log(data);
    for (let key in data) {
        url += key + '=' + data[key] + '&';
    }
    url = url.substr(0, url.length-1);
    return axios({
        url
    })
};


export const getFoodCategory = (latitude, longitude) => {
    return axios({
        url: BASE_URL + '/shopping/v2/restaurant/category',
        params: {
            latitude,
            longitude
        }
    })
}

export const getFoodDelivery = (latitude, longitude) => {
    return axios({
        url: BASE_URL + '/shopping/v1/restaurants/delivery_modes',
        params: {
            latitude,
            longitude,
            kw: ''
        }
    })
}

export const getFoodActivity = (latitude, longitude) => {
    return axios({
        url: BASE_URL + '/shopping/v1/restaurants/activity_attributes',
        params:{
            latitude,
            longitude,
            kw: ''
        }
    })
}

export const getcaptchas = ()=>{
    return axios({
        url: BASE_URL + '/v1/captchas',
        method: 'POST',
        withCredentials: true
    })
}

export const accountLogin = (username, password, captcha_code) => {
    return axios({
        url: BASE_URL + '/v2/login',
        method: 'POST',
        data:{
            username,
            password,
            captcha_code
        },
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
    })
}

export const getUser = ()=>{
    // getLocal('user_id');
    return axios({
        url: BASE_URL + '/v1/user',
        params:{
            user_id: getLocal('user_id')
        }
    })
}

export const signout = () => {
    // fetch('/v2/signout');
    return axios({
        url: BASE_URL + '/v2/signout'
    })
}

export const shopDetails = (shopId, latitude, longitude) => {
    return axios({
        url: BASE_URL + '/shopping/restaurant/' + shopId,
        params:{
            latitude,
            longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
        }
    })
}

export const foodMenu = restaurant_id => {
    return axios({
        url: BASE_URL + '/shopping/v2/menu',
        params:{
            restaurant_id
        }
    })
}

export const getRatingList = (shopid, offset, tag_name='') => {
    return axios({
        url: BASE_URL + '/ugc/v2/restaurants/' + shopid + '/ratings',
        params:{
            has_content: true,
            offset,
            limit:10,
            tag_name
        }
    })
}

export const ratingScores = shopid => {
    return axios({
        url: BASE_URL + '/ugc/v2/restaurants/' + shopid + '/ratings/scores'
    })
}

export const ratingTags = shopid => {
    return axios({
        url: BASE_URL + '/ugc/v2/restaurants/' + shopid + '/ratings/tags'
    })
}


export const vipCart = (id, number, password) => {
    return axios({
        url: BASE_URL + '/member/v1/users/' + id + '/delivery_card/physical_card/bind',
        method: 'POST',
        data:{
            number,
            password
        }
    })
}

export const getRedpocket = id => {
    return axios({
        url: BASE_URL + '/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0'
    })
}


export const getExpired = id => {
    return axios({
        url: BASE_URL + '/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0'
    })
}

export const exchangeRedpocket = (id, exchange_code, captcha_code) => {
    return axios({
        url: BASE_URL + '/v1/users/' + id + '/hongbao/exchange',
        method: 'POST',
        data:{
            exchange_code,
            captcha_code
        }
    })
}

export const checkout = (geohash, entities, shopid) =>{
    return axios({
        url: BASE_URL + '/v1/carts/checkout',
        method: 'POST',
        data:{
            come_from: 'web',
            geohash,
            entities,
            restaurant_id: shopid
        }
    })
}

export const getAddressList = user_id => {
    return axios({
        url: BASE_URL + '/v1/users/'+user_id+'/addresses'
    })
}

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk,poi_type, sex, tag, tag_type) =>{
    return axios({
        url: BASE_URL + '/v1/users/' + userId + '/addresses',
        method: 'POST',
        data:{
            address,
            address_detail,
            geohash,
            name,
            phone,
            phone_bk,
            poi_type,
            sex,
            tag,
            tag_type
        }
    })
}

export const searchNearby = keyword =>{
    return axios({
        url: 'http://cangdu.org:8001' + '/v1/pois',
        params:{
            type: 'nearby',
            keyword
        }
    })
}

export const getRemark = (id, sig) =>{
    return axios({
        url: BASE_URL + '/v1/carts/' + id + '/remarks',
        params:{
            sig
        }
    })
}

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) =>{
    return axios({
        url: BASE_URL + '/v1/users/' + user_id + '/carts/' + cart_id + '/orders',
        method: 'POST',
        data:{
            address_id,
            come_from: "mobile_web",
            deliver_time:"",
            description,
            entities,
            geohash,
            paymethod:1,
            sig
        }
    })
}

export const payRequest = (merchantOrderNo, userId) =>{
    return axios({
        url: BASE_URL + '/payapi/payment/queryOrder',
        params:{
            merchantId: 5,
            merchantOrderNo,
            source: 'MOBILE_WAP',
            userId,
            version: '1.0.0',
        }
    })
}