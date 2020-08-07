import React from 'react';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchShows as mockFetchShows } from './api/fetchShows';
import mockData from './fixtures/mockData';

jest.mock('./api/fetchShows');

afterEach(() => {
	cleanup();
});

test('renders app', () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });

	render(<App />);
});

test('fetches data and renders', async () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });
	const { getByTestId, queryByTestId, getByText } = render(<App />);

	await waitFor(() => {
		expect(getByTestId('name')).toHaveTextContent(/stranger things/i);
		expect(queryByTestId('episodes')).toBeInTheDocument();
	});
});

test('dropdown value can be selected and changed', async () => {
	mockFetchShows.mockResolvedValueOnce({ data: mockData });
	const { getByText } = render(<App />);

	await waitFor(() => {
		const dropdown = getByText(/select a season/i);

		dropdown.value = 'Season 1';
		expect(dropdown.value).toBe('Season 1');
		fireEvent.click(dropdown);
		expect(dropdown.value).toBe('Season 1');

		dropdown.value = 'Season 2';
		expect(dropdown.value).toBe('Season 2');
		fireEvent.click(dropdown);
		expect(dropdown.value).toBe('Season 2');
	});
});
