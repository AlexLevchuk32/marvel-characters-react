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

	getAllCharacters = async () => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`,
		);

		return res.data.results.map(this._transformCharacter);
	};

	getOneCharacter = async (id) => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?apikey=${this._apiKey}`,
		);

		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (character) => {
		return {
			id: character.id,
			name: character.name,
			description: character.description
				? `${character.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
			homepage: character.urls[0].url,
			wiki: character.urls[1].url,
			comics: character.comics.items,
		};
	};
}

export default MarvelService;
