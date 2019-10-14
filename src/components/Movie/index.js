import React, { Component } from "react";

import { API_KEY, API_URL } from "../../config";
import Navigation from "../elements/Navigation";
import MovieInfo from "../elements/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar";
import Actor from "../elements/Actor";
import FourColGrid from "../elements/FourColGrid";
import Spinner from "../elements/Spinner";

import "./Movie.css";

class Movie extends Component {
	state = {
		movie: null,
		actors: null,
		directors: [],
		loading: false
	};

	componentDidMount() {
		const { match } = this.props;
		this.setState({ loading: true });
		const endpoint = `${API_URL}movie/${match.params.movieId}?api_key=${API_KEY}&language=en-US`;

		this.fetchItems(endpoint);
	}

	fetchItems = endpoint => {
		const { match } = this.props;
		fetch(endpoint)
			.then(result => result.json())
			.then(result => {
				console.log("result:", result);
				if (result.status_code) {
					this.setState({ loading: false });
				} else {
					this.setState({ movie: result }, () => {
						//	fetch actors
						const endpoint = `${API_URL}movie/${match.params.movieId}/credits?api_key=${API_KEY}`;

						fetch(endpoint)
							.then(result => result.json())
							.then(result => {
								console.log("results1:", result);
								const directors = result.crew.filter(
									member => member.job === "Director"
								);

								this.setState({
									actors: result.cast,
									directors,
									loading: false
								});
							});
					});
				}
			})
			.catch(error => console.log("error:", error));
	};

	render() {
		const { location } = this.props;
		const { movie, directors, actors, loading } = this.state;
		return (
			<div className='rmdb-movie'>
				{this.state.movie ? (
					<div>
						<Navigation movie={location.movieName} />
						<MovieInfo movie={movie} directors={directors} />
						<MovieInfoBar
							time={movie.runtime}
							budget={movie.budget}
							revenue={movie.revenue}
						/>
					</div>
				) : null}
				{actors ? (
					<div className='rmdb-movie-grid'>
						<FourColGrid header={"Actors"}>
							{actors.map((element, i) => {
								return <Actor key={i} actor={element} />;
							})}
						</FourColGrid>
					</div>
				) : null}
				{!actors && !loading ? <h1>No Movie Found!</h1> : null}
				{loading ? <Spinner /> : null}
			</div>
		);
	}
}

export default Movie;
