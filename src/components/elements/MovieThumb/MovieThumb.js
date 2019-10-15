import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./MovieThumb.css";

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

MovieThumb.propTypes = {
	image: PropTypes.string,
	movieId: PropTypes.number,
	movieName: PropTypes.string,
	clickable: PropTypes.bool
};

export default MovieThumb;
