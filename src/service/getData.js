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

export const getLocationByGeohash = async geoHash =>{
    return await axios(BASE_URL+"/v2/pois/"+geoHash)
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