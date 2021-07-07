import React, { useState, useEffect } from 'react';
import { fetchShows } from './api/fetchShows';
import Dropdown from 'react-dropdown';
import parse from 'html-react-parser';

import { formatSeasons } from './utils/formatSeasons';

import Episodes from './components/Episodes';
import './styles.css';

export default function App() {
	const [selectedShow, setSelectedShow] = useState('stranger-things');
	const [show, setShow] = useState(null);
	const [seasons, setSeasons] = useState([]);
	const [selectedSeason, setSelectedSeason] = useState('');
	const episodes = seasons[selectedSeason] || [];

	useEffect(() => {
		fetchShows(selectedShow).then((res) => {
			setShow(res.data);
			setSeasons(formatSeasons(res.data._embedded.episodes));
		});
	}, [selectedShow]);

	const handleSelect = (e) => {
		setSelectedSeason(e.value);
	};

	const handleShowSelect = (e) => {
		setSelectedShow(e.value);
	};

	if (!show) {
		return <h2>Fetching data...</h2>;
	}

	return (
		<div className='App'>
			<img className='poster-img' src={show.image.original} alt={show.name} />
			<Dropdown
				options={[
					'stranger-things',
					'star-trek',
					'peep-show',
					'criminal-minds',
				]}
				onChange={handleShowSelect}
				value={selectedShow || 'Select a show'}
				placeholder='Select an option'
				label='Select A Show'
			/>
			<h1 data-testid='name'>{show.name}</h1>
			{parse(show.summary)}
			<Dropdown
				options={Object.keys(seasons)}
				onChange={handleSelect}
				value={selectedSeason || 'Select a season'}
				placeholder='Select an option'
			/>
			<Episodes episodes={episodes} />
		</div>
	);
}
