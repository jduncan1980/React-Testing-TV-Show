import React from 'react';
import { fetchShows as mockFetchShows } from '../api/fetchShows';
import mockData from '../fixtures/mockData';
import { render, waitFor } from '@testing-library/react';
import Episodes from './Episodes';

jest.mock('../api/fetchShows');

test('episodes render correctly', async () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });

	const { rerender, getAllByTestId, getByText } = render(
		<Episodes episodes={[]} />
	);
	await waitFor(() => {
		expect(getAllByTestId(/episode/i)).toHaveLength(1);
	});
	rerender(<Episodes episodes={mockData._embedded.episodes} />);

	await waitFor(() => {
		expect(getAllByTestId(/episode/i)).toHaveLength(27);

		expect(getByText(/season 1, episode 3/i)).toBeInTheDocument();
		expect(getByText(/season 2, episode 4/i)).toBeInTheDocument();
	});
});
