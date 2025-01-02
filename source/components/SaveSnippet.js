import React, {useState, useReducer, useRef, useEffect} from 'react';
import {Box, Text, useInput, useApp, measureElement} from 'ink';
import {highlight} from 'cli-highlight';
import formatCode from '../utils/FormatCode.js';
import ScrollArea from './ScrollArea.js';

export default function SaveSnippet() {
	const [code, setCode] = useState(''); // Manage the code
	const [scrollAreaHeight, setScrollAreaHeight] = useState(10); // Height of the ScrollArea
	const boxRef = useRef(null); // Reference to the parent box
	const {exit} = useApp();

	useEffect(() => {
		if (boxRef.current) {
			const dimensions = measureElement(boxRef.current);
			setScrollAreaHeight(Math.max(3, dimensions.height - 2)); // Ensure a minimum height
		}
	}, [code]);

	useInput((input, key) => {
		if (key.delete) {
			setCode('');
		} else if (input === 'q') {
			exit();
		} else if (input.length > 1) {
			const prettyCode = formatCode(input);
			const highlightedCode = highlight(prettyCode, {language: 'javascript'});
			setCode(prev => prev + highlightedCode);
		} else {
			setCode(prev => prev + input);
		}
	});

	const lines = code.split('\n');

	return (
		<Box flexDirection="column" width="100%" height="80%" padding={1}>
			{/* Instructions */}
			<Box marginBottom={1}>
				<Text>
					Press 'delete' to clear the code. Press 'q' to quit. Use ↑ and ↓ to
					scroll.
				</Text>
			</Box>

			<Box
				ref={boxRef}
				borderStyle="round"
				flexDirection="column"
				flexGrow={1}
				padding={1}
				overflow="hidden"
			>
				<ScrollArea height={scrollAreaHeight}>
					{lines.map((line, index) => (
						<Box key={index} flexShrink={0}>
							<Text key={index}>{line}</Text>
						</Box>
					))}
				</ScrollArea>
			</Box>
		</Box>
	);
}
