export class WebsiteClient {
	apiUrl = "https://mlut.style/art-api/"

	async getArt(path) {
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
		.then(resp => resp.replaceAll('\n\n', '').trim())
	}
}

export const websiteClient = new WebsiteClient();