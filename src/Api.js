import axios from 'axios'

class Api {
    static URL = 'https://oauth2testserver.herokuapp.com';

    static getUsers() {
        return Api._get('/helper/users');
    }

    static getConfiguration() {
        return Api._get('/helper/configuration');
    }

    static resetConfiguration() {
        return Api._get('/helper/resetConfiguration');
    }

    static saveConfiguration(configuration) {
        return Api._post('/helper/configuration', configuration);
    }

    static getLogs() {
        return Api._get('/helper/logs');
    }

    static clearLogs() {
        return Api._delete('/helper/logs');
    }

    static _get(path) {
        return new Promise((resolve, reject) => {
            axios.get(Api.URL + path).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static _post(path, data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.URL + path, data).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static _delete(path) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.URL + path).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

}

export default Api;


