import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharactersList extends Component {
	state = {
		charactersList: [],
		loading: true,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharactersListLoaded)
			.catch(this.onError);
	}

	onCharactersListLoaded = (charactersList) => {
		this.setState({ charactersList, loading: false });
	};

	onError = () => {
		this.setState({ error: true, loading: false });
	};

	renderItems(arr) {
		const items = arr.map((item) => {
			let imgStyle = { objectFit: 'cover' };
			if (
				item.thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li
					key={item.id}
					className="char__item"
					onClick={() => this.props.onCharacterSelected(item.id)}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});

		return <ul className="char__grid">{items}</ul>;
	}

	render() {
		const { charactersList, loading, error } = this.state;

		const items = this.renderItems(charactersList);

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharactersList;
