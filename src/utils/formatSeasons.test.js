import { formatSeasons } from './formatSeasons';
// import { fetchShows as mockFetchShows } from '../api/fetchShows';
import mockData from '../fixtures/mockData';

jest.mock('../api/fetchShows.js');

test('formats seasons correctly', () => {
	const formatted = formatSeasons(mockData._embedded.episodes);
	console.log(formatted);

	expect(formatted['Season 3:'].length).toBe(8);
	expect(formatted['Season 1:'][0].id).toBe(539465);
	expect(formatted['Season 2:'][1].name).toBe(
		'Chapter Two: Trick or Treat, Freak'
	);
});
