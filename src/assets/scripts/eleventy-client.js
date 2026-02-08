export class EleventyClient {
	apiUrl = "https://mlut.style/art-api/"
	urlParams = new URLSearchParams(window.location.search)
	sourceId = this.urlParams.get('art')

	async getInitialCode(path) {
		console.log(path)
		return fetch(
			`${this.apiUrl + path}`,
			{
				method: 'GET'
			}
		)
		.then((resp) => {
			if (resp.ok && resp.status >= 200 && resp.status < 400) {
				return resp.text();
			}

			throw new Error(resp.status)
		})
	}
}

export const eleventyClient = new EleventyClient();