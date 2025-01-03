import React, {useState} from 'react';
import {Box, useApp} from 'ink';
import SelectInput from 'ink-select-input';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import InputSnippet from './SnippetInput.js';

export default function LandingPage({onStart}) {
	const {exit} = useApp();
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
			exit();
		} else if (item.value === 'save') {
			setCurrentView('saveSnippet');
		}
	};

	if (currentView === 'saveSnippet') {
		return <InputSnippet />;
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
