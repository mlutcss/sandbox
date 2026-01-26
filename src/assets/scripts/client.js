class Client {
	static apiUrl = ''
	static editorsKey = ''

	async makeRequest(path, method = "GET", data = {}){
		const ucMethod = method.toUpperCase();

		const options = {
			ucMethod,
			headers: {
				'Authorization': `${this.editorsKey}`,
			}
		}

		if (ucMethod === 'POST' || ucMethod === 'PUT'){
			options.body = JSON.stringify(data)
			options.headers['Content-Type'] = 'application/json'
		}

		console.log(`${this.apiUrl}` + path)

		return fetch (
			`${this.apiUrl}` + path,
			options
		).then((resp) => {
			 if (resp.ok && resp.status >= 200 && resp.status < 400) {
        return resp.json();
      }

      throw new Error(`Invalid response: ${resp.status}`);
		})
	}

	async getInitialCode(path){
		return await this.makeRequest(path)
	}

	createNewSketch(){

	}

	updateSketch(){

	}

}

export const client = new Client()