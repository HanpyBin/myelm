import axios from 'axios';

const BASE_URL = 'https://elm.cangdu.org';

export const cityGuess = () => {
    return axios({
        url: BASE_URL + '/v1/cities?type=guess'
    })
}

export const hotcity = () => {
    return axios({
        url: BASE_URL + '/v1/cities?type=hot'
    })
}

export const allcity = () => {
    return axios({
        url: BASE_URL + '/v1/cities?type=group'
    })
}

export const getSingleCity = (id) => {
    // console.log(BASE_URL + '/v1/cities/' + id);
    return axios({
        url: BASE_URL + '/v1/cities/' + id
    })
}

export const getLocal = (name)=>{
    if (!name)
        return;
    return window.localStorage.getItem(name);
}



export const setLocal = (key, value) => {
    if (!key)
        return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

export const removeLocal = (name) => {
    if (!name)
        return;
    window.localStorage.removeItem(name);
}

export const searchLocation = (loc, name) => {
    return axios({
        url: `${BASE_URL}/v1/pois?city_id=${loc}&keyword=${name}`
    })
}