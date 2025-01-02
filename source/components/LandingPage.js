import React, {useState} from 'react';
import {Box} from 'ink';
import SelectInput from 'ink-select-input';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import SaveSnippet from './SaveSnippet.js';

export default function LandingPage({onStart}) {
	const [currentView, setCurrentView] = useState('landing');
	const items = [
		{label: 'Enter', value: 'start'},
		{label: 'Save Snippet', value: 'save'},
		{label: 'Exit', value: 'exit'},
	];

	const handleSelect = item => {
		if (item.value === 'start') {
			onStart();
		} else if (item.value === 'exit') {
			process.exit(0);
		} else if (item.value === 'save') {
			setCurrentView('saveSnippet');
		}
	};

	if (currentView === 'saveSnippet') {
		return <SaveSnippet />;
	}

	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection="column"
			justifyContent="top"
			alignItems="center"
		>
			<Gradient name={'passion'}>
				<BigText text={'One'} />
			</Gradient>
			<Gradient name={'passion'}>
				<BigText text={'Snippets'} />
			</Gradient>
			<SelectInput items={items} onSelect={handleSelect} />
		</Box>
	);
}
