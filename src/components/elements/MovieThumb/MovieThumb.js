import React from "react";

import "./MovieThumb.css";
import { Link } from "react-router-dom";

const MovieThumb = ({ image, movieId, movieName, clickable }) => (
	<div className='rmdb-moviethumb'>
		{clickable ? (
			<Link to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}>
				{/* You can send props via the Links "to" object. Here we create our own "movieName" */}
				<img src={image} alt='moviethumb' />
			</Link>
		) : (
			<img src={image} alt='moviethumb' />
		)}
	</div>
);

export default MovieThumb;
