import React from 'react';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchShows as mockFetchShows } from './api/fetchShows';
import mockData from './fixtures/mockData';

jest.mock('./api/fetchShows');

// afterEach(() => {
// 	cleanup();
// });

test('renders app', () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });

	render(<App />);
});

test('updates show data on render', async () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });
	const {
		getByText,
		getByTestId,
		queryByTestId,
		getAllByTestId,
		queryAllByTestId,
		findByTestId,
	} = render(<App />);

	await waitFor(() => {
		expect(getByTestId('name')).toHaveTextContent(/stranger things/i);
		expect(queryByTestId('episode')).not.toBeInTheDocument();
	});
	expect(getByTestId('name')).toHaveTextContent(/stranger things/i);

	const dropdown = getByText(/select a season/i);
	dropdown.value = 'Season 1';
	expect(dropdown.value).toBe('Season 1');
	fireEvent.click(dropdown);
	await waitFor(() => {
		expect(dropdown.value).toBe('Season 1');
		// expect(queryByTestId('episode')).toBeInTheDocument();
	});

	dropdown.value = 'Season 2';
	expect(dropdown.value).toBe('Season 2');
	fireEvent.click(dropdown);
	await waitFor(() => {
		expect(dropdown.value).toBe('Season 2');
	});
});
