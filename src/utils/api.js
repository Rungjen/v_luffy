import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000';

class Http {
	constructor() {
		this.http = axios.create({
			baseURL: BASE_URL,
			timeout: 3000
		});
		this.http.interceptors.request.use(
				config => {
					return config
				},
				error => {
					console.log(error);
				});
		this.http.interceptors.response.use(
				config => {
					// console.log(config);
					return config
				},
				error => {
					return Promise.reject(error)
				})
	}
	
	passwordLogin(data) {
		const url = 'api/password_login/';
		return this.http.post(url, data)
	}
	
	validUser(data) {
		const url = 'api/valid_user/';
		return this.http.post(url, data)
	}
	
	getBanner() {
		const url = 'api/banner';
		return this.http.get(url)
	}
}

export default new Http()