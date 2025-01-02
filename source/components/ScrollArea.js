import React, {useReducer, useRef, useEffect} from 'react';
import {Box, useInput, measureElement} from 'ink';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_INNER_HEIGHT':
			return {
				...state,
				innerHeight: action.innerHeight,
			};
		case 'SCROLL_DOWN':
			return {
				...state,
				scrollTop: Math.min(
					Math.max(0, state.innerHeight - state.height),
					state.scrollTop + 1,
				),
			};
		case 'SCROLL_UP':
			return {
				...state,
				scrollTop: Math.max(0, state.scrollTop - 1),
			};
		default:
			return state;
	}
};

export default function ScrollArea({height, children}) {
	const [state, dispatch] = useReducer(reducer, {
		height,
		scrollTop: 0,
		innerHeight: 0,
	});

	const innerRef = useRef();

	useEffect(() => {
		if (innerRef.current) {
			const dimensions = measureElement(innerRef.current);
			dispatch({
				type: 'SET_INNER_HEIGHT',
				innerHeight: dimensions.height,
			});
		}
	}, [children]);

	useInput((_input, key) => {
		if (key.downArrow) {
			dispatch({type: 'SCROLL_DOWN'});
		}
		if (key.upArrow) {
			dispatch({type: 'SCROLL_UP'});
		}
	});

	return (
		<Box height={height} flexDirection="column" overflow="hidden">
			<Box
				ref={innerRef}
				flexShrink={0}
				flexDirection="column"
				marginTop={-state.scrollTop}
			>
				{children}
			</Box>
		</Box>
	);
}
