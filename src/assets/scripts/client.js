class Client {
	static apiUrl = '';
	static editorsKey = '';
	static sketchId = '';

	async makeRequest(path, method = 'GET', data = {}) {
		const ucMethod = method.toUpperCase();
		const options = {
			method,
			headers: {
				'Authorization': `Bearer ${this.editorsKey}`,
			}
		};

		if (ucMethod === 'POST' || ucMethod === 'PUT') {
			options.body = JSON.stringify(data);
			options.headers['Content-Type'] = 'application/json';
		}

		return fetch(
			`${this.apiUrl}` + path,
			options
		).then((resp) => {
			if (resp.ok && resp.status >= 200 && resp.status < 400) {
				return resp.json();
			}

			throw new Error(`Invalid response: ${resp.status}`);
		});
	}

	async getInitialCode(path) {
		return await this.makeRequest(path);
	}

	async createNewSketch(path, method = 'POST', data) {
		console.log(method);
		return await this.makeRequest(path, method, data);
	}

	async updateSketch(path, method = 'PUT', data) {
		console.log(method);
		return await this.makeRequest(path, method, data);
	}

}

export const client = new Client();