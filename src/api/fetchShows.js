import axios from 'axios';

export const fetchShows = () => {
	return axios.get(
		'https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes'
	);
};
