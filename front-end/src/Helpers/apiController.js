import axios from 'axios'
var config = require('../config')
var qs = require('qs')

const apiController = {
    post: function(url, data) {
        const options = {
            method: 'POST',
            url: config.url + url,
            headers: { 
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'authorize-token': localStorage.getItem("apiToken") || ""
            },
            data: qs.stringify(data)
        }

        return axios.request(options)
    },
    get: function(url, data = null) {
        const options = {
            method: 'GET',
            url: config.url + url,
            headers: { 
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'authorize-token': localStorage.getItem("apiToken") || ""
            },
            data: qs.stringify(data)
        }

        return axios.request(options)
    }
}

export default apiController