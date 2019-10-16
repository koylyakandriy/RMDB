import React from "react";
import {
	API_URL,
	API_KEY,
	IMAGE_BASE_URL,
	POSTER_SIZE,
	BACKDROP_SIZE
} from "../../config";
import HeroImage from "../elements/HeroImage";
import SearchBar from "../elements/SearchBar";
import FourColGrid from "../elements/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn";
import Spinner from "../elements/Spinner";
import { useFetchMovies } from "./customHook";

import "./Home.css";

const Home = () => {
	const [{ state, isLoading }, fetchMovies] = useFetchMovies();

	const { heroImage, searchTerm, movies, currentPage, totalPages } = state;

	const searchItems = searchTerm => {
		let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
		if (!searchTerm) {
			endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
		}
		fetchMovies(endpoint);
	};

	const loadMoreItems = () => {
		const { searchTerm, currentPage } = state;

		let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage +
			1}`;

		if (!searchTerm) {
			endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${currentPage +
				1}`;
		}
		fetchMovies(endpoint);
	};

	return (
		<div className='rmdb-home'>
			{heroImage
				? !searchTerm && (
						<div>
							<HeroImage
								image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
								title={heroImage.original_title}
								text={heroImage.overview}
							/>
						</div>
				  )
				: null}
			<SearchBar callback={searchItems} />

			<div className='rmdb-home-grid'>
				<FourColGrid
					header={searchTerm ? "Search Result" : "Popular Movies"}
					loading={isLoading}
				>
					{movies.map((element, i) => (
						<MovieThumb
							key={i}
							clickable={true}
							image={
								element.poster_path
									? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
									: "./images/no_image.jpg"
							}
							movieId={element.id}
							movieName={element.original_title}
						/>
					))}
				</FourColGrid>
				{isLoading ? <Spinner /> : null}
				{currentPage <= totalPages && !isLoading ? (
					<LoadMoreBtn text='Load More' onClick={loadMoreItems} />
				) : null}
			</div>
		</div>
	);
};

export default Home;
