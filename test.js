import React from 'react';
// import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from './dist/app.js';

test('should be a sidebar', t => {
	const {lastFrame} = render(<App />);

	t.true(lastFrame().includes('Sidebar woo'), 'sidebar should be rendered');
});

test('greet user with a name', t => {
	const {lastFrame} = render(<App />);

	t.true(
		lastFrame().includes('Content area'),
		'Content area should be rendered',
	);
});
