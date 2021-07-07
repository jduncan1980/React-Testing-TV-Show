import axios from 'axios';

export const fetchShows = (selectedShow) => {
	return axios.get(
		`https://api.tvmaze.com/singlesearch/shows?q=${selectedShow}&embed=episodes`
	);
};
