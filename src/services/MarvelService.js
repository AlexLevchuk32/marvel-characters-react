class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'ed2cec96fd6f0851bac465fcb6a074ed';

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCharacters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`,
		);
	};

	getOneCharacter = (id) => {
		return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
	};
}

export default MarvelService;
