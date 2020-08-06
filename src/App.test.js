import React from 'react';
import { render, wait, cleanup, fireEvent } from '@testing-library/react';
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
	const { getByText, getByTestId } = render(<App />);

	await wait();
	expect(getByTestId('name')).toHaveTextContent(/stranger things/i);
	expect(getByTestId('episode')).not.toBeInTheDocument();

	const dropdown = getByText(/select a season/i);
	dropdown.value = 'Season 1';
	expect(dropdown.value).toBe('Season 1');
	fireEvent.click(dropdown);
	await wait();
	// expect(getByText(/Season 1, Episode 1/i)).toBeInTheDOM();
});
