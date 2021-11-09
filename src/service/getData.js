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