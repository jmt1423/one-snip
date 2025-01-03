import SaveSnippet from '../utils/SaveSnippet.js';
import React, {useState, useRef, useEffect} from 'react';
import {
	Box,
	Text,
	useInput,
	useApp,
	measureElement,
	useFocus,
	useFocusManager,
} from 'ink';
import {highlight} from 'cli-highlight';
import formatCode from '../utils/FormatCode.js';
import ScrollArea from './ScrollArea.js';
import TextInput from 'ink-text-input';

export default function InputSnippet() {
	const [code, setCode] = useState('');
	const [scrollAreaHeight, setScrollAreaHeight] = useState(10);
	const boxRef = useRef(null);
	const {exit} = useApp();
	const [language, setLanguage] = useState('');
	const [description, setDescription] = useState('');
	const {focus} = useFocusManager();

	const updateScrollAreaHeight = () => {
		if (boxRef.current) {
			const dimensions = measureElement(boxRef.current);
			setScrollAreaHeight(Math.max(3, dimensions.height - 2)); // Minimum height of 3
		}
	};
	useEffect(() => {
		updateScrollAreaHeight();
	}, [code]);
	useEffect(() => {
		const handleResize = () => {
			updateScrollAreaHeight();
		};
		process.stdout.on('resize', handleResize);
		return () => {
			process.stdout.off('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		focus('2');
	}, [focus]);
	useInput(input => {
		if (input === '1') {
			focus('1');
		}
		if (input === '2') {
			focus('2');
		}
		if (input === '3') {
			focus('3');
		}
	});
	useInput((input, key) => {
		if (input === '=') {
			setCode('');
		} else if (input === 'q') {
			exit();
		} else if (input.length > 1) {
			const prettyCode = formatCode(input);
			const highlightedCode = highlight(prettyCode);
			setCode(prev => prev + highlightedCode);
		} else if (input === 't') {
			// process.stderr.write(language);
		} else if (key.return) {
			SaveSnippet(code, description, language);
		}
	});
	const lines = code.split('\n');
	return (
		<Box flexDirection="column" width="100%" height="100%" padding={1}>
			<Text>Language</Text>
			<InputLanguage id="2" language={language} setLanguage={setLanguage} />
			<Text>Description</Text>
			<Description
				id="3"
				description={description}
				setDescription={setDescription}
			/>
			<Text>Code</Text>
			<ScrollBox
				id="1"
				lines={lines}
				boxRef={boxRef}
				scrollAreaHeight={scrollAreaHeight - 3}
			/>
			<Box
				marginBottom={1}
				flexDirection="row"
				justifyContent="space-between"
				width="100%"
			>
				<Box flexDirection="column" width="50%">
					<Text>- '=' to clear code</Text>
					<Text>- 'enter' to save</Text>
				</Box>
				<Box flexDirection="column" width="50%" alignItems="flex-start">
					<Text>- ↑ and ↓ to scroll</Text>
					<Text>- 'tab' to cycle inputs</Text>
				</Box>
			</Box>
		</Box>
	);
}
function InputLanguage({id, language, setLanguage}) {
	const {isFocused} = useFocus({id});
	return (
		<Box
			borderStyle={'round'}
			width={'100%'}
			borderColor={isFocused ? 'greenBright' : 'redBright'}
		>
			{isFocused && (
				<TextInput
					value={language}
					onChange={setLanguage}
					placeholder="Code language"
				/>
			)}
		</Box>
	);
}
function Description({id, description, setDescription}) {
	const {isFocused} = useFocus({id});
	return (
		<Box
			borderStyle={'round'}
			width={'100%'}
			borderColor={isFocused ? 'magentaBright' : 'redBright'}
		>
			{isFocused && (
				<TextInput
					value={description}
					onChange={setDescription}
					placeholder="Snippet Description"
				/>
			)}
		</Box>
	);
}

function ScrollBox({id, lines, boxRef, scrollAreaHeight}) {
	const {isFocused} = useFocus({id});
	return (
		<Box
			ref={boxRef}
			borderStyle="round"
			flexDirection="column"
			flexGrow={1}
			padding={1}
			overflow="hidden"
			borderColor={isFocused ? 'blueBright' : 'redBright'}
		>
			<ScrollArea height={scrollAreaHeight}>
				{lines.map((line, index) => (
					<Box key={index} flexShrink={0}>
						<Text>{line}</Text>
					</Box>
				))}
			</ScrollArea>
		</Box>
	);
}
