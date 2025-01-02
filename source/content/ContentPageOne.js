import React from 'react';
import {Text, Box} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function ContentPaneOne() {
	return (
		<Box
			borderStyle={'round'}
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'retro'}>
				<BigText text={'Pane 1'} />
			</Gradient>
			<Text>I'm the first content area</Text>
		</Box>
	);
}
