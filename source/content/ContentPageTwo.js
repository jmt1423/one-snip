import React from 'react';
import {Text, Box} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function ContentPaneTwo() {
	return (
		<Box
			borderStyle={'round'}
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'rainbow'}>
				<BigText text={'Pane 2'} />
			</Gradient>
			<Text>I'm the second content area</Text>
		</Box>
	);
}
