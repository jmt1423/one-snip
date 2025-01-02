import React from 'react';
import {Box} from 'ink';
import SelectInput from 'ink-select-input';

export default function SideBar({navItems, onSelect}) {
	return (
		<Box
			borderStyle={'round'}
			height={'100%'}
			width={40}
			paddingTop={1}
			paddingBottom={1}
			paddingLeft={2}
			paddingRight={2}
		>
			<SelectInput items={navItems} onSelect={onSelect} />
		</Box>
	);
}
