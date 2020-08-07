import { formatSeasons } from './formatSeasons';
import mockData from '../fixtures/mockData';

test('formats seasons correctly', () => {
	const formatted = formatSeasons(mockData._embedded.episodes);
	console.log(formatted['Season 1']);

	expect(formatted['Season 3'].length).toBe(8);
	expect(formatted['Season 1'][0].id).toBe(553946);
	expect(formatted['Season 2'][1].name).toBe(
		'Chapter Two: Trick or Treat, Freak'
	);
});
